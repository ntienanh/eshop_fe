import { config as Config } from "@/config";
import { HTTPMethod, StatusCode } from "@/types/enum";
import { IParams, ResponseData, Services } from "@/types/interfaces";

export const serviceProcessor = async <T extends keyof ResponseData, K = any>(
  props: Services<T, K>
): Promise<ResponseData[T]> => {
  const {
    method = HTTPMethod.Get,
    serviceName,
    body,
    options: {
      externalUrl,
      params,
      querystring,
      signal,
      headers,
      revalidate,
    } = {},
  } = props;

  const data = method === HTTPMethod.Get ? undefined : body;
  const url = buildUrl(serviceName, params, querystring, externalUrl);

  const res = await fetch(url, {
    body: JSON.stringify(data),
    method,
    next: { revalidate },
    signal,
    headers: { "Content-Type": "application/json", ...headers },
  });

  if (res.status === StatusCode.NoContent) return null as any;
  const response = await res?.json();
  if (!res.ok) throw response;

  return response;
};

const buildUrl = (
  serviceName: keyof ResponseData,
  params?: IParams<any>,
  querystring?: any,
  externalUrl?: boolean
): string => {
  const url = process.env.NEXT_PUBLIC_API_URL as string;
  const apiUrl = externalUrl ? "" : url?.endsWith("/") ? url.slice(0, -1) : url;
  const newParams = buildParam(params as any);
  const api = Config?.[serviceName] || `/${serviceName}`;
  const newQuerystring = !!querystring ? querystring : "";
  return `${apiUrl}${api}${newParams}${newQuerystring}`;
};

const buildParam = <T extends keyof ResponseData>(params: IParams<T>) => {
  const sub = Object.values(params || {})[0] as any;
  if (!sub) return "";
  if (sub.startsWith("/")) return sub;
  return `/${sub}`;
};
