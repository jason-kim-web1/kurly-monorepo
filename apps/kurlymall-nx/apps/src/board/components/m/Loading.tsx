import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

import { CSSProperties } from 'react';

import Repeat from '../../../shared/components/Repeat';
import COLOR from '../../../shared/constant/colorset';

const Container = styled.div`
  background-color: ${COLOR.kurlyWhite};
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${COLOR.bg};
  &:last-of-type {
    border-bottom: 0;
  }
`;

interface Props {
  numberOfRows: number;
  style?: CSSProperties;
}

export default function Loading({ numberOfRows, style }: Props) {
  return (
    <Repeat count={numberOfRows}>
      <Container style={style}>
        <div>
          <Skeleton width={80} height={16} style={{ marginBottom: '10px' }} />
          <Skeleton width={180} height={16} />
        </div>
        <div>
          <Skeleton width={80} height={16} />
        </div>
      </Container>
    </Repeat>
  );
}
