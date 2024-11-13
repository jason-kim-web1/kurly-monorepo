import { ReactNode } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const PageButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 700;
  font-size: 12px;
  color: ${COLOR.kurlyGray800};
  line-height: 34px;
`;

const Container = styled.li`
  box-sizing: border-box;
  width: 34px;
  height: 34px;
  border: 1px solid ${COLOR.lightGray};
  border-left: 0;
  background-color: ${COLOR.kurlyWhite};
  &:first-of-type {
    border-left: 1px solid ${COLOR.lightGray};
  }
  &:hover {
    background-color: ${COLOR.bgLightGray};
    ${PageButton} {
      color: ${COLOR.kurlyPurple};
    }
  }
  &.active {
    background-color: ${COLOR.bgLightGray};
    ${PageButton} {
      color: ${COLOR.kurlyPurple};
    }
  }
`;

interface Props {
  label: ReactNode | string;
  isActive: boolean;
  onClickPage(): void;
}

const PaginationItem = ({ label, isActive, onClickPage }: Props) => (
  <Container className={`${isActive ? 'active' : ''}`}>
    <PageButton onClick={onClickPage}>{label}</PageButton>
  </Container>
);

export default PaginationItem;
