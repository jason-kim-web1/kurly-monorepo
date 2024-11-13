import type { PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const QueryClientWrapper = ({ children }: PropsWithChildren<unknown>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
