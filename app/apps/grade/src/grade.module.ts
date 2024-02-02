import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { GradeNatsController } from './controllers/grade.controller';
import { UserGateway } from './gateways/user.gateway';
import { GradeService } from './services/grade.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GradeNatsController],
  providers: [UserGateway, GradeService],
})
export class GradeModule {}
