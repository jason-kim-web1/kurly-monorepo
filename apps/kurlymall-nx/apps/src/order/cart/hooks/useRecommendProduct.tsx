import { useCallback } from 'react';

import useToggle from '../../checkout/shared/hooks/useToggle';
import useRecommendProductListQuery from '../queries/useRecommendProductListQuery';
import { logEventImpressionBottomPopup } from '../utils/amplitude/ImpressionBottomPopup';
import { useAppSelector } from '../../../shared/store';
import { totalPriceSelector } from '../store/cart';
import { logEventCloseBottomPopup } from '../utils/amplitude/CloseBottomPopup';
import { ignoreError } from '../../../shared/utils/general';

export default function useRecommendProduct() {
  const { isOpen, close, open } = useToggle();
  const { data: recommendProductList } = useRecommendProductListQuery();
  const { deliveryPrice } = useAppSelector(totalPriceSelector);

  const openRecommendBottomSheet = useCallback(() => {
    ignoreError(() => logEventImpressionBottomPopup(recommendProductList, deliveryPrice));
    open();
  }, [deliveryPrice, open, recommendProductList]);

  const closeRecommendBottomSheet = useCallback(() => {
    ignoreError(() => logEventCloseBottomPopup(recommendProductList, deliveryPrice));
    close();
  }, [close, deliveryPrice]);

  return {
    isRecommendBottomSheetOpen: isOpen,
    closeRecommendBottomSheet,
    openRecommendBottomSheet,
  };
}
