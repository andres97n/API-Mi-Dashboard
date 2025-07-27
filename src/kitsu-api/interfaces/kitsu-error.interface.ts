

export interface KitsuErrorById {
  title:  string;
  detail: string;
  code:   string;
  status: string;
}

export interface KitsuErrorByIdResponse {
  errors: KitsuErrorById[];
}
