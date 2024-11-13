import { useCallback, useMemo } from 'react';

import { useLocalStorage } from '../../shared/hooks';

type QuickMenuVisited = Partial<{
  [id in string]: true;
}>;

const STORAGE_KEY = 'category_quick_menu_visited';

const useCategoryQuickMenuVisited = (id: string) => {
  const [state, setState] = useLocalStorage<QuickMenuVisited>({ key: STORAGE_KEY, initialState: {} });

  const visited = useMemo(() => !!state[id], [state, id]);

  const setVisited = useCallback(() => {
    setState((prev) => ({ ...prev, [id]: true }));
  }, [id, setState]);

  return [visited, setVisited] as const;
};

export { useCategoryQuickMenuVisited };
