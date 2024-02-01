import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/database.base.repository';
import { User } from '../models';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User, UserRepository.name);
  }

  getModelInstance(data: Partial<User>): User {
    return new User(data);
  }
}
