import styled from '@emotion/styled';

import Repeat from '../../../../shared/components/Repeat';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';

const Container = styled.div`
  padding: 47px 0 39px;
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
  padding-top: 27px;
`;

const MainBannerCarouselHorizontalSkeleton = () => (
  <Container>
    <Header>
      <SkeletonLoading width={316} height={32} />
      <Description>
        <SkeletonLoading width={516} height={23} />
      </Description>
    </Header>
    <List>
      <Repeat count={2}>
        <SkeletonLoading width={516} height={376} />
      </Repeat>
    </List>
  </Container>
);

export default MainBannerCarouselHorizontalSkeleton;
