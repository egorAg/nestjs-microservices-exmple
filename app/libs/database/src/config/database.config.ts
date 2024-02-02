import { Dialect } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Grade, MODELS, User } from '../models';

export const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres' as Dialect,
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'filosoft',
  models: MODELS,
};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeConfig);
      sequelize.addModels([User, Grade]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
