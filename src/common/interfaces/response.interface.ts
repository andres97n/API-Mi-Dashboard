
export interface Response {
  ok: boolean;
  timestamp: string;
  message: string;
  code: number;
  data?: any;
  path?: string;
}