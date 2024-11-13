import styled from '@emotion/styled';

import Repeat from '../../../../shared/components/Repeat';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1050px;
  margin: 0 auto;
`;

const Item = styled.div`
  flex: 0 0 516px;
  margin-top: 30px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 54px 0 80px;
`;

const MainBannerCarouselHorizontalSkeletonPC = () => (
  <Container>
    <Repeat count={12}>
      <Item>
        <SkeletonLoading width={516} height={376} />
      </Item>
    </Repeat>
    <Pagination>
      <SkeletonLoading width={364} height={34} />
    </Pagination>
  </Container>
);

export default MainBannerCarouselHorizontalSkeletonPC;
