import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { PrismaService, SERVICE } from '@app/common';

@Controller()
export class CreateController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(SERVICE.REDIS) private readonly clientRedisService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'create-user' })
  async create(payload: any) {
    const createUserDto = plainToInstance(CreateUserDto, payload);
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    try {
      const user = await this.prismaService.user.create({
        data: createUserDto,
      });
      this.clientRedisService.emit('delete', { key: 'find-all-user' });
      return user;
    } catch (error) {
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }
}
