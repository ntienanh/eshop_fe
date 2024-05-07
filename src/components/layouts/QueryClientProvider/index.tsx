'use client';

import { config } from '@/config';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import {
  QueryClientProvider as BaseQueryClientProvider,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        defaultOptions: { queries: { staleTime: config.staleTime } },
        queryCache: new QueryCache({ onError }),
        mutationCache: new MutationCache({ onError }),
      }),
  );

  return (
    <BaseQueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      {children}
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;

const onError = (error: Error) =>
  notifications.show({
    message: error.message || 'Có lỗi xảy ra!!!',
    color: 'red',
    icon: <IconX size='1.1rem' />,
  });
