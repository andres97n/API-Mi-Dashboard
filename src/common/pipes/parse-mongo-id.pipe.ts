import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const isValid = Types.ObjectId.isValid(value);

    if (!isValid || new Types.ObjectId(value).toString() !== value) {
      throw new BadRequestException(`${metadata.data} must be a valid Mongo ObjectId`);
    }

    return value;
  }
}
