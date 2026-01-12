import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { GenericService } from "src/common/services";
import { Boxset } from "../entities";


@Injectable()
export class BoxsetService extends GenericService<Boxset> {
  constructor(
    @InjectModel( Boxset.name ) 
    private readonly boxsetModel: Model<Boxset>,
  ) {
    super(boxsetModel);
  }
}