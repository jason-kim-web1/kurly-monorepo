import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1050px;
  padding: 40px 0;
`;

const Title = styled.div`
  width: 249px;
`;

const Product = styled.div`
  width: 694px;
`;

const Subject = styled.div`
  padding: 10px 0 24px;
`;

const Description = styled.div`
  padding-bottom: 32px;
`;

const Text = styled.div`
  padding-bottom: 6px;
`;

const Thumb = styled.div`
  padding-bottom: 14px;
`;

const SpecialDealsSkeleton = () => (
  <Container>
    <Title>
      <SkeletonLoading width={249} height={30} />
      <Subject>
        <SkeletonLoading width={200} height={20} />
      </Subject>
      <Description>
        <SkeletonLoading width={230} height={47} />
      </Description>
      <Text>
        <SkeletonLoading width={240} height={14} />
      </Text>
      <Text>
        <SkeletonLoading width={240} height={14} />
      </Text>
      <Text>
        <SkeletonLoading width={240} height={14} />
      </Text>
    </Title>
    <Product>
      <Thumb>
        <SkeletonLoading width={694} height={347} />
      </Thumb>
      <Text>
        <SkeletonLoading width={240} height={14} />
      </Text>
      <Text>
        <SkeletonLoading width={400} height={16} />
      </Text>
      <SkeletonLoading width={200} height={30} />
    </Product>
  </Container>
);

export default SpecialDealsSkeleton;
