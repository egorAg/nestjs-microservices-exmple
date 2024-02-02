import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { UserMessagePattern } from 'libs/globals/message-patterns/user.message.patterns';
import { BaseProvider } from 'libs/globals/providers/base.provider';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserGateway extends BaseProvider {
  constructor() {
    super(UserGateway.name);
  }

  @Client({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  })
  private _client: ClientProxy;

  public async getUserByPersonalCode(personalCode: string) {
    this._logger.log(`request user by personal code: ${personalCode}`);
    const user = this._client.send(UserMessagePattern.User.Get.GET_USER, {
      personalCode,
    });
    return firstValueFrom(user);
  }
}
