import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/CreateProductDto';
import Product from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    create(product: CreateProductDto): Promise<Product> {
        return this.productRepository.save(product);
    }

    update(id: number, product: CreateProductDto): Promise<Product> {
        return this.productRepository.save({
            id,
            ...product,
        });
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    getOne(id: number): Promise<Product> {
        return this.productRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
