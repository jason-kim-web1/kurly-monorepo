import styled from '@emotion/styled';

import Repeat from '../../../../../shared/components/Repeat';

import SectionHeaderSkeleton from './SectionHeaderSkeleton';
import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div``;

const List = styled.div`
  display: flex;
`;

const Item = styled.div`
  flex-shrink: 0;
  scroll-snap-align: start;
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
  ${productCardImageWrapper('176%')};
`;

const Thumbnail = styled(SkeletonItem)`
  ${productCardImage};
`;

const MainBannerCarouselSkeleton = () => (
  <Container>
    <SectionHeaderSkeleton isMore={false} />
    <List>
      <Repeat count={3}>
        <Item>
          <ThumbnailWrapper>
            <Thumbnail />
          </ThumbnailWrapper>
        </Item>
      </Repeat>
    </List>
  </Container>
);

export default MainBannerCarouselSkeleton;
