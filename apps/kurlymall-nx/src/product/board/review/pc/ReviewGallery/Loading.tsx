import styled from '@emotion/styled';

import Repeat from '../../../../../shared/components/Repeat';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

export const SkeletonWrapper = styled.div`
  overflow: hidden;

  :first-of-type {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  :last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const Loading = ({ count }: { count: number }) => (
  <Repeat count={count}>
    <SkeletonWrapper>
      <SkeletonLoading width={124} height={124} radius={0} />
    </SkeletonWrapper>
  </Repeat>
);

export default Loading;
