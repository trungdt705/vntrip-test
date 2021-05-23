import { CustomBaseEntity } from '../entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
class Order extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public order_code: string;

    @Column()
    public order_type: string;

    @Column()
    public order_status: string;

    @Column()
    public total_price: number;

    @Column()
    public quantity: number;

    @Column('varchar', { array: true })
    public products: string[];
}

export default Order;
