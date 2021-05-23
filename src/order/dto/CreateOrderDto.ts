export class CreateOrderDto {
    order_code: string;
    order_type: string;
    order_status: string;
    quantity: number;
    total_price: number;
    products: string[];
}
