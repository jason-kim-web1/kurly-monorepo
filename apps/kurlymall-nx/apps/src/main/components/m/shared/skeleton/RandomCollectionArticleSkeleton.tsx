import styled from '@emotion/styled';

import SectionHeaderSkeleton from './SectionHeaderSkeleton';

import Repeat from '../../../../../shared/components/Repeat';
import COLOR from '../../../../../shared/constant/colorset';
import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';

const Container = styled.div``;

const Product = styled.div`
  padding: 0 16px 0;
`;

const List = styled.div`
  padding: 16px 16px 0;
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 12px;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('50.5%')};
`;

const Thumbnail = styled(SkeletonItem)`
  ${productCardImage};
`;

const ItemThumbWrapper = styled(SkeletonItem)`
  flex: 0 0 13vw;
  min-width: 50px;
  margin-right: 11px;
  border-radius: 4px;
  ${productCardImageWrapper('14.579%')};
`;

const ItemThumb = styled(SkeletonItem)`
  ${productCardImage};
`;

const ItemInfo = styled.div`
  width: 100%;
  padding-top: 5px;
`;

const TextLine = styled(SkeletonItem)<{ widthPercent: number; sizeHeight: number }>`
  width: ${({ widthPercent }) => widthPercent}%;
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const ButtonLine = styled(SkeletonItem)`
  flex: 0 0 69px;
  height: 36px;
  margin: 14px 0 0 auto;
  border-radius: 4px;
`;

const Space = styled.div<{ sizeHeight: number }>`
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const SpecialDealsSkeleton = () => (
  <Container>
    <SectionHeaderSkeleton isSubTitle={false} isMore={false} />
    <Product>
      <ThumbnailWrapper>
        <Thumbnail />
      </ThumbnailWrapper>
      <Space sizeHeight={12} />
      <TextLine widthPercent={40} sizeHeight={18} />
    </Product>
    <List>
      <Repeat count={3}>
        <Item>
          <ItemThumbWrapper>
            <ItemThumb />
          </ItemThumbWrapper>
          <ItemInfo>
            <TextLine widthPercent={50} sizeHeight={19} />
            <Space sizeHeight={3} />
            <TextLine widthPercent={40} sizeHeight={14} />
          </ItemInfo>
          <ButtonLine />
        </Item>
      </Repeat>
      <Space sizeHeight={16} />
      <TextLine widthPercent={100} sizeHeight={48} />
    </List>
  </Container>
);

export default SpecialDealsSkeleton;
