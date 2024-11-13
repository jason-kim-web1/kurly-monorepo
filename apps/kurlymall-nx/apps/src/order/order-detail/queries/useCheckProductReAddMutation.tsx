import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Alert } from '@thefarmersfront/kpds-react';

import { OrderDetail } from '../interface/OrderDetail';
import { ORDER_DETAIL_QUERY_KEYS } from '../constants/QueryKeys';
import { checkProductReAddAvailable } from '../api/checkProductReAddAvailable';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { logEventAddToCartSuccess } from '../../../shared/amplitude/events/mypage/AddToCartSuccess';
import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import { postReAddCartItems } from '../../cart/api/postReAddCartItems';
import { convertAvailableProducts } from '../utils/convertAvailableProducts';
import { logEventPixelAddToCart } from '../../cart/utils/pixel/logEventPixelAddToCart';
import { ignoreError } from '../../../shared/utils/general';

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
}

const generateCartItems = (products: { dealProductNo: number; quantity: number; createdAt?: string }[]) => {
  return products.map(({ quantity, dealProductNo }) => ({ quantity, dealProductNo }));
};

const useCheckProductReAddMutation = ({ groupOrderNo }: Props) => {
  const queryClient = useQueryClient();
  const { data: addressData } = useCurrentAddress();

  const mutationFn = async () => {
    const data = queryClient.getQueryData<OrderDetail>(ORDER_DETAIL_QUERY_KEYS.DETAIL(groupOrderNo));

    if (!data) return;

    const { deliveryGroups } = data;

    const { checkoutType, availableProducts, unavailableProducts } = await checkProductReAddAvailable({
      address: addressData?.address || '',
      addressDetail: addressData?.addressDetail || '',
      dealProducts: generateCartItems(deliveryGroups.map(({ dealProducts }) => dealProducts).flat()),
    });

    const hasNothingToReAdd = !checkoutType || availableProducts.length === 0;

    if (hasNothingToReAdd) {
      throw Error('품절 등의 이유로 구매 불가능한 상품입니다.');
    }

    await postReAddCartItems(generateCartItems(availableProducts));

    return {
      availableProducts: convertAvailableProducts({ availableProducts, deliveryGroups }),
      unavailableProducts,
    };
  };

  return useMutation(mutationFn, {
    onSuccess: async (data) => {
      if (!data) return;

      const { availableProducts, unavailableProducts } = data;
      const availableProductsCount = availableProducts.length;

      const unavailableMessage = unavailableProducts.length > 0 ? '구매 불가능한 상품을 제외하고 ' : '';
      const message = `${unavailableMessage}${availableProductsCount}개 상품을 장바구니에 담았습니다.`;

      if (isWebview()) {
        appService.postToast({
          type: 'success',
          title: message,
        });
        appService.postAppMessage({ code: 'WV1001' });
      } else {
        await Alert({
          contents: message,
        });
      }

      ignoreError(() => {
        logEventAddToCartSuccess(availableProductsCount);
        logEventPixelAddToCart(availableProducts);
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.REFRESH() });
    },
    onError: async (error: AxiosError) => {
      if (isWebview()) {
        appService.postToast({
          type: 'failure',
          title: error.message,
        });
      } else {
        await Alert({
          contents: error.message,
        });
      }
    },
  });
};

export default useCheckProductReAddMutation;
