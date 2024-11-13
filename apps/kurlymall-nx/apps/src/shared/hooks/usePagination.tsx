import { useEffect, useState } from 'react';

interface Props {
  page: number;
  lastPage: number;
  viewSize: number;
}

export function usePagination({ page, lastPage, viewSize }: Props) {
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);
  const [pagination, setPagination] = useState<number[]>([]);

  useEffect(() => {
    const pageGroup = Math.ceil(page / viewSize);
    const groupLastPage = pageGroup * viewSize;
    const showFirstPage = groupLastPage - (viewSize - 1);

    const showLastPage = groupLastPage > lastPage ? lastPage : groupLastPage;

    const calcPagination = Array.from({ length: showLastPage - (showFirstPage - 1) }, (_, index) => {
      return showFirstPage + index;
    });

    setLast(showLastPage);
    setFirst(showFirstPage);
    setPagination(calcPagination);
  }, [lastPage, page, viewSize]);

  return {
    first,
    last,
    pagination,
  };
}
