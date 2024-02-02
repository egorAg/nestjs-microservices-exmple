import { Controller, Get } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { BaseController } from 'libs/globals/controllers/base.controller';
import { UserMessagePattern } from 'libs/globals/message-patterns/user.message.patterns';

@Controller('user')
export class HttpUserController extends BaseController {
  @Client({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  })
  private _client: ClientProxy;

  constructor() {
    super(HttpUserController.name);
  }

  @Get()
  public async createUser() {
    const data = {
      name: crypto.randomBytes(6).toString('hex'),
      lastName: crypto.randomBytes(6).toString('hex'),
    };

    this.messageLog(UserMessagePattern.User.Create.CREATE_USER);

    return this._client.send(UserMessagePattern.User.Create.CREATE_USER, data);
  }
}
