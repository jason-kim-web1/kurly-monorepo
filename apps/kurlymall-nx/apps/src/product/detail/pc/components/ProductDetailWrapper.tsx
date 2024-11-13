import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

const BuyFooterContainer = dynamic(() => import('../containers/ProductBuyFooterContainer'), { ssr: false });
const TopScrollButton = dynamic(() => import('../../../../shared/components/PC/Button/TopScrollButton'), {
  ssr: false,
});

const Container = styled.div`
  width: 100%;
  position: relative;
`;

interface Props {
  displayFloatingComponent: boolean;
  children: ReactNode;
}

export default function ProductDetailWrapper({ displayFloatingComponent, children }: Props) {
  return (
    <Container>
      {children}
      {displayFloatingComponent ? <BuyFooterContainer isDisplay={displayFloatingComponent} /> : null}
      <TopScrollButton isDisplay={displayFloatingComponent} />
    </Container>
  );
}
