import React from 'react';

import styled from '@emotion/styled';

import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  flex-shrink: 0;
  width: calc(40vw + 16px);
  padding-left: 16px;
  margin-left: -8px;
  &:first-of-type {
    margin-left: 0;
  }
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('130%')};
`;

const Thumbnail = styled(SkeletonItem)`
  ${productCardImage};
`;

const TextLine = styled(SkeletonItem)<{ widthPercent: number; sizeHeight: number }>`
  width: ${({ widthPercent }) => widthPercent}%;
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const Space = styled.div<{ sizeHeight: number }>`
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const ProductCardSkeleton = () => {
  return (
    <Container>
      <ThumbnailWrapper>
        <Thumbnail />
      </ThumbnailWrapper>
      <Space sizeHeight={8} />
      <TextLine widthPercent={80} sizeHeight={19} />
      <Space sizeHeight={5} />
      <TextLine widthPercent={60} sizeHeight={16} />
      <Space sizeHeight={8} />
      <TextLine widthPercent={40} sizeHeight={14} />
    </Container>
  );
};

export default ProductCardSkeleton;
