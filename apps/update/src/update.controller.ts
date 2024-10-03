import { PrismaService, SERVICE } from '@app/common';
import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';

@Controller()
export class UpdateController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(SERVICE.REDIS) private readonly clientRedisService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'update-user' })
  async update(payload: any) {
    const updateUserDto = plainToInstance(UpdateUserDto, payload);
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    try {
      const user = await this.prismaService.user.update({
        where: { id: updateUserDto.id },
        data: updateUserDto,
      });
      this.clientRedisService.emit('delete', { key: 'find-all-user' });
      return user;
    } catch (error) {
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }
}
