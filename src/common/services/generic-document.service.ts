import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { handleExceptions } from '../utils';


const DEFAULT_NOT_FOUND_MESSAGE = 'Record not found';

@Injectable()
export class GenericService<T> {
  constructor(private readonly model: Model<T>) {}

  async findAll() {
    return await this.model.find().exec();
  }

  async findById(id: string, message?: string) {
    const record = await this.model.findById(id).exec();
    if (!record) throw new NotFoundException(message || DEFAULT_NOT_FOUND_MESSAGE);
    return record;
  }

  async findOne(filter: Partial<Record<keyof T, unknown>>, message?: string): Promise<T> {
    const result = await this.model.findOne(filter).exec();
    if (!result) throw new NotFoundException(message || DEFAULT_NOT_FOUND_MESSAGE);
    return result;
  }

  async findOneWithoutException(objectSearch: Partial<Record<keyof T, unknown>>) {
    return await this.model.findOne(objectSearch).exec();
  }

  async create(createDto: any) {
    try {
      const record = await this.model.create(createDto);
      return record;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async update(id: string, updateDto: any, message?: string) {
    const record = await this.model.findByIdAndUpdate(
      id,
      updateDto,
      { new: true }
    );
    if (!record) throw new NotFoundException(message || DEFAULT_NOT_FOUND_MESSAGE);
    return record;
  }

  async remove(id: string, message?: string) {
    const record = await this.model.findByIdAndUpdate(
      id,
      { state: 'D' },
      { new: true }
    );
    if (!record) throw new NotFoundException(message || DEFAULT_NOT_FOUND_MESSAGE);
    return record;
  }

}
