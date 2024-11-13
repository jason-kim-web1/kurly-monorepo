import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { head, isEmpty, map } from 'lodash';

import useCartItems from './hook/useCartItems';

import { DealProduct } from '../../../mypage/order/shared/interfaces';
import { notify, redirectTo } from '../../reducers/page';
import Alert from '../Alert/Alert';
import { validateAddToCart } from '../../utils/validate-add-to-cart';
import { CART_PATH, getPageUrl } from '../../constant';
import { isPC } from '../../../../util/window/getDevice';

import Confirm, { closeConfirm } from '../Alert/Confirm';
import Button from '../Button/Button';
import {
  assertDisabledAddToCartByMembershipDeals,
  getMembershipOnlyDeals,
} from '../../../product/service/verifyMembershipOnlyProductByDeal';
import { logPixelAddToCart } from '../../utils/logPixelAddToCart';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  button {
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

interface Props {
  cart: { [key: string]: DealProduct };
  onHandleClose(): void;
  contentsMinEa: number;
  contentsMaxEa: number | null;
  totalCount: number;
  imageUrl: string;
  contentsName: string;
  addToCart(isSuccess: boolean, message?: string): void;
  onChangeSoldOutStatus?(): void;
}

export default function DialogCartButtons({
  cart,
  onHandleClose,
  contentsMinEa,
  contentsMaxEa,
  totalCount,
  imageUrl,
  contentsName,
  addToCart,
  onChangeSoldOutStatus,
}: Props) {
  const dispatch = useDispatch();
  const { addToBasket } = useCartItems();

  const unavailableCart = useCallback(
    ({ message }: { message: string }) => {
      alert(message);

      addToCart(false, message);

      onHandleClose();

      if (onChangeSoldOutStatus) {
        onChangeSoldOutStatus();
      }
    },
    [addToCart, onChangeSoldOutStatus, onHandleClose],
  );

  const handleAddCart = async () => {
    const cartItems = map(cart, ({ no: dealProductNo, buyUnit: quantity }) => {
      return { dealProductNo, quantity };
    });

    const headCartItem = head(Object.entries(cart));

    const membershipOnlyDeals = getMembershipOnlyDeals(Object.values(cart));
    if (!isEmpty(membershipOnlyDeals)) {
      return;
    }

    if (headCartItem && !headCartItem[1].isPurchaseStatus) {
      unavailableCart({ message: '현재 판매 중인 상품이 아닙니다.' });
      return;
    }

    if (headCartItem && headCartItem[1].isSoldOut) {
      unavailableCart({ message: `${headCartItem[1].name} 상품이 품절되었습니다.` });
      return;
    }

    const invalidText = validateAddToCart({
      totalCount,
      contentsName,
      contentsMinEa,
      contentsMaxEa,
    });

    if (!isEmpty(invalidText)) {
      Alert({ text: invalidText });

      addToCart(false, invalidText);

      return;
    }

    if (!headCartItem) {
      const msg = '수량은 반드시 1 이상이어야 합니다.';
      Alert({ text: msg });

      addToCart(false, msg);

      return;
    }

    const panelOption = {
      representativeItem: {
        imageUrl: imageUrl,
        name: headCartItem[1].name,
      },
      isOpenPanel: true,
    };

    try {
      await addToBasket({
        cartItems,
        panelOption,
      });

      logPixelAddToCart(cart);
      addToCart(true);

      if (!isPC) {
        const confirmText = '선택한 상품이 장바구니에 담겼습니다.';

        Confirm({
          text: confirmText,
          leftButtonText: '장바구니 확인',
          rightButtonText: '계속 쇼핑하기',
          showRightButton: true,
          onClickLeftButton: () => dispatch(redirectTo({ url: getPageUrl(CART_PATH.cart) })),
          onClickRightButton: () => closeConfirm(),
        });
      }
    } catch (e) {
      dispatch(notify((e as Error).message));
    } finally {
      onHandleClose();
    }
  };

  return (
    <Container>
      <Button text="취소" theme="tertiary" height={56} onClick={onHandleClose} />
      <Button
        text="장바구니 담기"
        theme="primary"
        height={56}
        onClick={handleAddCart}
        disabled={assertDisabledAddToCartByMembershipDeals(Object.values(cart))}
      />
    </Container>
  );
}
