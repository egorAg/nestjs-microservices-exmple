import { ErrorFilter } from '@app/error-handler';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpUserController } from './controllers/user/http.user.controller';

@Module({
  controllers: [HttpUserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class GatewayModule {}
