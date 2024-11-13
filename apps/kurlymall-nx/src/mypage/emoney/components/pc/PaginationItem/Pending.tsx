import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';

const Container = styled.li`
  margin-right: 1px;
  &:last-child {
    margin-right: 0;
  }
`;

const PaginationPendingItem = () => (
  <Container>
    <Skeleton width={34} height={34} />
  </Container>
);

export default PaginationPendingItem;
