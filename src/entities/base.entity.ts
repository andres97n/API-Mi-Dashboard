// common/schemas/base.schema.ts
import { Prop, Schema } from '@nestjs/mongoose';


@Schema()
export class BaseSchema {
  @Prop({
    type: String,
    required: false,
    default: 'default', 
    enum: ['A', 'I', 'D'],
  })
  state: string;

}
