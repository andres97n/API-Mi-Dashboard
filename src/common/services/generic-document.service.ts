import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';


const DEFAULT_NOT_FOUND_MESSAGE = 'Record not found';

@Injectable()
export class GenericService<T> {
  constructor(private readonly model: Model<T>) {}

  async findAll() {
    return await this.model.find().exec();
  }

  async findById(id: string, message?: string) {
    const serie = await this.model.findById(id).exec();
    if (!serie) throw new NotFoundException(message || DEFAULT_NOT_FOUND_MESSAGE);
    return serie;
  }

  async findOne(filter: Partial<Record<keyof T, unknown>>, message?: string): Promise<T> {
    const result = await this.model.findOne(filter).exec();
    if (!result) throw new NotFoundException(message || DEFAULT_NOT_FOUND_MESSAGE);
    return result;
  }

  async findOneWithoutException(objectSearch: Partial<Record<keyof T, unknown>>) {
    return await this.model.findOne(objectSearch).exec();
  }

}
