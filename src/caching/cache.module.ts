import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';
import { RedisCacheService } from './cache.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                ttl: null,
            }),
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule {}
