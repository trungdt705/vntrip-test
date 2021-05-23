import { CustomBaseEntity } from '../entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public product_name: string;

    @Column()
    public product_code: string;

    @Column()
    public price: number;
}

export default Product;
