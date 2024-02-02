import { NatsClient } from '@app/nats-connector';
import { Injectable } from '@nestjs/common';
import { UserMessagePattern } from 'libs/globals/message-patterns/user.message.patterns';
import { BaseProvider } from 'libs/globals/providers/base.provider';
import { IGUser } from './types/gateway.user.interface';

@Injectable()
export class UserGateway extends BaseProvider {
  constructor() {
    super(UserGateway.name);
  }

  private _client: NatsClient = new NatsClient(['192.162.246.63:4222']);

  public async requestUser(personalCode: string): Promise<IGUser> {
    const payload = {
      personalCode,
    };

    this._logger.debug(`User requested with payload`, payload);

    const user = await this._client.send(
      UserMessagePattern.v1.User.GET_USER,
      payload,
    );

    if (user.error) {
      this._logger.error(`User request failed with error`, user);
      return null;
    }

    return user as IGUser;
  }
}
