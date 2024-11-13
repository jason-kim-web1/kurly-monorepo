import { CSSProperties, Ref, forwardRef } from 'react';
import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${COLOR.kurlyWhite};
  border-bottom: 2px solid ${COLOR.bg};
  &:last-child {
    border-bottom: 0;
  }
`;

const ListItemLoading = ({ style }: { style?: CSSProperties }, ref: Ref<HTMLLIElement>) => (
  <Container style={style} ref={ref}>
    <div>
      <Skeleton width={60} height={21} style={{ marginBottom: '4px' }} />
      <Skeleton width={200} height={21} style={{ marginBottom: '6px' }} />
      <Skeleton width={100} height={21} />
    </div>
    <div>
      <Skeleton width={60} height={60} />
    </div>
  </Container>
);

export default forwardRef(ListItemLoading);
