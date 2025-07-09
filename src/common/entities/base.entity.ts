// common/schemas/base.schema.ts
import { Prop, Schema } from '@nestjs/mongoose';


@Schema()
export class BaseSchema {
  @Prop({
    type: String,
    required: false,
    default: 'A', 
    enum: ['A', 'I', 'D'],
  })
  state: string;

}
