import styled from '@emotion/styled';

import { memo } from 'react';

import COLOR from '../../constant/colorset';
import ScreenOut from '../Pagination/ScreenOut';
import { usePagination } from '../../hooks/usePagination';

const Wrapper = styled.div``;

const PageButton = styled.button`
  display: inline-block;
  width: 34px;
  height: 34px;
  border: 1px solid ${COLOR.lightGray};
  vertical-align: top;
  font-weight: 500;
  font-size: 12px;
  color: ${COLOR.kurlyGray800};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  :nth-of-type(n + 2) {
    border-left: none;
  }
  :hover,
  &.active {
    background-color: ${COLOR.bgLightGray};
    color: ${COLOR.kurlyPurple};
  }
`;

const FirstPageButton = styled(PageButton)`
  background-image: url(https://res.kurly.com/pc/etc/old/images/common/icon-pagination-first.png);
`;

const PrevPageButton = styled(PageButton)`
  background-image: url(https://res.kurly.com/pc/etc/old/images/common/icon-pagination-prev.png);
`;

const NextPageButton = styled(PageButton)`
  background-image: url(https://res.kurly.com/pc/etc/old/images/common/icon-pagination-next.png);
`;

const LastPageButton = styled(PageButton)`
  background-image: url(https://res.kurly.com/pc/etc/old/images/common/icon-pagination-last.png);
`;

interface Props {
  page: number;
  lastPage: number;
  viewSize?: number;
  onChangePage(page: number): void;
}

function PaginationNumber({ page, lastPage, viewSize = 10, onChangePage }: Props) {
  const { pagination } = usePagination({ page, lastPage, viewSize });

  return (
    <Wrapper>
      <FirstPageButton onClick={() => onChangePage(1)}>
        <ScreenOut>처음</ScreenOut>
      </FirstPageButton>
      <PrevPageButton onClick={() => onChangePage(page - 1)}>
        <ScreenOut>이전</ScreenOut>
      </PrevPageButton>
      {pagination.map((pageValue) => (
        <PageButton
          key={pageValue}
          className={page === pageValue ? 'active' : ''}
          onClick={() => onChangePage(pageValue)}
        >
          {pageValue}
        </PageButton>
      ))}
      <NextPageButton onClick={() => onChangePage(page + 1)}>
        <ScreenOut>다음</ScreenOut>
      </NextPageButton>
      <LastPageButton onClick={() => onChangePage(lastPage)}>
        <ScreenOut>마지막</ScreenOut>
      </LastPageButton>
    </Wrapper>
  );
}

export default memo(PaginationNumber);
