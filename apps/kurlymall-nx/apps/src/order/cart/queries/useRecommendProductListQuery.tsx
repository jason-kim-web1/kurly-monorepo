import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../shared/store';

import useCurrentAddress from '../../common/hooks/useCurrentAddress';
import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import { isDefined } from '../../../shared/utils/lodash-extends';
import useCartDetailQuery from './useCartDetailQuery';
import { fetchRecommendProductList } from '../services/recommendProductList';

export default function useRecommendProductListQuery() {
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const { data: currentAddress } = useCurrentAddress();
  const { data: cartDetail } = useCartDetailQuery();

  return useQuery(
    CART_QUERY_KEYS.RECOMMEND_PRODUCT_LIST(),
    () =>
      fetchRecommendProductList({
        address: currentAddress?.roadAddress ?? '',
        addressDetail: currentAddress?.addressDetail,
      }),
    {
      refetchOnMount: 'always',
      enabled:
        !isGuest && isDefined(currentAddress) && cartDetail?.totalCount !== cartDetail?.unavailableOrders?.productCount,
    },
  );
}
