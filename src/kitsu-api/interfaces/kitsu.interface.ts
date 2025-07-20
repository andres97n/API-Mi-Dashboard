

export interface KitsuResponse {
  data: Array<any> | object;
  meta: {
    count: number;
    total?: number;
  };
  links?: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}

export interface KitsuSearchResponse {
  data: Array<any> | object;
  meta: {
    count: number;
    total?: number;
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}