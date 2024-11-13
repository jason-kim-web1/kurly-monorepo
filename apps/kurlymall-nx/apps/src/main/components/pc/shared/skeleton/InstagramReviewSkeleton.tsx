import styled from '@emotion/styled';

import Repeat from '../../../../../shared/components/Repeat';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Product = styled.div`
  display: flex;
  gap: 3px;
`;

const Gap = styled.div<{ Height: number }>`
  height: ${({ Height }) => Height}px;
`;

const InstagramReviewSkeleton = () => (
  <div>
    <Gap Height={8} />
    <SkeletonLoading width={249} height={32} alignCenter={true} />
    <Gap Height={10} />
    <SkeletonLoading width={209} height={23} alignCenter={true} />
    <Gap Height={27} />
    <Product>
      <Repeat count={6}>
        <SkeletonLoading width={175} height={175} />
      </Repeat>
    </Product>
    <Gap Height={47} />
    <SkeletonLoading width={198} height={21} alignCenter={true} />
    <Gap Height={10} />
    <SkeletonLoading width={160} height={21} alignCenter={true} />
    <Gap Height={2} />
  </div>
);

export default InstagramReviewSkeleton;
