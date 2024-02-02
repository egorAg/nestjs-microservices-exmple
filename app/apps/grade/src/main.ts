import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GradeModule } from './grade.module';

async function bootstrap() {
  const logger = new Logger('GradeMicroserviceApp');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GradeModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['192.162.246.63:4222'],
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
