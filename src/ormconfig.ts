import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomBaseEntity } from './entity/base.entity';
import Order from './order/order.entity';
import Product from './product/product.entity';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'vntrip',
    entities: [Order, Product], // maybe you should also consider chage it to something like:  [__dirname + '/**/*.entity.ts', __dirname + '/src/**/*.entity.js']
    migrations: ['src/migration/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migration',
    },
};
