import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Wrapper = styled.div`
  padding: 20px;

  > div {
    margin-top: 7px;
  }
`;

const Title = styled.h3`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export default function LoadingDeliveryRequest() {
  return (
    <Wrapper>
      <Title>배송 요청사항</Title>
      <SkeletonLoading width={295} height={20} />
      <SkeletonLoading width={295} height={20} />
    </Wrapper>
  );
}
