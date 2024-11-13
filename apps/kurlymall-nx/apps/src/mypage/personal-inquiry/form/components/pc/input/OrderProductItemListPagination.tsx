import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { modifySearchInfo, OrderProductSearchInfoState } from '../../../slice';
import Pagination from '../../../../../../shared/components/Pagination/Pagination';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  button {
    height: 32px;
    width: 32px;
  }
`;

interface Props {
  searchInfo: OrderProductSearchInfoState;
}

export default function OrderProductItemListPagination({ searchInfo }: Props) {
  const { pageNo, totalPages } = searchInfo;

  const dispatch = useDispatch();

  const canGoPrev = pageNo !== 0;

  const handleClickPrev = () => {
    dispatch(modifySearchInfo({ pageNo: pageNo - 1 }));
  };

  const canGoNext = pageNo + 1 < totalPages;

  const handleClickNext = () => {
    dispatch(modifySearchInfo({ pageNo: pageNo + 1 }));
  };

  return (
    <Container>
      <Pagination
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrev}
        previousEnable={canGoPrev}
        nextEnable={canGoNext}
      />
    </Container>
  );
}
