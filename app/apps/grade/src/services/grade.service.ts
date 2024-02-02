import { User } from '@app/database/models';
import { GradeRepository } from '@app/database/repositories';
import { Injectable } from '@nestjs/common';
import { BaseProvider } from 'libs/globals/providers/base.provider';
import { GradeReceivedDto } from '../dto/grade.received.dto';
import { UserGateway } from '../gateways/user.gateway';

@Injectable()
export class GradeService extends BaseProvider {
  constructor(
    private readonly _gradeRepo: GradeRepository,
    private readonly _userGateway: UserGateway,
  ) {
    super(GradeService.name);
  }

  public async saveGrade(data: GradeReceivedDto) {
    const user: User = await this._userGateway.getUserByPersonalCode(
      data.personalCode,
    );

    if (!user) {
      this._logger.error(`Can't save grade to database, user not found`);
      return;
    }

    this._logger.log('User received', user);

    try {
      const newGrade = await this._gradeRepo.create({
        date: new Date().toISOString(),
        grade: data.grade,
        subject: data.subject,
        userId: user.id,
      });

      newGrade.save();
      this._logger.log(`New grades saved with _id: ${newGrade._id}`);
    } catch (e) {
      this._logger.error(e);
    }
  }
}
