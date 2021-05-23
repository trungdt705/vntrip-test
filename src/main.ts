import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import Product from './product/product.entity';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
