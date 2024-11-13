import styled from '@emotion/styled';

import Repeat from '../../../../shared/components/Repeat';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import { productListSlidePerView } from '../constant';

const Container = styled.div`
  padding: 27px 0 34px;
`;

const Header = styled.div`
  div {
    margin: 0 auto;
  }
`;

const Description = styled.div`
  padding-top: 10px;
`;

const List = styled.div`
  display: flex;
  gap: 18px;
  padding-top: 34px;
`;

const MainBannerCarouselSkeleton = () => (
  <Container>
    <Header>
      <SkeletonLoading width={316} height={48} />
      <Description>
        <SkeletonLoading width={516} height={23} />
      </Description>
    </Header>
    <List>
      <Repeat count={productListSlidePerView}>
        <SkeletonLoading width={249} height={410} />
      </Repeat>
    </List>
  </Container>
);

export default MainBannerCarouselSkeleton;
