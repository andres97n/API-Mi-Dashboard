import { Injectable } from "@nestjs/common";

import { AxiosAdapter } from "../adapters";


@Injectable()
export class ApiService {
  constructor(private readonly axiosAdapter: AxiosAdapter) {}

  async getData<T>(
    apiUrl: string, 
    showError?: (data: any) => void
  ): Promise<T> {
    return await this.axiosAdapter.get<T>(apiUrl, showError);
  }
}
