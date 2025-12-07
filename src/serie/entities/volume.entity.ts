import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { BaseSchema } from "src/common/entities";
import { PurchaseStatus, VOLUME_BOUGHT } from "../constants";


@Schema({ 
  timestamps: true,
  toJSON: { versionKey: false },
  toObject: { versionKey: false }, 
})
export class Volume extends BaseSchema{
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  idManga: mongoose.Types.ObjectId;

  @Prop({ 
    type: Number,
    required: true,
  })
  volumeNumber: number;

  @Prop({ 
    type: Number,
    required: true,
  })
  pagesNumber: number;

  @Prop({ 
    type: Number,
    required: true,
  })
  price: number;

  @Prop({ 
    type: Number,
    required: false,
    default: ""
  })
  details: number;

  @Prop({ 
    type: String,
    required: true,
    default: VOLUME_BOUGHT,
    enum: [...PurchaseStatus],
  })
  purchaseStatus: string;
}

const VolumeSchema = SchemaFactory.createForClass(Volume);
VolumeSchema.add(SchemaFactory.createForClass(BaseSchema));

export { VolumeSchema };