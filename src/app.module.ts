import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { RedisCacheModule } from './caching/cache.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        RedisCacheModule,
        ProductModule,
        OrderModule,
        ConfigModule.forRoot(),
        DatabaseModule,
    ],
    controllers: [AppController, ProductController],
    providers: [AppService, ProductService],
})
export class AppModule {}
