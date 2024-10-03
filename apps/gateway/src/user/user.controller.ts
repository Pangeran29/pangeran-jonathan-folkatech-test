import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { SERVICE } from '@app/common';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(SERVICE.CREATE) private readonly clientCreateService: ClientProxy,
    @Inject(SERVICE.UPDATE) private readonly clientUpdateService: ClientProxy,
    @Inject(SERVICE.DELETE) private readonly clientDeleteService: ClientProxy,
    @Inject(SERVICE.READ) private readonly clientReadService: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() body: CreateDto) {
    const pattern = { cmd: 'create-user' };
    return this.clientCreateService.send<string>(pattern, body).pipe(
      map((data: string) => data),
      catchError((err) => {
        if (err?.status === 400) {
          throw new BadRequestException(err?.data);
        }
        if (err?.status === 404) {
          throw new NotFoundException(err?.data);
        }
        if (err?.status === 409) {
          throw new ConflictException(err?.data);
        }
        throw new InternalServerErrorException('Fail to create user');
      }),
    );
  }

  @Get('find')
  async find() {
    const pattern = { cmd: 'find-all-user' };
    return this.clientReadService.send<string>(pattern, {}).pipe(
      map((data: string) => data),
      catchError((err) => {
        if (err?.status === 400) {
          throw new BadRequestException(err?.data);
        }
        if (err?.status === 404) {
          throw new NotFoundException(err?.data);
        }
        if (err?.status === 409) {
          throw new ConflictException(err?.data);
        }
        throw new InternalServerErrorException('Fail to read user');
      }),
    );
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: UpdateDto) {
    const pattern = { cmd: 'update-user' };
    return this.clientUpdateService.send<string>(pattern, { ...body, id }).pipe(
      map((data: string) => data),
      catchError((err) => {
        if (err?.status === 400) {
          throw new BadRequestException(err?.data);
        }
        if (err?.status === 404) {
          throw new NotFoundException(err?.data);
        }
        if (err?.status === 409) {
          throw new ConflictException(err?.data);
        }
        throw new InternalServerErrorException('Fail to update user');
      }),
    );
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    const pattern = { cmd: 'delete-user' };
    return this.clientDeleteService.send<string>(pattern, { id }).pipe(
      map((data: string) => data),
      catchError((err) => {
        if (err?.status === 400) {
          throw new BadRequestException(err?.data);
        }
        if (err?.status === 404) {
          throw new NotFoundException(err?.data);
        }
        if (err?.status === 409) {
          throw new ConflictException(err?.data);
        }
        throw new InternalServerErrorException('Fail to delete user');
      }),
    );
  }

  @Get('find-by-id/:id')
  async findUserById(@Param('id') id: number) {
    const pattern = { cmd: 'find-user-by-id' };
    return this.clientReadService.send<string>(pattern, { id }).pipe(
      map((data: string) => data),
      catchError((err) => {
        if (err?.status === 400) {
          throw new BadRequestException(err?.data);
        }
        if (err?.status === 404) {
          throw new NotFoundException(err?.data);
        }
        if (err?.status === 409) {
          throw new ConflictException(err?.data);
        }
        throw new InternalServerErrorException('Fail to read user');
      }),
    );
  }

  @Get('find-by-account-number/:account_number')
  async findUserByAccountNumber(
    @Param('account_number') accountNumber: number,
  ) {
    const pattern = { cmd: 'find-user-by-account-number' };
    return this.clientReadService.send<string>(pattern, { accountNumber }).pipe(
      map((data: string) => data),
      catchError((err) => {
        console.log(err)
        if (err?.status === 400) {
          throw new BadRequestException(err?.data);
        }
        if (err?.status === 404) {
          throw new NotFoundException(err?.data);
        }
        if (err?.status === 409) {
          throw new ConflictException(err?.data);
        }
        throw new InternalServerErrorException('Fail to read user');
      }),
    );
  }

  @Get('find-by-identity-number/:identity_number')
  async findUserByIdentityNumber(
    @Param('identity_number') identityNumber: number,
  ) {
    const pattern = { cmd: 'find-user-by-identity-number' };
    return this.clientReadService
      .send<string>(pattern, { identityNumber })
      .pipe(
        map((data: string) => data),
        catchError((err) => {
          if (err?.status === 400) {
            throw new BadRequestException(err?.data);
          }
          if (err?.status === 404) {
            throw new NotFoundException(err?.data);
          }  
          if (err?.status === 409) {
            throw new ConflictException(err?.data);
          }
          throw new InternalServerErrorException('Fail to read user');
        }),
      );
  }
}
