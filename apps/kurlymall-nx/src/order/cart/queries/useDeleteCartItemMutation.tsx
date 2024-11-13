import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { isUndefined } from 'lodash';

import type { AxiosError } from 'axios';

import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import { removeCartItem } from '../store/cart';
import CartDetailResponse from '../interface/Cart';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import updateCartItem from '../utils/updateCartItem';
import { useAppSelector } from '../../../shared/store';
import { loadCartItems, storeCartItems } from '../../../cart/shared/services/cart-items.storage.service';
import { CartProduct } from '../interface/CartProduct';
import { postDeleteCartItem } from '../api/postDeleteCartItem';
import { DeleteType } from '../constants/SelectionType';
import { logEventRemoveCartProductSuccess } from '../utils/amplitude/RemoveCartProductSuccess';

type Variables = { products: CartProduct[]; dealProductNos: number[]; selectionType: DeleteType };

type Options = Omit<UseMutationOptions<void, AxiosError, Variables>, 'mutationFn'>;

export default function useDeleteCartItemMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const { data: currentAddress } = useCurrentAddress();

  const mutationFn = async (params: Variables) => {
    await postDeleteCartItem(params.dealProductNos);
  };

  const options: Options = {
    onMutate: async (variables) => {
      const { dealProductNos } = variables;
      // 비회원일 경우 remove api 호출 전에 로컬스토리지에서 해당 상품을 삭제합니다.
      if (isGuest) {
        const guestCartItems = loadCartItems().filter((it) => !dealProductNos.includes(it.dealProductNo));
        storeCartItems(guestCartItems);
      }

      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEYS.DETAIL(currentAddress?.address) });

      dispatch(removeCartItem({ dealProductNos }));

      queryClient.setQueryData<CartDetailResponse>(CART_QUERY_KEYS.DETAIL(currentAddress?.address), (old) => {
        if (isUndefined(old)) {
          return old;
        }

        return updateCartItem({
          previousCartDetail: old,
          updater: (it) => ({
            ...it,
            products: it.products.filter((product) => !dealProductNos.includes(product.dealProductNo)),
          }),
        });
      });
    },
    onSuccess: (_, { dealProductNos, products, selectionType }) => {
      logEventRemoveCartProductSuccess({
        products,
        dealProductNos,
        selectionType,
        currentAddress,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.DETAIL(currentAddress?.address) });
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.REFRESH() });
    },
  };

  return useMutation(mutationFn, { ...options });
}
