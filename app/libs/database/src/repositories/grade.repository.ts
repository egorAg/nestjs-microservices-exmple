import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/database.base.repository';
import { Grade } from '../models';

@Injectable()
export class GradeRepository extends BaseRepository<Grade> {
  constructor() {
    super(Grade, GradeRepository.name);
  }

  getModelInstance(data: Partial<Grade>): Grade {
    return new Grade(data);
  }
}
