import { crateUserCode } from '@app/utils';
import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../common/model.base';

@Table
export class User extends BaseModel<User> {
  @Column
  personalCode: string = crateUserCode();

  @Column
  name: string;

  @Column
  lastName: string;
}
