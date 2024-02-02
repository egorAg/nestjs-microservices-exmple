import { Logger } from '@nestjs/common';

export class BaseProvider {
  _logger: Logger;
  constructor(loggerName: string) {
    this._logger = new Logger(loggerName);
  }
}
