import { HttpException, HttpStatus } from '@nestjs/common';
import { IAppError } from '../interfaces/app.error.interface';

export enum ERROR_CODES {
  ERR_INTERNAL = 'INTERNAL_ERROR',
  ERR_WRONG_FORMAT = 'ERR_WRONG_FORMAT',
  ERR_VALIDATION_FAIL = 'ERR_VALIDATION_FAIL',
  ERR_ENTITY_NOT_FOUND = 'ERR_ENTITY_NOT_FOUND',
}

export class InternalError extends HttpException implements IAppError {
  constructor(message?: string) {
    super(message || 'Unexpected error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  code = ERROR_CODES.ERR_INTERNAL;
  message = 'Unexpected error';
}

export class WrongFormatError extends InternalError {
  code = ERROR_CODES.ERR_WRONG_FORMAT;
  message = 'Unexpected request body format';
}

export class ValidationError extends InternalError {
  code = ERROR_CODES.ERR_VALIDATION_FAIL;
  message = this.message.toString();
}

export class UserNotFoundError extends InternalError {
  code = ERROR_CODES.ERR_ENTITY_NOT_FOUND;
  message = this.message || 'Student not found';
}
