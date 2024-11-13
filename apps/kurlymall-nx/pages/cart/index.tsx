import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { css } from '@emotion/react';

import { useSticky } from '../../src/order/cart/hooks/useSticky';

import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import FloatingMenu from '../../src/order/cart/components/FloatingMenu/FloatingMenu';
import Address from '../../src/order/cart/components/pc/Address';
import TotalPrice from '../../src/order/cart/components/pc/TotalPrice';

import ProceedToCheckoutButton from '../../src/order/cart/components/pc/ProceedToCheckoutButton';
import DeliveryTypeTab from '../../src/order/cart/components/pc/DeliveryTypeTab';
import useCartSetup from '../../src/order/cart/hooks/useCartSetup';
import DeliveryGroupList from '../../src/order/cart/components/pc/DeliveryGroupList';
import { PC_HEADER_HEIGHT } from '../../src/order/cart/constants';

const Body = styled.div`
  padding-bottom: 80px;
  background-color: ${vars.color.background.$background2};
`;

const Wrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const Title = styled.h2`
  padding: 50px 0 48px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  letter-spacing: -0.5px;
`;

const ProductWrapper = styled.div`
  position: relative;
  width: 565px;
  margin-right: 20px;
`;

const OrderWrapper = styled.div`
  position: relative;
  width: 375px;
  min-height: 545px;
`;

const ScrollWrapper = styled.div<{ sticky: boolean }>`
  position: absolute;
  width: 375px;
  ${({ sticky }) =>
    sticky &&
    css`
      position: sticky;
      top: 110px;
      right: 0;
    `};
`;

export default function CartPage() {
  useCartSetup();

  const { sticky, thresholdRef } = useSticky({
    rootMarginTop: -PC_HEADER_HEIGHT,
  });

  return (
    <>
      <Header />
      <Body>
        <Wrapper>
          <Title>
            <Typography variant={'$accessibility2Semibold'}>장바구니</Typography>
            <div ref={thresholdRef} />
          </Title>
          <Container>
            <ProductWrapper>
              {/* 플로팅 메뉴*/}
              <FloatingMenu>
                <DeliveryTypeTab />
              </FloatingMenu>
              {/* 상품 목록 */}
              <DeliveryGroupList />
            </ProductWrapper>
            <OrderWrapper>
              <ScrollWrapper sticky={sticky}>
                {/* 배송지 영역 */}
                <Address />
                {/* 결제금액 */}
                <TotalPrice />
                {/* 주문하기 버튼 */}
                <ProceedToCheckoutButton />
              </ScrollWrapper>
            </OrderWrapper>
          </Container>
        </Wrapper>
      </Body>
      <Footer />
    </>
  );
}
