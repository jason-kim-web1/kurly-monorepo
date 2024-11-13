import { head } from 'lodash';
import { useEffect } from 'react';

import { usePaging, DEFAULT_LIST_PER_PAGE } from '../../../context/m/PagingContext';
import useEMoneyInfiniteQuery from '../../../hooks/m/useEMoneyInfiniteQuery';

import DashBoardContainer from '../DashBoardContainer';
import ListContainer from '../ListContainer';

export default function PageContainer() {
  const {
    actions: { setSize, setMaxPage },
  } = usePaging();
  const { data, isSuccess } = useEMoneyInfiniteQuery();

  useEffect(() => {
    if (!data) {
      return;
    }
    const firstPageData = head(data.pages);
    if (!firstPageData) {
      return;
    }
    const {
      paging: { total },
    } = firstPageData;
    setSize(total);
    setMaxPage(Math.ceil(total / DEFAULT_LIST_PER_PAGE));
  }, [isSuccess, data, setSize, setMaxPage]);

  return (
    <>
      <DashBoardContainer />
      <ListContainer />
    </>
  );
}
