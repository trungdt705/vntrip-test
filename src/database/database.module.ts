import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Product from 'src/product/product.entity';
import Order from 'src/order/order.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [Product, Order],
                synchronize: true,
                migrationsTableName: 'migrations',
                migrations: ['migration/*.js'],
                cli: {
                    migrationsDir: 'migration',
                },
                logging: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
