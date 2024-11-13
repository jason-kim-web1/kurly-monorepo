import styled from '@emotion/styled';

import ShippingTitle from '../ShippingTitle';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  padding: 0px 20px 17px;
  > div {
    margin-top: 7px;
  }
`;

const Line = styled.p`
  margin: 0 20px;
  height: 1px;
  background: ${COLOR.bg};
`;

const Contents = styled.div`
  padding: 22px 20px;
`;

export default function LoadingShipping() {
  return (
    <>
      <ShippingTitle />
      <Wrapper>
        <SkeletonLoading width={295} height={20} />
        <SkeletonLoading width={295} height={20} />
      </Wrapper>
      <Line />
      <Contents>
        <SkeletonLoading width={155} height={20} />
      </Contents>
    </>
  );
}
