import styled from '@emotion/styled';

import Repeat from '../../../../shared/components/Repeat';
import { productCardImageWrapper, productCardImage } from '../../../../shared/styles/product-card-image-style';
import COLOR from '../../../../shared/constant/colorset';

const List = styled.div`
  padding: 0 16px 40px;
`;

const Item = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('80%')};
  padding-top: clamp(255px, 80%, 588px);
`;

const Thumbnail = styled(SkeletonItem)`
  ${productCardImage};
`;

const BannerCarouselHorizontalListSkeleton = () => (
  <List>
    <Repeat count={3}>
      <Item>
        <ThumbnailWrapper>
          <Thumbnail />
        </ThumbnailWrapper>
      </Item>
    </Repeat>
  </List>
);

export default BannerCarouselHorizontalListSkeleton;
