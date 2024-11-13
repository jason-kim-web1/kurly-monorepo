import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import { useCounter } from '../../src/order/cart/hooks/useCounter';
import { useCounterDeliveryNotice } from '../../src/order/cart/hooks/useCounterDeliveryNotice';
import CartLoading from '../../src/order/cart/components/CartLoading/CartLoading';

const HEADER_HEIGHT = 156;
const FOOTER_HEIGHT = 562;

const Wrapper = styled.div`
  position: relative;
  background-color: ${vars.color.background.$background2};
`;

const Title = styled.h2`
  text-align: center;
  padding: 50px 0 calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  min-height: 600px;
`;

export default function CounterPage() {
  const { handleDeliveryNotice } = useCounterDeliveryNotice();
  useCounter(handleDeliveryNotice);

  return (
    <>
      <Header />
      <Wrapper>
        <Title>
          <Typography variant={'$accessibility2Semibold'}>장바구니</Typography>
        </Title>
        <CartLoading />
      </Wrapper>
      <Footer />
    </>
  );
}
