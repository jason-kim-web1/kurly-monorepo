import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { paginationFirst, paginationPrev, paginationNext, paginationLast } from '../../../../shared/images';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
`;

const PaginationItem = styled.a<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${COLOR.lightGray};
  border-left: none;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.bgLightGray};
  }

  &:first-of-type {
    border-left: 1px solid ${COLOR.lightGray};
  }

  ${(props) => (props.isActive ? `background-color: ${COLOR.bgLightGray};color: ${COLOR.kurlyPurple};` : '')}
`;

interface Props {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChangePage }: Props) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const pageSize = 10;

  const setPage = (page: number) => {
    if (currentPage === totalPages && page === totalPages) {
      return;
    }

    if (currentPage === 1 && page === 1) {
      return;
    }

    if (page < 1 || page > totalPages) {
      return;
    }

    onChangePage(page);
  };

  const getPageNumbers = useCallback(
    (page: number): number[] => {
      let startPage = 0;
      let endPage = 0;
      if (totalPages <= pageSize) {
        startPage = 1;
        endPage = totalPages;
      } else {
        const pageSection = Math.floor((page - 1) / pageSize);
        startPage = pageSection * pageSize + 1;
        endPage = Math.min((pageSection + 1) * pageSize, totalPages);
      }

      return Array(endPage + 1 - startPage)
        .fill({})
        .map((v, i) => i + 1);
    },
    [totalPages],
  );

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      return;
    }

    setPageNumbers(getPageNumbers(currentPage));
  }, [currentPage, getPageNumbers, totalPages]);

  if (pageNumbers.length <= 1 || pageNumbers[-1] === 1) {
    return null;
  }

  return (
    <Container>
      <PaginationItem href="#container" isActive={false} onClick={() => setPage(1)}>
        <img src={paginationFirst} alt="처음 페이지로 이동하기 아이콘" />
      </PaginationItem>
      <PaginationItem href="#container" isActive={false} onClick={() => setPage(currentPage - 1)}>
        <img src={paginationPrev} alt="이전 페이지로 이동하기 아이콘" />
      </PaginationItem>

      {pageNumbers.map((page) => (
        <PaginationItem key={page} href="#container" isActive={page === currentPage} onClick={() => setPage(page)}>
          {page}
        </PaginationItem>
      ))}

      <PaginationItem href="#container" isActive={false} onClick={() => setPage(currentPage + 1)}>
        <img src={paginationNext} alt="다음 페이지로 이동하기 아이콘" />
      </PaginationItem>
      <PaginationItem href="#container" isActive={false} onClick={() => setPage(totalPages)}>
        <img src={paginationLast} alt="마지막 페이지로 이동하기 아이콘" />
      </PaginationItem>
    </Container>
  );
}
