import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaService, SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/update/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        REDIS_SERVICE_PORT: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: SERVICE.REDIS,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: configService.get('REDIS_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UpdateController],
  providers: [PrismaService],
})
export class UpdateModule {}
