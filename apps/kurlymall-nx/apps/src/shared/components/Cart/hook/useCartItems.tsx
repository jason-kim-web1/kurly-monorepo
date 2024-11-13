import { useDispatch } from 'react-redux';

import { useQueryClient } from '@tanstack/react-query';

import { storeCartItems } from '../../../../cart/shared/services/cart-items.storage.service';
import { addCartItems } from '../../../../cart/shared/services/cart.service';
import { setCartItemPanel, setOpenCartItemPanel } from '../../../../header/header.slice';
import { useAppSelector } from '../../../store';
import { CART_QUERY_KEYS } from '../../../../order/checkout/shared/constants/querykeys';
import useCartRefreshQuery from '../../../../order/cart/queries/useCartRefreshQuery';
import { CartItem } from '../../../../order/cart/interface/CartProduct';

interface PanelOption {
  representativeItem: {
    imageUrl?: string;
    name?: string;
  };
  isOpenPanel: boolean;
}

export default function useCartItems() {
  const dispatch = useDispatch();
  const { isGuest } = useAppSelector(({ auth }) => ({
    isGuest: auth.isGuest,
  }));
  const queryClient = useQueryClient();

  const { data: currentCartItems } = useCartRefreshQuery();

  // 장바구니 저장
  const storeCart = async (cartItems: CartItem[]) => {
    if (isGuest) {
      storeCartItems(cartItems);
    }

    // 장바구니 추가 후 헤더의 장바구니 아이콘 숫자 갱신을 위해 캐시 무효화
    await queryClient.invalidateQueries(CART_QUERY_KEYS.REFRESH());
  };

  // 헤더에 있는 장바구니 패널 설정
  const activeCartPannel = ({
    cartItems,
    isInCart,
    panelOption,
  }: {
    cartItems: CartItem[];
    isInCart: boolean;
    panelOption?: PanelOption;
  }) => {
    if (!panelOption) {
      return;
    }

    const { representativeItem, isOpenPanel } = panelOption;
    const { imageUrl, name } = representativeItem;
    const quantity = cartItems.length;
    dispatch(setCartItemPanel({ imageUrl, name, quantity, isInCart }));
    dispatch(setOpenCartItemPanel(isOpenPanel));
  };

  // 장바구니 추가 액션
  const addToBasket = async ({ cartItems, panelOption }: { cartItems: CartItem[]; panelOption?: PanelOption }) => {
    const result = await addCartItems({
      isGuest,
      currentCartItems,
      newCartItems: cartItems,
    });

    await storeCart(result.cartItems);

    activeCartPannel({
      isInCart: result.isInCart,
      cartItems: result.cartItems,
      panelOption,
    });
  };

  return {
    addToBasket,
  };
}
