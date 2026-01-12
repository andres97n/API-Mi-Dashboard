import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { BaseSchema } from "src/common/entities";
import { VOLUME_BOUGHT } from "../constants";
import { PurchaseStatusEnum } from "../enums";


@Schema({ 
  timestamps: true,
  toJSON: { versionKey: false },
  toObject: { versionKey: false }, 
})
export class Boxset extends BaseSchema{
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  idManga: mongoose.Types.ObjectId; 

  @Prop({ 
    type: String,
    required: true,
  })
  name: string;

  @Prop({ 
    type: Number,
    required: true,
  })
  weight: number;

  @Prop({ 
    type: Number,
    required: true,
  })
  pagesNumber: number;

  @Prop({ 
    type: Number,
    required: true,
  })
  boxsetNumber: number;

  @Prop({ 
    type: String,
    required: false,
  })
  dimensions: string;

  @Prop({ 
    type: URL,
    required: true,
  })
  imageUrl: string;

  @Prop({ 
    type: Number,
    required: true,
  })
  price: number;

  @Prop({ 
    type: String,
    required: false,
    default: VOLUME_BOUGHT,
    enum: PurchaseStatusEnum,
  })
  purchaseStatus: string;

  @Prop({ 
    type: URL,
    required: false,
  })
  informationUrl: string;
}

const BoxsetSchema = SchemaFactory.createForClass(Boxset);
BoxsetSchema.add(SchemaFactory.createForClass(BaseSchema));

export { BoxsetSchema };