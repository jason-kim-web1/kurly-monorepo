import styled from '@emotion/styled';

import SectionHeaderSkeleton from './SectionHeaderSkeleton';

import COLOR from '../../../../../shared/constant/colorset';
import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';

const Container = styled.div``;

const Product = styled.div`
  margin-top: -8px;
  padding: 0 16px;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('50.57%')};
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

const SpecialDealsSkeleton = () => (
  <Container>
    <SectionHeaderSkeleton isMore={false} />
    <Product>
      <TextLine widthPercent={45} sizeHeight={34} />
      <Space sizeHeight={10} />
      <ThumbnailWrapper>
        <Thumbnail />
      </ThumbnailWrapper>
      <Space sizeHeight={11} />
      <TextLine widthPercent={30} sizeHeight={18} />
      <Space sizeHeight={4} />
      <TextLine widthPercent={40} sizeHeight={21} />
    </Product>
  </Container>
);

export default SpecialDealsSkeleton;
