import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import Repeat from '../../../../../shared/components/Repeat';

const Container = styled.div`
  padding: 12px 0 20px;
`;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Product = styled.li`
  display: flex;
  flex: 0 0 507px;
  padding-top: 24px;
  &:nth-of-type(2n) {
    margin-left: auto;
  }
`;

const Title = styled.div`
  flex: 0 0 311px;
  padding: 9px 0 0 20px;
`;

const Price = styled.div`
  margin-top: 7px;
`;

const Cart = styled.div`
  margin-top: 18px;
  margin-left: auto;
`;

const More = styled.div`
  width: 516px;
  margin: 52px auto 0;
`;

const CollectionListArticleSkeleton = () => (
  <Container>
    <ProductList>
      <Repeat count={4}>
        <Product>
          <SkeletonLoading width={72} height={72} />
          <Title>
            <SkeletonLoading width={209} height={23} />
            <Price>
              <SkeletonLoading width={110} height={24} />
            </Price>
          </Title>
          <Cart>
            <SkeletonLoading width={104} height={36} />
          </Cart>
        </Product>
      </Repeat>
    </ProductList>
    <More>
      <SkeletonLoading width={516} height={56} />
    </More>
  </Container>
);

export default CollectionListArticleSkeleton;
