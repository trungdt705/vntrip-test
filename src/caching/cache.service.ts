import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redis from 'ioredis';
const client = redis.createClient();

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    get(key: string): Promise<undefined | string> {
        const a = client.get(key);
        return a;
        // return this.cache.get(key);
    }

    async set(key: string, value: string) {
        await this.cache.set(key, value);
    }

    async zAdd(score: number, value: string) {
        const test = await client.zadd('order_report', score, value);
        console.log(test);
    }

    async zrangeByScore(
        keySet: string,
        min: string,
        max: string,
    ): Promise<string[]> {
        const result = await client.zrangebyscore(
            keySet,
            parseFloat(min),
            parseFloat(max),
        );
        if (result.length === 0) {
            return [];
        }
        return result;
    }
}
