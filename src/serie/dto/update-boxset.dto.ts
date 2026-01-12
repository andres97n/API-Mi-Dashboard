import { PartialType } from "@nestjs/swagger";
import { CreateBoxsetDto } from "./create-boxset.dto";


export class UpdateBoxsetDto extends PartialType(CreateBoxsetDto) {}
