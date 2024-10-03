import { PrismaService } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { DeleteUserDto } from './dto/delete-user.dto';
import { validate } from 'class-validator';

@Controller()
export class DeleteController {
  constructor(private readonly prismaService: PrismaService) {}

  @MessagePattern({ cmd: 'delete-user' })
  async delete(payload: any) {
    const deleteUserDto = plainToInstance(DeleteUserDto, payload);
    const errors = await validate(deleteUserDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    try {
      return await this.prismaService.user.delete({
        where: { id: deleteUserDto.id },
      });
    } catch (error) {
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }
}
