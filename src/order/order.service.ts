import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import * as moment from 'moment-timezone';
import { Cron } from '@nestjs/schedule';
import { CreateOrderDto } from './dto/CreateOrderDto';
import Order from './order.entity';
import { RedisCacheService } from 'src/caching/cache.service';

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private readonly redisCacheService: RedisCacheService,
    ) {}

    create(order: CreateOrderDto): Promise<Order> {
        return this.orderRepository.save(order);
    }

    async findAll(query, pagination): Promise<Order[]> {
        const take = pagination.take || 1;
        const skip = pagination.skip || 0;
        Object.keys(query).forEach((key) =>
            query[key] === undefined ? delete query[key] : {},
        );
        return this.orderRepository.find({
            where: query,
            take,
            skip,
        });
    }

    update(id, order: CreateOrderDto): Promise<Order> {
        return this.orderRepository.save({
            id: id,
            ...order,
        });
    }

    getOne(id): Promise<Order> {
        return this.orderRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.orderRepository.delete(id);
    }

    async report(startDate, endDate): Promise<string[]> {
        try {
            const unixStartDate = moment(startDate).unix().toString();
            const unixEndDate = moment(endDate).unix().toString();
            if (unixEndDate < unixStartDate) {
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }
            const data = await this.redisCacheService.zrangeByScore(
                'order_report',
                unixStartDate,
                unixEndDate,
            );
            if (data.length > 0) {
                const transformData = data.map((item) => JSON.parse(item));
                const result = transformData.reduce((prev, curr) => {
                    return {
                        totalSales:
                            parseFloat(prev.totalSales) +
                            parseFloat(curr.totalSales),
                        totalOrder:
                            parseFloat(prev.totalOrder) +
                            parseFloat(curr.totalOrder),
                        totalQuantity:
                            parseFloat(prev.totalQuantity) +
                            parseFloat(curr.totalQuantity),
                    };
                });
                return result;
            }
            return [];
        } catch (error) {
            throw error;
        }
    }

    @Cron('05 00 * * *')
    async handleCron() {
        try {
            const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
            const { totalSales } = await this._getTotalSale(yesterday);
            const totalOrder = await this._getTotalOrder(yesterday);
            const { totalQuantity } = await this._getTotalProduct(yesterday);

            await this.redisCacheService.zAdd(
                moment(yesterday).unix(),
                JSON.stringify({
                    totalSales,
                    totalOrder,
                    totalQuantity,
                }),
            );
        } catch (error) {
            this.logger.error(error.message);
        }
    }

    private _getTotalSale(date) {
        return getRepository(Order)
            .createQueryBuilder('order')
            .select('SUM(order.total_price)', 'totalSales')
            .where('order.created_at > :start_at', {
                start_at: `${date} 00:00:00`,
            })
            .andWhere('order.created_at < :end_at', {
                end_at: `${date} 23:59:59`,
            })
            .getRawOne();
    }

    private _getTotalOrder(date) {
        return getRepository(Order)
            .createQueryBuilder('order')
            .where('order.created_at > :start_at', {
                start_at: `${date} 00:00:00`,
            })
            .andWhere('order.created_at < :end_at', {
                end_at: `${date} 23:59:59`,
            })
            .getCount();
    }

    private _getTotalProduct(date) {
        return getRepository(Order)
            .createQueryBuilder('order')
            .select('SUM(order.quantity)', 'totalQuantity')
            .where('order.created_at > :start_at', {
                start_at: `${date} 00:00:00`,
            })
            .andWhere('order.created_at < :end_at', {
                end_at: `${date} 23:59:59`,
            })
            .getRawOne();
    }
}
