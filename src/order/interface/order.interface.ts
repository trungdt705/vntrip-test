enum OrderStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAIL = 'fail',
}

enum OrderType {
    FURNITURE = 'furniture',
    KITCHEN = 'kitchen',
}

export interface Order {
    order_code: string;
    order_type: Enumerator<OrderType>;
    products: Array<string>;
    order_status: Enumerator<OrderStatus>;
    quantity: number;
    total_price: number;
}
