import { GradeRepository } from './grade.repository';
import { UserRepository } from './user.repository';

export * from './grade.repository';
export * from './user.repository';

//repos
export const REPOSITORIES = [UserRepository, GradeRepository];
