import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../shared/store';
import { PriceService } from '../service/priceService';

const selectProductDetail = ({ productDetail }: RootState) => productDetail;

export const selectedDealProducts = createSelector([selectProductDetail], ({ dealProducts }) =>
  dealProducts.filter((it) => it.quantity > 0),
);

export const selectCurrentTotalPrice = createSelector([selectedDealProducts], (selectedDeals) =>
  selectedDeals.reduce((prev, curr) => {
    const { retailPrice, basePrice, discountedPrice } = curr;

    const { representativePrice } = new PriceService({
      retailPrice,
      basePrice,
      discountedPrice,
    });

    return prev + curr.quantity * representativePrice;
  }, 0),
);

export const selectCurrentTotalPoint = createSelector([selectedDealProducts], (selectedDeals) =>
  selectedDeals.reduce((prev, curr) => prev + curr.quantity * curr.expectedPoint, 0),
);

export const selectRestockNotifiableDealProducts = createSelector([selectProductDetail], ({ dealProducts }) =>
  dealProducts.filter((it) => it.isSoldOut && it.canRestockNotify),
);
