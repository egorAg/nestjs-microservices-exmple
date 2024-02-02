import { Logger } from '@nestjs/common';
import { ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { BaseModel } from './model.base';

export abstract class BaseRepository<T extends BaseModel<T>> {
  protected logger: Logger;

  constructor(protected readonly model: ModelCtor<T>, loggerName: string) {
    this.logger = new Logger(loggerName);
  }

  async findAll(): Promise<T[]> {
    this.logger.log(`Finding all records in ${this.model.name}`);
    return this.model.findAll<T>();
  }

  async findOne(id: string): Promise<T> {
    this.logger.log(`Finding record with id ${id} in ${this.model.name}`);
    return this.model.findByPk<T>(id);
  }

  async create(
    data: MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<T> {
    this.logger.log(
      `Creating a new record in ${this.model.name}`,
      JSON.stringify(data),
    );
    return this.model.create<T>(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    this.logger.log(`Updating record with id ${id} in ${this.model.name}`);

    const recordToUpdate = await this.findOne(id);

    if (!recordToUpdate) {
      this.logger.error(`Record with id ${id} not found`);
      return null;
    }

    Object.assign(recordToUpdate, data);

    try {
      await recordToUpdate.save();
      return recordToUpdate;
    } catch (error) {
      this.logger.error(
        `Error updating record with id ${id}: ${error.message}`,
      );
      throw error;
    }
  }

  async delete(id: string): Promise<number> {
    this.logger.log(`Deleting record with id ${id} in ${this.model.name}`);
    return this.model.destroy({ where: { _id: id } as any });
  }
}
