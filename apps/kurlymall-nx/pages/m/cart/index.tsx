import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { PropsWithChildren } from 'react';

import Address from '../../../src/order/cart/components/m/Address';
import TotalPrice from '../../../src/order/cart/components/m/TotalPrice';
import BottomAction from '../../../src/order/cart/components/m/BottomAction';
import useCartDetail from '../../../src/order/cart/hooks/useCartDetail';
import FloatingMenu from '../../../src/order/cart/components/FloatingMenu/FloatingMenu';
import DeliveryTypeTab from '../../../src/order/cart/components/m/DeliveryTypeTab';
import useCartSetup from '../../../src/order/cart/hooks/useCartSetup';
import CartLoading from '../../../src/order/cart/components/CartLoading/CartLoading';
import TopBar, { BUTTON_TYPE } from '../../../src/shared/components/KPDS/TopBar';
import CartEmpty from '../../../src/order/cart/components/DeliveryGroupList/CartEmpty';
import DeliveryGroupList from '../../../src/order/cart/components/m/DeliveryGroupList';
import { useAppSelector } from '../../../src/shared/store';
import { totalPriceSelector } from '../../../src/order/cart/store/cart';

const Wrapper = styled.div<{ isLoading: boolean; hasDiscountPrice?: boolean }>`
  background-color: ${({ isLoading }) =>
    isLoading ? vars.color.background.$background1 : vars.color.background.$background2};
  min-height: 100vh;
  padding-bottom: calc(${({ hasDiscountPrice }) => (hasDiscountPrice ? 92 : 72)}px + env(safe-area-inset-bottom));
`;

const CartPageHeaderWrapper = ({
  isLoading,
  hasDiscountPrice,
  children,
}: PropsWithChildren<{ isLoading: boolean; hasDiscountPrice?: boolean }>) => {
  return (
    <Wrapper isLoading={isLoading} hasDiscountPrice={hasDiscountPrice}>
      <TopBar type={BUTTON_TYPE.close}>장바구니</TopBar>
      {children}
    </Wrapper>
  );
};

export default function CartPage() {
  useCartSetup();
  const { discountPrice } = useAppSelector(totalPriceSelector);
  const { isCartEmpty, isLoading } = useCartDetail();

  if (isLoading) {
    return (
      <CartPageHeaderWrapper isLoading={isLoading}>
        <CartLoading />
      </CartPageHeaderWrapper>
    );
  }

  if (isCartEmpty) {
    return (
      <CartPageHeaderWrapper isLoading={isLoading}>
        <Address />
        <CartEmpty />
        <BottomAction />
      </CartPageHeaderWrapper>
    );
  }

  return (
    <CartPageHeaderWrapper isLoading={isLoading} hasDiscountPrice={!!discountPrice}>
      <Address />
      <FloatingMenu>
        <DeliveryTypeTab />
      </FloatingMenu>
      <DeliveryGroupList />
      <TotalPrice />
      <BottomAction />
    </CartPageHeaderWrapper>
  );
}
