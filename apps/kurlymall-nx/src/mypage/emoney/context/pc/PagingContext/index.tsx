import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

import { nop } from '../../../constants';

interface State {
  currentPage: number;
  maxPage: number;
  actions: {
    setMaxPage(page: number): void;
    setCurrentPage(page: number): void;
  };
}

const initialState: State = {
  currentPage: 1,
  maxPage: 1,
  actions: {
    setMaxPage: nop,
    setCurrentPage: nop,
  },
};

const PagingContext = createContext(initialState);

interface PagingProviderProps {
  children: ReactNode;
}

export const PagingProvider = ({ children }: PagingProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const actions = useMemo(
    () => ({
      setMaxPage: (nextMaxPage: number) => setMaxPage(nextMaxPage),
      setCurrentPage: (nextCurrentPage: number) => setCurrentPage(nextCurrentPage),
    }),
    [],
  );
  const value = useMemo(() => ({ currentPage, maxPage, actions }), [currentPage, maxPage, actions]);
  return <PagingContext.Provider value={value}>{children}</PagingContext.Provider>;
};

export const usePaging = () => {
  const value = useContext(PagingContext);
  if (value === undefined) {
    throw new Error('usePaging 는 PagingContext 와 함께 사용되어야 합니다.');
  }
  return value;
};
