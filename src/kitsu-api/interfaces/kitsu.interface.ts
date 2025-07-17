

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