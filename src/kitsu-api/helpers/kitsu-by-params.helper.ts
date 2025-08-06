import { NotFoundException } from "@nestjs/common";

import { ApiService } from "src/common/services";
import { KitsuMainIndividualResponse } from "../interfaces";
import { KITSU_API_BASE_URL } from "../constants";
import { getKitsuErrorById } from "./kitsu-errors.helper";
import { isKitsuTypeEnum } from "../enums";
import { AxiosAdapter } from "src/common/adapters";
import { HttpService } from "@nestjs/axios";



const http = new AxiosAdapter(new HttpService());

export const getKitsuSerieById = async (type: string, id: number) => {

  if (!isKitsuTypeEnum(type)) throw new NotFoundException(`Invalid Kitsu type: ${type}`);

  // const httpService = new ApiService(http);
  const { data, errors } = await http.get<KitsuMainIndividualResponse>(
    `${KITSU_API_BASE_URL}${type}/${id}`,
    getKitsuErrorById
  );

  // const { data, errors } = kitsuData;

  if (errors && errors.length > 0) throw new NotFoundException(`Kitsu API error: ${errors[0].detail}`);

  return data;
}