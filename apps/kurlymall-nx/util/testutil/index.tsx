import React, { PropsWithChildren } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { setupStore } from '../../src/shared/store';
import type { AppStore, RootState } from '../../src/shared/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV !== 'production' ? () => {} : console.error,
  },
});

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders(
  hook: any, // 과제: 커스텀 훅의 타입은 ?
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  queryClient.clear();

  function Wrapper({ children }: PropsWithChildren<unknown>) {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );
  }
  return { store, ...renderHook((props) => hook(props), { wrapper: Wrapper, ...renderOptions }) };
}
