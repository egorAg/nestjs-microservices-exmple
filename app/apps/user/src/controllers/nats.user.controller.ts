import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseController } from 'libs/globals/controllers/base.controller';
import { UserMessagePattern } from 'libs/globals/message-patterns/user.message.patterns';
import { UserService } from '../services/user.service';

@Controller()
export class NatsUserController extends BaseController {
  constructor(private readonly _userService: UserService) {
    super(NatsUserController.name);
  }

  @MessagePattern(UserMessagePattern.User.Get.GET_USER)
  public async userCreateAndGet(@Payload() data: { personalCode: string }) {
    this.messageReceived(data);
    return this._userService.createUserAndGet(data.personalCode);
  }
}
