import { PartialType } from '@nestjs/swagger';
import { CreateKitsuApiDto } from './create-kitsu-api.dto';

export class UpdateKitsuApiDto extends PartialType(CreateKitsuApiDto) {}
