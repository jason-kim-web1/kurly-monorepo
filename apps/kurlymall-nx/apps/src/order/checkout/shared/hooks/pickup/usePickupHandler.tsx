import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { PickupPlace } from '../../interfaces';
import { setValue } from '../../reducers/checkout.slice';
import appService from '../../../../../shared/services/app.service';
import { CHECKOUT_PATH } from '../../../../../shared/constant';
import { redirectTo } from '../../../../../shared/reducers/page';
import { useWebview } from '../../../../../shared/hooks';
import { useAppSelector } from '../../../../../shared/store';

declare global {
  interface Window {
    updateSelectedPickupPlace?: (value: PickupPlace) => void;
    finishAndRefreshFromPickup?: (value: PickupPlace) => void;
  }
}

export default function usePickupHandler() {
  const webview = useWebview();
  const dispatch = useDispatch();
  const { products } = useAppSelector(({ checkout }) => ({
    products: checkout.products,
  }));

  const updateSelectedPickupPlace = useCallback(
    (value: PickupPlace) => {
      dispatch(setValue({ selectedPickupPlace: value }));
    },
    [dispatch],
  );

  const finishAndRefreshFromPickup = () => {
    appService.finishAndRefresh();
  };

  const onClickSelectPickupButton = () => {
    if (webview) {
      appService.openWebview({
        url: `${window.location.origin}${CHECKOUT_PATH.pickup.uri}`,
        title: '픽업매장 정보',
        is_modal: true,
      });
      return;
    }

    dispatch(
      redirectTo({
        url: CHECKOUT_PATH.pickup.uri,
        ...(products && {
          query: { contentProductNo: products[0].contentProductNo },
        }),
      }),
    );
  };

  useEffect(() => {
    window.updateSelectedPickupPlace = updateSelectedPickupPlace;
    window.finishAndRefreshFromPickup = finishAndRefreshFromPickup;
    return () => {
      delete window.updateSelectedPickupPlace;
      delete window.finishAndRefreshFromPickup;
    };
  }, [updateSelectedPickupPlace]);

  return {
    onClickSelectPickupButton,
  };
}
