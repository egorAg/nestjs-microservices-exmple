import { Logger } from '@nestjs/common';
import { Serializer } from '@nestjs/microservices';

export class NatsSerializer implements Serializer {
  private _logger: Logger = new Logger(NatsSerializer.name);
  serialize(value: any): any {
    this._logger.log(
      `Serializing oncoming message -> ${JSON.stringify(value)}`,
    );
    return value;
  }
}
