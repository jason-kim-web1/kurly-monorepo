import { useMutation, useQueryClient } from '@tanstack/react-query';

import { isUndefined } from 'lodash';

import { useDispatch } from 'react-redux';

import { postChangeCartItems } from '../api/postChangeCartItems';
import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import CartDetailResponse from '../interface/Cart';
import { notify } from '../../../shared/reducers/page';
import updateCartItem from '../utils/updateCartItem';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import { changeCartItemInLocalStorage } from '../../../cart/shared/services/cart-items.storage.service';
import { debounceWithPromise } from '../../common/utils/debounceWithPromise';

interface ChangeQuantityParams {
  dealProductNo: number;
  quantity: number;
}

const debouncedPostChangeCartItem = debounceWithPromise(postChangeCartItems, 200);

export default function useChangeQuantityMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: currentAddress } = useCurrentAddress();

  const updateQuantity = async ({ dealProductNo, quantity }: ChangeQuantityParams) => {
    await queryClient.cancelQueries({ queryKey: CART_QUERY_KEYS.DETAIL(currentAddress?.address) });

    queryClient.setQueryData<CartDetailResponse>(CART_QUERY_KEYS.DETAIL(currentAddress?.address), (old) => {
      if (isUndefined(old)) {
        return old;
      }

      return updateCartItem({
        previousCartDetail: old,
        updater: (it) => ({
          ...it,
          products: it.products.map((product) => {
            if (product.dealProductNo === dealProductNo) {
              return { ...product, quantity };
            }
            return product;
          }),
        }),
      });
    });
  };

  const onChangeGuestCartItemQuantity = async (params: ChangeQuantityParams) => {
    changeCartItemInLocalStorage(params);
    await updateQuantity(params);
  };

  const { mutateAsync } = useMutation({
    mutationFn: debouncedPostChangeCartItem,
    onMutate: updateQuantity,
    onError: async (err: Error) => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.DETAIL(currentAddress?.address) });
      // TODO: 장바구니 에러 처리 공통로직 추가 필요
      dispatch(notify(err.message));
    },
  });

  return { mutateAsync, onChangeGuestCartItemQuantity };
}
