import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { BaseSchema } from "src/common/entities";
import { POSTER_IMAGE_DEFAULT_URL, VOLUME_BOUGHT } from "../constants";
import { LoinTypeEnum, PurchaseStatusEnum } from "../enums";


@Schema({ 
  timestamps: true,
  toJSON: { versionKey: false },
  toObject: { versionKey: false }, 
})
export class Volume extends BaseSchema{
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  idManga: mongoose.Types.ObjectId;

  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    index: true,
  })
  idBoxset: mongoose.Types.ObjectId;

  @Prop({ 
    type: URL,
    required: true,
    default: POSTER_IMAGE_DEFAULT_URL
  })
  posterUrl: string;

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
    type: Date,
    required: true,
  })
  publicationDate: Date;

  @Prop({ 
    type: String,
    required: false,
    default: "S/N"
  })
  details: string;

  @Prop({ 
    type: String,
    required: false,
    default: ""
  })
  isbn: string;

  @Prop({ 
    type: String,
    required: false,
    default: VOLUME_BOUGHT,
    enum: PurchaseStatusEnum,
  })
  purchaseStatus: string;

  @Prop({ 
    type: String,
    required: false,
    default: LoinTypeEnum.paperback,
    enum: LoinTypeEnum,
  })
  loinType: LoinTypeEnum;

  @Prop({ 
    type: URL,
    required: false,
  })
  informationUrl: string;
}

const VolumeSchema = SchemaFactory.createForClass(Volume);
VolumeSchema.add(SchemaFactory.createForClass(BaseSchema));

export { VolumeSchema };