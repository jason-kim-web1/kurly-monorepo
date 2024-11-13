import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 16px 0;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ListSkeletonItem = () => (
  <Container>
    <Skeleton width={115} height={20} />
    <Skeleton width={433} height={20} />
    <Skeleton width={117} height={20} />
    <Skeleton width={135} height={20} />
  </Container>
);

export default ListSkeletonItem;
