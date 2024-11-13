import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Container = styled.div`
  display: flex;
  padding-top: 40px;
`;

const Title = styled.div`
  padding-left: 36px;
`;

const Subject = styled.div`
  margin-top: 5px;
`;

const Description = styled.div`
  padding-top: 18px;
`;

const Text = styled.div`
  margin-top: 4px;
`;

const CollectionArticleHeaderSkeleton = () => (
  <Container>
    <SkeletonLoading width={615} height={308} />
    <Title>
      <Subject>
        <SkeletonLoading width={250} height={36} />
      </Subject>
      <Subject>
        <SkeletonLoading width={350} height={36} />
      </Subject>
      <Description>
        {Array.from({ length: 7 }).map((_, i) => (
          <Text key={`item-${i}`}>
            <SkeletonLoading width={350} height={22} />
          </Text>
        ))}
      </Description>
    </Title>
  </Container>
);

export default CollectionArticleHeaderSkeleton;
