import { Column, DataType, Model, PrimaryKey } from 'sequelize-typescript';

export abstract class BaseModel<T> extends Model<T> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public _id: string;
}
