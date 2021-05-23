import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
    UsePipes,
    Request,
    Query,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { OrderService } from './order.service';
import { JoiValidationPipe } from './validation/JoiValidationPipe';
import { VALIDATION } from './validation/order.validation';

@Controller('/order')
export class OrderController {
    constructor(private _orderService: OrderService) {}
    @Get()
    async findAll(
        @Query('order_id') order_id: string,
        @Query('order_code') order_code: string,
        @Query('order_type') order_type: string,
        @Query('order_status') order_status: string,
        @Query('skip') skip: number,
        @Query('take') take: number,
    ): Promise<CreateOrderDto[]> {
        const query = {
            order_id,
            order_code,
            order_type,
            order_status,
        };
        const pagination = { take, skip };
        return this._orderService.findAll(query, pagination);
    }

    @Get(':id')
    async getOne(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<CreateOrderDto> {
        return this._orderService.getOne(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new JoiValidationPipe(VALIDATION.createOrder))
    async create(
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<CreateOrderDto> {
        return this._orderService.create(createOrderDto);
    }

    @Put(':id')
    async update(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<CreateOrderDto> {
        return this._orderService.update(id, createOrderDto);
    }

    @Delete(':id')
    remove(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: string,
    ) {
        return this._orderService.remove(id);
    }
}

@Controller('/report')
export class ReportController {
    constructor(private _orderService: OrderService) {}

    @Get()
    async report(
        @Query('start_date') startDate: string,
        @Query('end_date') endDate: string,
    ): Promise<any> {
        return this._orderService.report(startDate, endDate);
    }
}
