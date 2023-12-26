import { ServiceName } from "./enum";

export interface IPagination<T = any> {
  results: T[];
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
}
export interface ResponseData {
  [ServiceName.User]: IPagination<any>;
  [ServiceName.Product]: IPagination<any>;
  [key: string]: Partial<any> & IPagination<Partial<any>>;
}


export interface Services<T extends keyof ResponseData, K = any> {
  method?: string;
  body?: K;
  serviceName: T;
  options?: Partial<ExtendsRequestProps<T>>;
}

export interface ExtendsRequestProps<T extends keyof ResponseData> {
  params: IParams<T>;
  querystring: any;
  auth: boolean;
  timeout?: number;
  externalUrl?: boolean;
  headers: { [key: string]: string };
  revalidate?: number;
  signal?: AbortSignal;
}

export type IParams<T extends keyof ResponseData> = ResponseData[T] extends IPagination
  ? ResponseData[T]['results'][number]
  : ResponseData[T];

  