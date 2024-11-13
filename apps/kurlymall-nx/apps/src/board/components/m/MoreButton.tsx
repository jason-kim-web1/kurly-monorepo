import { memo, useContext } from 'react';

import styled from '@emotion/styled';

import Button from '../../../shared/components/Button/Button';
import { PagingContext } from '../../context/PagingContext';

const MoreButtonWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
`;

function BoardMoreButton({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) {
  const { isFullyLoaded } = useContext(PagingContext);

  return (
    <MoreButtonWrapper>
      <Button text={'더 보기'} radius={5} onClick={onClick} disabled={isLoading || isFullyLoaded} />
    </MoreButtonWrapper>
  );
}

export default memo(BoardMoreButton);
