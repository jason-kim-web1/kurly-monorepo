import { useMemo } from 'react';
import { range } from 'lodash';

import { usePaging } from '../../../context/pc/PagingContext';
import useEMoneyListQuery from '../../../hooks/pc/useEMoneyListQuery';

import Pagination from '../../../components/pc/Pagination';
import PaginationPending from '../../../components/pc/Pagination/Pending';
import PaginationItem from '../../../components/pc/PaginationItem';

import { RESOURCE_URL } from '../../../../../shared/configs/config';

const getPageRange = (current: number, max: number) => {
  const startPageIndex = Math.max(current - 9, 1);
  const endPageIndex = Math.min(startPageIndex + 9, max) + 1;
  return range(startPageIndex, endPageIndex);
};

const PaginationContainer = () => {
  const { isError, isSuccess } = useEMoneyListQuery();
  const {
    currentPage,
    maxPage,
    actions: { setCurrentPage },
  } = usePaging();

  const handleClickPageItem = (pageNo: number) => () => setCurrentPage(pageNo);

  const prevPage = useMemo(() => Math.max(currentPage - 1, 1), [currentPage]);
  const nextPage = useMemo(() => Math.min(currentPage + 1, maxPage), [currentPage, maxPage]);
  const pageRange = useMemo(() => getPageRange(currentPage, maxPage), [currentPage, maxPage]);
  const paginationList = useMemo(
    () => [
      {
        label: <img src={`${RESOURCE_URL}/pc/etc/old/images/common/icon-pagination-first.png`} alt="first" />,
        isActive: false,
        onClickPage: handleClickPageItem(1),
      },
      {
        label: <img src={`${RESOURCE_URL}/pc/etc/old/images/common/icon-pagination-prev.png`} alt="prev" />,
        isActive: false,
        onClickPage: handleClickPageItem(prevPage),
      },
      ...pageRange.map((i) => {
        return {
          label: i,
          isActive: i === currentPage,
          onClickPage: handleClickPageItem(i),
        };
      }),
      {
        label: <img src={`${RESOURCE_URL}/pc/etc/old/images/common/icon-pagination-next.png`} alt="next" />,
        isActive: false,
        onClickPage: handleClickPageItem(nextPage),
      },
      {
        label: <img src={`${RESOURCE_URL}/pc/etc/old/images/common/icon-pagination-last.png`} alt="last" />,
        isActive: false,
        onClickPage: handleClickPageItem(maxPage),
      },
    ],
    [prevPage, nextPage, currentPage, pageRange],
  );

  if (isError) {
    return null;
  }

  return (
    <Pagination>
      {isSuccess ? (
        paginationList.map((item, index) => (
          <PaginationItem key={`pagination-item-${currentPage}-${index}`} {...item} />
        ))
      ) : (
        <PaginationPending />
      )}
    </Pagination>
  );
};

export default PaginationContainer;
