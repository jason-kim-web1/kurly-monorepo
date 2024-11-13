import { createContext } from 'react';

export const swipeToNavigateContext = createContext<{
  setAutoHeight: (value: boolean) => void;
}>({
  setAutoHeight: () => {},
});
