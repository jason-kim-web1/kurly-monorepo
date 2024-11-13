import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { Alert } from '@thefarmersfront/kpds-react';

import { useState } from 'react';

import useAddToCartMutation from '../queries/useAddToCartMutation';
import useCartDetailQuery from '../queries/useCartDetailQuery';
import { ignoreError } from '../../../shared/utils/general';
import useRecommendProductListQuery from '../queries/useRecommendProductListQuery';
import { DEFAULT_ADD_ERROR_MESSAGE } from '../constants/AddToCart';
import useCheckboxStatus from './useCheckboxStatus';
import { addCartItem } from '../store/cart';
import useBottomSheetCheckoutButton from './useBottomSheetCheckoutButton';
import { EVENT_NAME, logEventRecommendProductAddToCart } from '../utils/amplitude/RecommendProductAddToCartProduct';
import { RecommendProductList } from '../interface/RecommendProduct';
import { logEventPixelAddToCart } from '../utils/pixel/logEventPixelAddToCart';

const ADD_TO_CART_DEFAULT_PARAM = { quantity: 1 };
const CHECKBOX_STATUS_DEFAULT_PARAM = { checked: true };

export default function useRecommendBottomSheet() {
  const dispatch = useDispatch();
  const { reload } = useRouter();
  const [addedDealNumberList, setAddedDealNumberList] = useState<number[]>([]);

  const { data: recommendProductList } = useRecommendProductListQuery();
  const { refetch: refetchCartDetail } = useCartDetailQuery();
  const { mutateAsync: addToCart } = useAddToCartMutation();
  const { onToggleCheckboxStatus } = useCheckboxStatus();
  const { goToCheckoutOrder } = useBottomSheetCheckoutButton(addedDealNumberList);

  const handleClickAddToCart = async (addedProduct: RecommendProductList) => {
    const { dealProductNo } = addedProduct;
    const params = [{ dealProductNo, ...ADD_TO_CART_DEFAULT_PARAM }];

    try {
      ignoreError(() =>
        logEventRecommendProductAddToCart(recommendProductList, dealProductNo, EVENT_NAME.ADD_TO_CART_PRODUCT),
      );

      await addToCart(params);

      ignoreError(() => {
        logEventRecommendProductAddToCart(recommendProductList, dealProductNo, EVENT_NAME.ADD_TO_CART_SUCCESS);
        logEventPixelAddToCart([addedProduct]);
      });

      // Checkbox 상태 업데이트
      dispatch(addCartItem({ dealProductNos: [dealProductNo] }));
      onToggleCheckboxStatus({ dealProductNo, ...CHECKBOX_STATUS_DEFAULT_PARAM });

      setAddedDealNumberList((prev) => [...prev, dealProductNo]);
      await refetchCartDetail();
    } catch (err) {
      const errorMessage = (err as Error).message || DEFAULT_ADD_ERROR_MESSAGE;

      await Alert({ contents: errorMessage });
      reload();
    }
  };

  return {
    handleClickAddToCart,
    title: recommendProductList?.title,
    productList: recommendProductList?.productList,
    goToCheckoutOrder,
  };
}
