import { HttpService } from "@nestjs/axios";

import { ApiService } from "src/common/services";
import { SearchKitsuApiDto } from "../dto";
import { KitsuResponse, KitsuSearchResponse } from "../interfaces";
import { KITSU_API_BASE_URL, KITSU_ATTRIBUTE_DEFAULT } from "../constants";


const http = new HttpService();

export const kitsuSearching = async (
  kitsuSearchDto: SearchKitsuApiDto
): Promise<KitsuSearchResponse> => {
  const { name, reference, attribute, pageLimit, pageOffset } = kitsuSearchDto;
  const kitsuApiService = new ApiService(http);
  const attributeParam = attribute ?? KITSU_ATTRIBUTE_DEFAULT;
  const pageLimitUrl = pageLimit ? `&page[limit]=${pageLimit}` : '';
  const pageOffsetUrl = pageOffset ? `&page[offset]=${pageOffset}` : '';

  const kitsuData = await kitsuApiService.getData<KitsuResponse>(
    // `${KITSU_API_BASE_URL}${reference}?filter[${attributeParam}]=${name}&fields[${reference}]=${attribute}&page[limit]=${pageLimit}&page[offset]=${pageOffset}`
    `${KITSU_API_BASE_URL}${reference}?filter[${attributeParam}]=${name}${pageLimitUrl}${pageOffsetUrl}`
  );

  
  return {
    data: kitsuData.data,
    metaData: {
      count: kitsuData.meta?.count ?? 0,
      ...(kitsuData.meta?.total ? { total: kitsuData.meta.total } : {}),
      ...(kitsuData.links?.first ? { first: kitsuData.links.first } : { first: '' }),
      ...(kitsuData.links?.last ? { last: kitsuData.links.last } : { last: '' }),
      ...(kitsuData.links?.next ? { next: kitsuData.links.next } : {}),
      ...(kitsuData.links?.prev ? { prev: kitsuData.links.prev } : {}),
    }
  }
}