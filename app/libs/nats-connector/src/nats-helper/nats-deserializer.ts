import { Logger } from '@nestjs/common';
import { Deserializer } from '@nestjs/microservices';

export class NatsDeserializer implements Deserializer {
  private _logger: Logger = new Logger(NatsDeserializer.name);

  deserialize(value: any, options?: Record<string, any>) {
    this._logger.log(
      `Deserializing oncoming message -> ${JSON.stringify(value)}`,
    );
    const transformed = JSON.parse(value);
    console.log(transformed);
    return JSON.parse(Buffer.from(value).toString());
  }
}
