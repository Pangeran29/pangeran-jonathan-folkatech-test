import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ReadModule } from './read.module';

async function bootstrap() {
  const app = await NestFactory.create(ReadModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.connectMicroservice({
    Transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });
  await app.startAllMicroservices();
  const logger = new Logger('NestApplication');
  logger.warn(`========== READ SERVICE ==========`);
}
bootstrap();
