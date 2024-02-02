import { User } from '@app/database/models';
import { UserRepository } from '@app/database/repositories';
import { Injectable } from '@nestjs/common';
import { BaseProvider } from 'libs/globals';
import { UserGateway } from '../gateways/user.gateway';

@Injectable()
export class UserService extends BaseProvider {
  constructor(
    private readonly _userRepo: UserRepository,
    private readonly _userGateway: UserGateway,
  ) {
    super(UserService.name);
  }

  public async createUserAndGet(personalCode: string): Promise<User> {
    const candidateUser: User = await this.isUserExists(personalCode);

    if (candidateUser) {
      return candidateUser;
    }

    const remoteUser = await this._userGateway.requestUser(personalCode);

    if (!remoteUser) {
      this._logger.error(
        `Can't resolve remote user with personalCode: ${personalCode}`,
      );
      return null;
    }

    this._logger.debug(`Creating new user with personalCode: ${personalCode}`);

    const newUser = await this._userRepo.create(remoteUser);

    await newUser.save();

    return newUser;
  }

  public async isUserExists(personalCode: string) {
    const databaseUser = await this._userRepo.getUserByPersonalCode(
      personalCode,
    );

    if (!databaseUser) {
      this._logger.warn(
        `User with personalCode: ${personalCode} not stored in database`,
      );

      return;
    }

    return databaseUser;
  }
}
