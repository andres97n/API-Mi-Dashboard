import { NotFoundException } from "@nestjs/common";

import { KitsuErrorByIdResponse } from "../interfaces";
import { getExceptionDefault } from "src/common/helpers";


export const getKitsuErrorById = (
  responseError: KitsuErrorByIdResponse
) => {
  
  const { errors } = responseError;
  console.log(`Kitsu API error:`, errors);

  if (errors && Array.isArray(errors)) {
    throw new NotFoundException(`Kitsu API error: ${errors[0].detail}`);
  }

  getExceptionDefault(500);
}