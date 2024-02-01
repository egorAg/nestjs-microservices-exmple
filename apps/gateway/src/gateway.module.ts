import { Module } from '@nestjs/common';
import { HttpUserController } from './controllers/user/http.user.controller';

@Module({
  controllers: [HttpUserController],
})
export class GatewayModule {}
