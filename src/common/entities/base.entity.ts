// common/schemas/base.schema.ts
import { Prop, Schema } from '@nestjs/mongoose';
import { BASE_ENTITY_STATES } from '../constants';


@Schema()
export class BaseSchema {
  @Prop({
    type: String,
    required: false,
    default: 'A', 
    enum: [...BASE_ENTITY_STATES],
  })
  state: string;

}
