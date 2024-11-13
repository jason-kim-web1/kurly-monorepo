import styled from '@emotion/styled';

import SectionHeaderSkeleton from './SectionHeaderSkeleton';

import COLOR from '../../../../../shared/constant/colorset';
import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';
import Repeat from '../../../../../shared/components/Repeat';

const List = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  scroll-snap-align: start;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex-shrink: 0;
  width: calc(64vw + 16px);
  margin-left: -8px;
  padding-left: 16px;
  :first-of-type {
    margin-left: 0;
  }
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('71%')};
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

const MainRecipesSkeleton = () => (
  <div>
    <SectionHeaderSkeleton isSubTitle={false} />
    <List>
      <Repeat count={3}>
        <Item>
          <ThumbnailWrapper>
            <Thumbnail />
          </ThumbnailWrapper>
          <Space sizeHeight={8} />
          <TextLine widthPercent={30} sizeHeight={19} />
        </Item>
      </Repeat>
    </List>
  </div>
);

export default MainRecipesSkeleton;
