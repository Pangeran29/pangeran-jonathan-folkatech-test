import { Module } from '@nestjs/common';
import { DeleteController } from './delete.controller';
import { PrismaService } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/delete/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        APP_NAME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [DeleteController],
  providers: [PrismaService],
})
export class DeleteModule {}
