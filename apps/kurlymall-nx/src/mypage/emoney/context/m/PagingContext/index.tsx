import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

import { nop } from '../../../constants';

export const DEFAULT_LIST_PER_PAGE = 10;

interface State {
  size: number;
  maxPage: number;
  actions: {
    setSize(size: number): void;
    setMaxPage(page: number): void;
  };
}

const initialState: State = {
  size: 0,
  maxPage: 1,
  actions: {
    setSize: nop,
    setMaxPage: nop,
  },
};

const PagingContext = createContext(initialState);

interface PagingProviderProps {
  children: ReactNode;
}

export const PagingContextProvider = ({ children }: PagingProviderProps) => {
  const [size, setSize] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const actions = useMemo(
    () => ({
      setSize: (nextSize: number) => setSize(nextSize),
      setMaxPage: (nextSize: number) => setMaxPage(nextSize),
    }),
    [],
  );
  const value = useMemo(() => ({ size, maxPage, actions }), [size, maxPage, actions]);
  return <PagingContext.Provider value={value}>{children}</PagingContext.Provider>;
};

export const usePaging = () => {
  const value = useContext(PagingContext);
  if (value === undefined) {
    throw new Error('usePaging 는 PagingContext 와 함께 사용되어야 합니다.');
  }
  return value;
};
