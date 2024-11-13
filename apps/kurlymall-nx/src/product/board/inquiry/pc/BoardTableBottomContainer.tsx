import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import Pagination from '../../../../shared/components/Pagination/Pagination';
import { setProductInquiryCurrentPage } from '../../../detail/slice';
import { ProductInquiryPostPagination } from '../types';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface Props {
  pagination: ProductInquiryPostPagination;
}

export default function BoardTableBottomContainer({ pagination }: Props) {
  const { currentPage, totalPages } = pagination;

  const dispatch = useDispatch();

  const handleClickPrev = () => {
    dispatch(setProductInquiryCurrentPage(currentPage - 1));
  };

  const handleClickNext = () => {
    dispatch(setProductInquiryCurrentPage(currentPage + 1));
  };

  return (
    <Container>
      <Pagination
        previousEnable={currentPage > 1}
        nextEnable={currentPage < totalPages}
        onClickPrevious={handleClickPrev}
        onClickNext={handleClickNext}
      />
    </Container>
  );
}
