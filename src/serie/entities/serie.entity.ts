import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { BaseSchema } from "src/common/entities/base.entity";
import { SerieEmissionStatus, SerieStatus, SerieType, SerieViewStatus } from "src/serie/constants";


@Schema({ 
  timestamps: true,
  toJSON: { versionKey: false },
  toObject: { versionKey: false }, 
})
export class Serie extends BaseSchema{
  
  @Prop({ 
    type: String,
    required: true,
    index: true,
    minlength: 3,
    trim: true,
  })
  name: string;

  @Prop({ 
    type: String,
    required: true,
    unique: true,
  })
  externalId: string;

  @Prop({
    type: String,
    required: true,
    default: 'ANIME_SERIES',
    enum: [...SerieType],
  })
  type: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
    default: 'S/N',
  })
  synopsis: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  episodeCount: number;

  @Prop({
    type: Date,
    required: true,
  })
  startDate: Date;

  @Prop({
    type: Date,
    required: false,
    default: ''
  })
  endDate: Date;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  posterImageUrl: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
    default: '',
  })
  bannerImageUrl: string;

  @Prop({
    type: String,
    required: false,
    default: 'EMPTY',
    enum: [...SerieStatus],
  })
  status: string;

  @Prop({
    type: String,
    required: false,
    default: 'SERIES_NOT_STARTED',
    enum: [...SerieEmissionStatus],
  })
  emissionStatus: string;

  @Prop({
    type: String,
    required: false,
    default: 'UNSEEN_SERIES',
    enum: [...SerieViewStatus],
  })
  viewStatus: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  progress: number;
  
}

const SerieSchema = SchemaFactory.createForClass(Serie);
SerieSchema.add(SchemaFactory.createForClass(BaseSchema));

export { SerieSchema };