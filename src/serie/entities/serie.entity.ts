import { Prop, Schema } from "@nestjs/mongoose";
import { SerieEmissionStatus, SerieStatus, SerieType, SerieViewStatus } from "src/common/constants/serie.constant";

import { BaseSchema } from "src/entities/base.entity";


@Schema({ timestamps: true })
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
    required: false,
    default: 'ANIME_SERIES',
    enum: [...SerieType],
  })
  type: string;

  @Prop({
    type: String,
    required: true,
    trim: true
  })
  synopsis: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  episodeCount: number;

  @Prop({
    type: String,
    required: true,
  })
  startDate: string;

  @Prop({
    type: String,
    required: true,
  })
  endDate: string;

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
    type: Boolean,
    required: false,
    default: 'EMPTY',
    enum: [...SerieStatus],
  })
  status: boolean;

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
