import styled from '@emotion/styled';

import { MouseEvent } from 'react';

import ArrowMore from '../../icons/ArrowMore';
import { iconArrowDown } from '../../../../shared/images';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FoldButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: #999999;
  span {
    margin-right: 0.2rem;
  }
`;

interface Props {
  folded: boolean;
  onClickMore(): void;
}

export default function MoreOrFoldButton({ folded, onClickMore }: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClickMore();
  };

  return (
    <Container>
      <FoldButton type="button" onClick={handleClick}>
        <span>{folded ? '더보기' : '접기'}</span>
        <ArrowMore direction={folded ? 'down' : 'up'} icon={iconArrowDown} />
      </FoldButton>
    </Container>
  );
}
