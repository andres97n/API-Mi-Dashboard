import { Injectable } from "@nestjs/common";
import { GenericService } from "src/common/services";
import { Manga } from "../entities";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class MangaService extends GenericService<Manga> {
  constructor(
    @InjectModel( Manga.name ) 
    private readonly mangaModel: Model<Manga>,
  ) {
    super(mangaModel);
  }
}