import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import useCartRefreshQuery from '../queries/useCartRefreshQuery';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectCart } from '../../../shared/amplitude/events';
import { redirectTo } from '../../../shared/reducers/page';
import { CART_PATH } from '../../../shared/constant';

import { CART_QUERY_KEYS } from '../../checkout/shared/constants/querykeys';

const cartUrl = CART_PATH.cart.uri;

export default function useHeaderCartIcon() {
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  const { data: cartItems, refetch } = useCartRefreshQuery();
  const queryClient = useQueryClient();

  const moveCart = useCallback(async () => {
    amplitudeService.logEvent(new SelectCart());

    if (pathname === cartUrl) {
      await queryClient.invalidateQueries(CART_QUERY_KEYS.ALL);
      return;
    }

    dispatch(redirectTo({ url: cartUrl }));
  }, [dispatch, pathname]);

  useEffect(() => {
    const handleBfCache = async ({ persisted }: PageTransitionEvent) => {
      if (!persisted) {
        return;
      }

      await refetch();
    };

    // bfCache가 발생해도 referesh API를 재호출하도록 추가
    window.addEventListener('pageshow', handleBfCache);

    return () => {
      window.removeEventListener('pageshow', handleBfCache);
    };
  }, [refetch]);

  return {
    basketCount: cartItems.length,
    moveCart,
  };
}
