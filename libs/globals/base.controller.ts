import { Logger } from '@nestjs/common';

export class BaseController {
  protected _logger: Logger;
  constructor(loggerName: string) {
    this._logger = new Logger(loggerName);
  }

  protected messageLog(message) {
    this._logger.log(`client#send -> topic: "${message}"`);
  }
}
