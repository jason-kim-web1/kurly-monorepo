import { memo, useCallback, useContext, useEffect } from 'react';

import styled from '@emotion/styled';

import { PagingContext } from '../../context/PagingContext';
import Pagination from '../../../shared/components/Pagination/Pagination';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0 30px;
`;

function BoardPaging({ isLoading }: { isLoading: boolean }) {
  const {
    currentPage,
    isFullyLoaded,
    actions: { setCurrentPage },
  } = useContext(PagingContext);

  const handlePreviousClick = useCallback(() => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
  }, [currentPage, setCurrentPage]);

  const handleNextClick = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    // 페이지 변경시 맨위로 이동
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <PaginationWrapper>
      <Pagination
        previousEnable={!isLoading && currentPage > 0}
        nextEnable={!isLoading && !isFullyLoaded}
        onClickPrevious={handlePreviousClick}
        onClickNext={handleNextClick}
      />
    </PaginationWrapper>
  );
}

export default memo(BoardPaging);
