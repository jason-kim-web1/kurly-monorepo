import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import Repeat from '../../../../../shared/components/Repeat';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Item = styled.div`
  margin: 30px 36px 0 0;
  :first-of-type {
    margin-left: 50px;
  }
`;

const Description = styled.div`
  padding: 14px 0;
`;

const CollectionListCircleSkeleton = () => (
  <Container>
    <Repeat count={7}>
      <Item>
        <SkeletonLoading width={129} height={129} radius={129} />
        <Description>
          <SkeletonLoading width={129} height={23} />
        </Description>
      </Item>
    </Repeat>
  </Container>
);

export default CollectionListCircleSkeleton;
