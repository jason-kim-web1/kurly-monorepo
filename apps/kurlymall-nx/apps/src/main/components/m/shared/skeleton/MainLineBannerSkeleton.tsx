import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { productCardImageWrapper, productCardImage } from '../../../../../shared/styles/product-card-image-style';

const Container = styled.div``;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  ${productCardImageWrapper('21.2%')};
`;

const Thumbnail = styled(SkeletonItem)`
  ${productCardImage};
`;

const MainLineBannerSkeleton = () => (
  <Container>
    <ThumbnailWrapper>
      <Thumbnail />
    </ThumbnailWrapper>
  </Container>
);

export default MainLineBannerSkeleton;
