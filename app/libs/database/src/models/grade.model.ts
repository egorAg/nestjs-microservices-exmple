import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from '.';
import { BaseModel } from '../common/model.base';

@Table
export class Grade extends BaseModel<Grade> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subject: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  grade: number;

  @ForeignKey(() => User)
  @Column
  userId: string;
}
