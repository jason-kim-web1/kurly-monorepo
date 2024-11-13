import React from 'react';

import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Container = styled.div`
  margin-right: 18px;
`;

const Description = styled.div`
  padding: 14px 0;
`;

const Gap = styled.div<{ Height: number }>`
  height: ${({ Height }) => Height}px;
`;

const ProductCardSkeleton = () => {
  return (
    <Container>
      <SkeletonLoading width={249} height={320} />
      <Description>
        <SkeletonLoading width={150} height={23} />
        <Gap Height={8} />
        <SkeletonLoading width={120} height={23} />
        <Gap Height={8} />
        <SkeletonLoading width={100} height={23} />
      </Description>
    </Container>
  );
};

export default ProductCardSkeleton;
