import styled from '@emotion/styled';

import SectionHeaderSkeleton from './SectionHeaderSkeleton';
import Repeat from '../../../../../shared/components/Repeat';
import COLOR from '../../../../../shared/constant/colorset';
import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';

const Container = styled.div();

const List = styled.div`
  display: flex;
  position: relative;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex-shrink: 0;
  width: 19vw;
  min-width: 75px;
  min-height: 120px;
  margin-left: 12px;
  :first-of-type {
    margin-left: 16px;
  }
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('100%')};
  border-radius: 100%;
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

const CollectionListCircleSkeleton = () => (
  <Container>
    <SectionHeaderSkeleton isSubTitle={false} />
    <List>
      <Repeat count={5}>
        <Item>
          <ThumbnailWrapper>
            <Thumbnail />
          </ThumbnailWrapper>
          <Space sizeHeight={8} />
          <TextLine widthPercent={100} sizeHeight={19} />
        </Item>
      </Repeat>
    </List>
  </Container>
);

export default CollectionListCircleSkeleton;
