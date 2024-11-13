import styled from '@emotion/styled';

import PreviousButton from './PreviousButton';
import NextButton from './NextButton';

const Wrapper = styled.div`
  button + button {
    margin-left: 12px;
  }
`;

interface Props {
  previousEnable?: boolean;
  nextEnable?: boolean;
  onClickPrevious(): void;
  onClickNext(): void;
}

export default function Pagination({ previousEnable = true, nextEnable = true, onClickPrevious, onClickNext }: Props) {
  return (
    <Wrapper>
      <PreviousButton disabled={!previousEnable} onClick={onClickPrevious} />
      <NextButton disabled={!nextEnable} onClick={onClickNext} />
    </Wrapper>
  );
}
