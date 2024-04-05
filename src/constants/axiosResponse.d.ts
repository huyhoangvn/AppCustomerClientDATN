import { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders ,AxiosResponse } from "axios";

// import { AxiosResponse } from "axios";
export interface AxiosResponse<T = any, D = any> {
  msg: string;
  currentPage: number;
  index: T,
  success: boolean;
  data: T;
  success: boolean;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}