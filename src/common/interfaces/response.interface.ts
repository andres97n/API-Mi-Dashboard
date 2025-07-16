
export interface Response {
  ok: boolean;
  timestamp: string;
  message: string;
  statusCode: number;
  data?: any;
  path?: string;
  error?: any;
}

export interface ErrorResponseDetail {
  message: string;
  url?: string;
  statusCode?: number;
  error?: any;
}