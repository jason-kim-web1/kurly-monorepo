import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props<T> {
  key: string;
  initialState: T;
}

export function useLocalStorage<T>({ key, initialState }: Props<T>): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    if (typeof window === undefined) {
      return initialState;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
