import styled from '@emotion/styled';

import ScreenOut from '../../../../../shared/components/Pagination/ScreenOut';

const Pagination = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  padding-top: 20px;
`;

const Button = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const PreviousButton = styled(Button)`
  background-image: url('https://res.kurly.com/kurly/ico/2021/paging-prev-activated.svg');

  &:hover {
    background-image: url('https://res.kurly.com/kurly/ico/2021/paging-prev-hover.svg');
  }

  &:disabled {
    background-image: url('https://res.kurly.com/kurly/ico/2021/paging-prev-disabled.svg');
    cursor: default;
  }
`;

export const NextButton = styled(Button)`
  background-image: url('https://res.kurly.com/kurly/ico/2021/paging-next-activated.svg');

  &:hover {
    background-image: url('https://res.kurly.com/kurly/ico/2021/paging-next-hover.svg');
  }

  &:disabled {
    background-image: url('https://res.kurly.com/kurly/ico/2021/paging-next-disabled.svg');
    cursor: default;
  }
`;

interface Props {
  disabledPrevious: boolean;
  disabledNext: boolean;
  onClickPrevious(): void;
  onClickNext(): void;
}

export default function ReviewListPagination({ disabledPrevious, disabledNext, onClickPrevious, onClickNext }: Props) {
  return (
    <Pagination>
      <PreviousButton disabled={disabledPrevious} onClick={onClickPrevious}>
        <ScreenOut>이전</ScreenOut>
      </PreviousButton>
      <NextButton disabled={disabledNext} onClick={onClickNext}>
        <ScreenOut>
          <ScreenOut>다음</ScreenOut>
        </ScreenOut>
      </NextButton>
    </Pagination>
  );
}
