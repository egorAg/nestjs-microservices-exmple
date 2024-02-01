import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const logger = new Logger('UserMicroserviceApp');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
      },
    },
  );
  await app
    .listen()
    .then(() => {
      logger.log('Started successfully');
    })
    .catch((err) => {
      logger.error(err);
      process.exit(0);
    });
}
bootstrap();
