import { PrismaService, SERVICE } from '@app/common';
import {
  Controller,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
import { FindUserByAccountNumberDto } from './dto/find-user-by-account-number.dto';
import { FindUserByIdentityNumberDto } from './dto/find-user-by-identity-number.dto';
import { catchError, lastValueFrom, map } from 'rxjs';

@Controller()
export class ReadController {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(SERVICE.REDIS) private readonly clientRedisService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'find-user-by-id' })
  async findUserById(payload: any) {
    const findUserByIdDto = plainToInstance(FindUserByIdDto, payload);
    const errors = await validate(findUserByIdDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: findUserByIdDto.id },
      });
      if (!user) {
        throw new RpcException({ status: 404 });
      }
      return user;
    } catch (error) {
      if (error?.error?.status === 404) {
        throw new RpcException({ status: 404, data: 'User not found' });
      }
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }

  @MessagePattern({ cmd: 'find-all-user' })
  async findAllUser() {
    {
      const pattern = { cmd: 'get' };
      const cachedUser = await lastValueFrom(
        this.clientRedisService
          .send<string>(pattern, { key: 'find-all-user' })
          .pipe(
            map((data: string) => data),
            catchError((err) => {
              throw new InternalServerErrorException(err);
            }),
          ),
      );
      if (cachedUser) {
        return { meta: { fromCache: true }, user: cachedUser };
      }
    }

    try {
      const user = await this.prismaService.user.findMany({});

      {
        const pattern = { cmd: 'set' };
        return this.clientRedisService
          .send<string>(pattern, { key: 'find-all-user', value: user })
          .pipe(
            map((data: string) => ({ meta: { fromCache: false }, user: data })),
            catchError((err) => {
              console.log({ err });
              throw new InternalServerErrorException(err);
            }),
          );
      }
    } catch (error) {
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }

  @MessagePattern({ cmd: 'find-user-by-account-number' })
  async findUserByAccountNumber(payload: any) {
    const findUserByAccountNumberDto = plainToInstance(
      FindUserByAccountNumberDto,
      payload,
    );
    const errors = await validate(findUserByAccountNumberDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    try {
      const user = await this.prismaService.user.findUnique({
        where: { accountNumber: findUserByAccountNumberDto.accountNumber },
      });
      if (!user) {
        throw new RpcException({ status: 404 });
      }
      return user;
    } catch (error) {
      if (error?.error?.status === 404) {
        throw new RpcException({ status: 404, data: 'User not found' });
      }
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }

  @MessagePattern({ cmd: 'find-user-by-identity-number' })
  async findUserByIdentityNumber(payload: any) {
    const findUserByIdentityNumberDto = plainToInstance(
      FindUserByIdentityNumberDto,
      payload,
    );
    const errors = await validate(findUserByIdentityNumberDto);
    if (errors.length > 0) {
      throw new RpcException({ status: 400, data: errors });
    }
    try {
      const user = await this.prismaService.user.findUnique({
        where: { identityNumber: findUserByIdentityNumberDto.identityNumber },
      });
      if (!user) {
        throw new RpcException({ status: 404 });
      }
      return user;
    } catch (error) {
      if (error?.error?.status === 404) {
        throw new RpcException({ status: 404, data: 'User not found' });
      }
      throw new RpcException({ status: 409, data: error.message || error });
    }
  }
}
