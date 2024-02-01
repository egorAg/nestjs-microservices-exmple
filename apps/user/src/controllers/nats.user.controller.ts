import { User } from '@app/database/models';
import { Controller } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { BaseController } from 'libs/globals/base.controller';
import { UserMessagePattern } from 'libs/globals/message-patterns/user.message.patterns';
import { UserService } from '../services/user.service';

@Controller('user')
export class NatsUserController extends BaseController {
  constructor(private readonly service: UserService) {
    super(NatsUserController.name);
  }

  @Client({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  })
  client: ClientProxy;

  @MessagePattern(UserMessagePattern.User.Create.CREATE_USER)
  public async create(data: User) {
    const user = await this.service.createUser(data);
    this.messageLog(UserMessagePattern.User.Create.USER_CREATED);
    this.client.emit(UserMessagePattern.User.Create.USER_CREATED, user);
  }
}
