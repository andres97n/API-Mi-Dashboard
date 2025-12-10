import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { GenericService } from "src/common/services";
import { Volume } from "../entities";


@Injectable()
export class VolumeService extends GenericService<Volume> {
  constructor(
    @InjectModel( Volume.name ) 
    private readonly volumeModel: Model<Volume>,
  ) {
    super(volumeModel);
  }
}