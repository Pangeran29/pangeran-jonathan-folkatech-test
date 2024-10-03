import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SERVICE } from '@app/common';

@Module({
  controllers: [UserController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE.CREATE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: configService.get('CREATE_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: SERVICE.UPDATE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: configService.get('UPDATE_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: SERVICE.DELETE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: configService.get('DELETE_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: SERVICE.READ,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: configService.get('READ_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ]
})
export class UserModule {}
