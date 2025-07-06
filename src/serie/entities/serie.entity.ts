import { Prop, Schema } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class Serie {
  
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
    enum: ['ANIME_SERIES', 'MANGA_SERIES', 'TV_SERIES', 'MOVIE', 'DOCUMENTARY'],
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
    enum: ['IN_BROADCAST', 'INCOMPLETE', 'COMPLETED', 'UNFINISHED', 'CANCELED', 'EMPTY'],
  })
  status: boolean;

  @Prop({
    type: String,
    required: false,
    default: 'SERIES_NOT_STARTED',
    enum: ['FINISHED_SERIE', 'UNFINISHED_SERIES', 'STREAMING_SERIES', 'SERIES_NOT_STARTED'],
  })
  emissionStatus: string;

  @Prop({
    type: String,
    required: false,
    default: 'UNSEEN_SERIES',
    enum: ['SEEN_SERIES', 'UNSEEN_SERIES', 'INCOMPLETE_VIEW_SERIES'],
  })
  viewStatus: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  progress: number;
  
}
