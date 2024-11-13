import styled from '@emotion/styled';

import SkeletonLoading from '../../../shared/components/Loading/SkeletonLoading';

const GradeName = styled.div`
  margin-bottom: 8px;
`;

export default function GradeBenefitLoading() {
  return (
    <>
      <GradeName>
        <SkeletonLoading width={200} height={24} />
      </GradeName>
      <SkeletonLoading height={18} />
    </>
  );
}
