import { Injectable } from '@nestjs/common';

import { SearchKitsuApiDto } from './dto';
import { getKitsuErrorById, kitsuFindOneValidation } from './helpers';
import { AxiosAdapter } from 'src/common/adapters';
import { KitsuMainIndividualResponse, KitsuResponse } from './interfaces';
import { KITSU_API_BASE_URL, KITSU_ATTRIBUTE_DEFAULT } from './constants';


@Injectable()
export class KitsuApiService {

  constructor(
    private readonly http: AxiosAdapter,
  ) {}

  async findAll(kitsuSearchDto: SearchKitsuApiDto) {
    const { name, reference, attribute, pageLimit, pageOffset } = kitsuSearchDto;
    const attributeParam = attribute ?? KITSU_ATTRIBUTE_DEFAULT;
    const pageLimitUrl = pageLimit ? `&page[limit]=${pageLimit}` : '';
    const pageOffsetUrl = pageOffset ? `&page[offset]=${pageOffset}` : '';
  
    const { data, meta, links } = await this.http.get<KitsuResponse>(
      // `${KITSU_API_BASE_URL}${reference}?filter[${attributeParam}]=${name}&fields[${reference}]=${attribute}&page[limit]=${pageLimit}&page[offset]=${pageOffset}`
      `${KITSU_API_BASE_URL}${reference}?filter[${attributeParam}]=${name}${pageLimitUrl}${pageOffsetUrl}`
    );
  
    
    return {
      data,
      meta: {
        count: meta?.count ?? 0,
        ...(meta?.total && { total: meta.total }),
        ...(links?.first ? { first: links.first } : { first: '' }),
        ...(links?.last ? { last: links.last } : { last: '' }),
        ...(links?.next && { next: links.next }),
        ...(links?.prev && { prev: links.prev }),
      }
    }
  }

  async findOne(id: number, type: string = 'anime') {
    kitsuFindOneValidation(id, type);

    const { data } = await this.http.get<KitsuMainIndividualResponse>(
      `${KITSU_API_BASE_URL}${type}/${id}`,
      getKitsuErrorById
    );

    return data;
  }
  
}
