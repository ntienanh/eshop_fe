import { ServiceName } from "./types/enum";

export const config = {
  [ServiceName.User]: '/users',
  [ServiceName.Product]: '/products',

  staleTime: 5 * 60 * 1000, // default: 0
  cacheTime: 5 * 60 * 1000, // default: 5 minutes
} as any;
