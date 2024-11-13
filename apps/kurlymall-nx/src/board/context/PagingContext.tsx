import { createContext, ReactNode, useMemo, useState } from 'react';

interface StateInterface {
  currentPage: number;
  lastPage: number | null;
  isFullyLoaded: boolean;
  actions: {
    setCurrentPage(page: number): void;
    setLastPage(page: number | null): void;
  };
}

const initialState: StateInterface = {
  currentPage: 0,
  lastPage: null,
  isFullyLoaded: false,
  actions: {
    setCurrentPage: () => {},
    setLastPage: () => {},
  },
};

interface PagingContextProviderProps {
  children?: ReactNode;
}

export const PagingContext = createContext(initialState);

export const PagingContextProvider = ({ children }: PagingContextProviderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState<number | null>(null);

  const actions = useMemo(
    () => ({
      setCurrentPage: (nextCurrentPage: number) => setCurrentPage(nextCurrentPage),
      setLastPage: (currentLastPage: number | null) => setLastPage(currentLastPage),
    }),
    [],
  );

  const isFullyLoaded = useMemo(() => lastPage !== null && currentPage >= lastPage, [currentPage, lastPage]);

  const value = useMemo(
    () => ({ currentPage, lastPage, isFullyLoaded, actions }),
    [currentPage, lastPage, isFullyLoaded, actions],
  );

  return <PagingContext.Provider value={value}>{children}</PagingContext.Provider>;
};
