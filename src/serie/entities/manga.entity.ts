import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { BaseSchema } from "src/common/entities/base.entity";
import { MANGA_LANGUAGES } from "../constants/manga.constant";


@Schema({ 
  timestamps: true,
  toJSON: { versionKey: false },
  toObject: { versionKey: false }, 
})
export class Manga extends BaseSchema{
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  idSerie: mongoose.Types.ObjectId;

  @Prop({ 
    type: Number,
    required: true,
  })
  volumesNumber: number;

  @Prop({
    type: String,
    required: true,
    index: true
  })
  editorial: string;

  @Prop({
    type: String,
    required: true,
  })
  editorialCountry: string;

  @Prop({
    type: String,
    required: true,
    enum: [...MANGA_LANGUAGES],
  })
  language: string;
  
}

const MangaSchema = SchemaFactory.createForClass(Manga);
MangaSchema.add(SchemaFactory.createForClass(BaseSchema));

export { MangaSchema };