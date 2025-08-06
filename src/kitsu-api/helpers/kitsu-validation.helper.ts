import { NotFoundException } from "@nestjs/common";

import { isKitsuTypeEnum } from "../enums";


export const kitsuFindOneValidation = (id: number, type: string = 'anime') => {
  if (!isKitsuTypeEnum(type)) 
    throw new NotFoundException(`Invalid Kitsu type: ${type}`);

  return null;
}