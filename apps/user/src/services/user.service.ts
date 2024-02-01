import { User } from '@app/database/models';
import { UserRepository } from '@app/database/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(data: User) {
    await this.userRepository.create(data);
  }
}
