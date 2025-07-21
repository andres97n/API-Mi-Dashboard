import { HttpService } from "@nestjs/axios";

import { ApiService } from "src/common/services";
import { KitsuMainIndividualResponse } from "../interfaces";
import { KITSU_API_BASE_URL } from "../constants";
import { NotFoundException } from "@nestjs/common";


export const getKitsuSerieById = async (type: string, id: number) => {
  const httpService = new ApiService(new HttpService());
  const kitsuData = await httpService.getData<KitsuMainIndividualResponse>(
    `${KITSU_API_BASE_URL}${type}/${id}`
  );

  const { data, errors } = kitsuData;

  if (errors && errors.length > 0) {
    console.log(`Kitsu API error:`, errors);
    
    throw new NotFoundException(`Kitsu API error: ${errors[0].detail}`);
  }

  //TODO: Validate type

  return data;
}