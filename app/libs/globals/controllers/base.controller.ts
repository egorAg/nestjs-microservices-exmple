import { Logger } from '@nestjs/common';

export class BaseController {
  protected _logger: Logger;
  constructor(loggerName: string) {
    this._logger = new Logger(loggerName);
  }

  protected messageLog(message: any) {
    this._logger.log(`client#send -> message:`, message);
  }

  protected messageReceived(data: any) {
    this._logger.log(`client#receive -> `, data);
  }
}
