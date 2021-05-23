import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from 'src/caching/cache.module';
import { OrderController, ReportController } from './order.controller';
import Order from './order.entity';
import { OrderService } from './order.service';

@Module({
    imports: [RedisCacheModule, TypeOrmModule.forFeature([Order])],
    controllers: [OrderController, ReportController],
    providers: [OrderService],
    exports: [TypeOrmModule],
})
export class OrderModule {}
