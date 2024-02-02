import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_CODES } from '../common/errors';
import { IAppError } from '../interfaces/app.error.interface';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: IAppError = {
      code: 'ERR_INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
    };

    if (this.isAppError(exception)) {
      error = {
        code: exception.code,
        message: exception.message,
      };
      switch (exception.code) {
        case ERROR_CODES.ERR_WRONG_FORMAT:
          status = HttpStatus.BAD_REQUEST;
          break;
        case ERROR_CODES.ERR_VALIDATION_FAIL:
          status = HttpStatus.BAD_REQUEST;
          break;
        case ERROR_CODES.ERR_ENTITY_NOT_FOUND:
          status = HttpStatus.NOT_FOUND;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          break;
      }
    }

    response.status(status).json({ error });
  }

  private isAppError(exception: any): exception is IAppError {
    return (
      exception &&
      typeof exception.code === 'string' &&
      typeof exception.message === 'string'
    );
  }
}
