import { useCallback, useState } from 'react';

export type PageStatus = 'keywords' | 'suggestion' | 'listContainer';

export default function usePageStatus() {
  const [pageStatus, setPageStatus] = useState<PageStatus>();

  const changePageStatus = useCallback((pageState: PageStatus) => {
    setPageStatus(pageState);
  }, []);

  return { pageStatus, changePageStatus };
}
