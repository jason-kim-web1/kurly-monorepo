import styled from '@emotion/styled';

import Repeat from '../../../../shared/components/Repeat';
import SectionHeaderSkeleton from '../shared/skeleton/SectionHeaderSkeleton';
import { productCardImageWrapper, productCardImage } from '../../../../shared/styles/product-card-image-style';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div``;

const List = styled.div`
  display: flex;
  padding: 0 16px;
`;

const Item = styled.div`
  flex-shrink: 0;
  scroll-snap-align: start;
  width: 82%;
  margin-right: 8px;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('80%')};
`;

const Thumbnail = styled(SkeletonItem)`
  ${productCardImage};
`;

const MainBannerCarouselHorizontalSkeleton = () => (
  <Container>
    <SectionHeaderSkeleton />
    <List>
      <Repeat count={2}>
        <Item>
          <ThumbnailWrapper>
            <Thumbnail />
          </ThumbnailWrapper>
        </Item>
      </Repeat>
    </List>
  </Container>
);

export default MainBannerCarouselHorizontalSkeleton;
