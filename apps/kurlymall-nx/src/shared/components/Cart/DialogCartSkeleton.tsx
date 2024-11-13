import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import SkeletonLoading from '../../../shared/components/Loading/SkeletonLoading';

const Title = styled.div`
  padding: 10px 0;
`;

const Inner = styled.div`
  display: flex;
`;

const Product = styled.div`
  margin-left: 20px;
  padding-bottom: 20px;
  flex-grow: 1;
  > div:first-of-type {
    width: 100%;
    margin-bottom: 38px;
  }
  border-bottom: 1px solid ${COLOR.bg};
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 15px;
  > div {
    width: 50%;
    margin: 0 4px;
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export default function DialogCartSkeleton() {
  return (
    <>
      <Title>
        <SkeletonLoading height={20} />
      </Title>
      <Title>
        <SkeletonLoading height={20} />
      </Title>
      <Inner>
        <SkeletonLoading width={60} height={78} radius={0} />
        <Product>
          <SkeletonLoading height={20} />
          <SkeletonLoading width={101} height={20} />
        </Product>
      </Inner>
      <Buttons>
        <SkeletonLoading height={56} radius={6} />
        <SkeletonLoading height={56} radius={6} />
      </Buttons>
    </>
  );
}
