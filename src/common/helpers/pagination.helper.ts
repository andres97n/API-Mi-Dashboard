import { FilterQuery, Model, ProjectionType, SortOrder } from 'mongoose';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResult } from '../interfaces';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants';


export async function paginate<T>(
  model: Model<T>,
  paginationQuery: PaginationQueryDto,
  filter: FilterQuery<T> = {},
  sort: Record<string, SortOrder> = { createdAt: -1 },
  projection?: ProjectionType<T> | null,
): Promise<PaginatedResult<T>> {
  const { limit = DEFAULT_PAGE_SIZE, page = DEFAULT_PAGE } = paginationQuery;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.find(filter, projection).sort(sort).skip(skip).limit(limit).exec(),
    model.countDocuments(filter).exec(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
