import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BaseController } from 'libs/globals';
import { Grade } from 'libs/globals/message-patterns/grade.message.patterns';
import { GradeReceivedDto } from '../dto/grade.received.dto';
import { GradeService } from '../services/grade.service';

@Controller()
export class GradeNatsController extends BaseController {
  constructor(private readonly _gradeService: GradeService) {
    super(GradeNatsController.name);
  }

  @EventPattern(Grade.v1.GRADE_RECEIVED)
  public async gradeReceived(@Payload() data: GradeReceivedDto) {
    this._logger.log(
      `Topic#${Grade.v1.GRADE_RECEIVED} -> message received`,
      data,
    );
    await this._gradeService.saveGrade(data);
  }
}
