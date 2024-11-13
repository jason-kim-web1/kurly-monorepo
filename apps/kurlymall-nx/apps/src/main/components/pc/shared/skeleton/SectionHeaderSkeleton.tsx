import React from 'react';

import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 34px;
`;

export default function SectionHeaderSkeleton() {
  return (
    <Title>
      <SkeletonLoading width={180} height={32} />
    </Title>
  );
}
