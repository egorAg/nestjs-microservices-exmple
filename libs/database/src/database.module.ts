import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from './config/database.config';
import { GradeRepository, REPOSITORIES, UserRepository } from './repositories';

@Module({
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize(sequelizeConfig);
        await sequelize.sync();
        return sequelize;
      },
    },
    UserRepository,
    GradeRepository,
  ],
  exports: [...REPOSITORIES],
})
export class DatabaseModule {}
