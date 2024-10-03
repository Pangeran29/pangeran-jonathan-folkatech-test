import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import { SetCacheDto } from './dto/set-cache.dto';
import { validate } from 'class-validator';
import { GetCacheDto } from './dto/get-cache.dto';
import { DeleteCacheDto } from './dto/delete-cache.dto';

@Controller()
export class RedisController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @MessagePattern({ cmd: 'set' })
  async setCache(payload: any) {
    const setCacheDto = plainToInstance(SetCacheDto, payload);
    const errors = await validate(setCacheDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    this.cacheManager.set(setCacheDto.key, setCacheDto.value);
    return setCacheDto.value;
  }

  @MessagePattern({ cmd: 'get' })
  async getCache(payload: any) {
    const getCacheDo = plainToInstance(GetCacheDto, payload);
    const errors = await validate(getCacheDo);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    return await this.cacheManager.get(getCacheDo.key);
  }

  @EventPattern('delete')
  async delete(payload: any) {
    const deleteCacheDto = plainToInstance(DeleteCacheDto, payload);
    const errors = await validate(deleteCacheDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    return await this.cacheManager.del(deleteCacheDto.key);
  }
}
