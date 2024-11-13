import { useQuery } from '@tanstack/react-query';

import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';
import { useAppSelector } from '../../../shared/store';
import { loadCartRefresh } from '../api/loadCartRefresh';
import { loadCartItems } from '../../../cart/shared/services/cart-items.storage.service';

export default function useCartRefreshQuery() {
  const { isGuest, hasSession } = useAppSelector(({ auth }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
  }));

  const queryResult = useQuery({
    queryKey: CART_QUERY_KEYS.REFRESH(),
    queryFn: () => {
      return isGuest ? loadCartItems() : loadCartRefresh();
    },
    enabled: hasSession,
    refetchOnMount: 'always',
  });

  return {
    ...queryResult,
    data: queryResult.data ?? [],
  };
}
