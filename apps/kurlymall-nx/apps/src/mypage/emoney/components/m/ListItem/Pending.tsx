import type { CSSProperties } from 'react';
import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  background-color: ${COLOR.kurlyWhite};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 19px 10px 16px;
  border-bottom: 2px solid ${COLOR.bg};
  &:last-child {
    border-bottom: 0;
  }
`;

const ListItemPending = ({ style }: { style?: CSSProperties }) => (
  <Container style={style}>
    <div>
      <Skeleton width={180} height={21} style={{ marginBottom: '12px' }} />
      <Skeleton width={80} height={21} />
    </div>
    <div>
      <Skeleton width={80} height={20} />
    </div>
  </Container>
);

export default ListItemPending;
