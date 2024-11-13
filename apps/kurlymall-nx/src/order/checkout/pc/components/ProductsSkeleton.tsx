import styled from '@emotion/styled';

import { Title } from './Title';
import { PcOrderDropButton } from '../../../../shared/components/icons/PcOrderDropButton';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';

const LoadingWrapper = styled.div`
  padding: 20px 0px;
`;

export const ProductsSkeleton = () => {
  return (
    <>
      <Title title="주문 상품" noMargin>
        <PcOrderDropButton isOpen={false} />
      </Title>
      <LoadingWrapper>
        <SkeletonLoading testId="loading-checkout-products" width={1050} height={20} />
      </LoadingWrapper>
    </>
  );
};
