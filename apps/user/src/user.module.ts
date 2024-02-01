import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { NatsUserController } from './controllers/nats.user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NatsUserController],
  providers: [UserService],
})
export class UserModule {}
