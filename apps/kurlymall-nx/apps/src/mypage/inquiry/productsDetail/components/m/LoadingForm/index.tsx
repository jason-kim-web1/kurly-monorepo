import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div`
  padding: 36px 20px 20px;
  min-height: 100vh;
  background-color: ${COLOR.kurlyWhite};
  > .row {
    margin-bottom: 16px;
    &.half-width {
      width: 50%;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const LoadingForm = () => (
  <Container>
    <div className="row">
      <Skeleton height={48} />
    </div>
    <div className="row">
      <Skeleton height={135} />
    </div>
    <div className="row half-width">
      <Skeleton height={24} />
    </div>
    <div className="row">
      <Skeleton height={50} />
    </div>
  </Container>
);

export default LoadingForm;
