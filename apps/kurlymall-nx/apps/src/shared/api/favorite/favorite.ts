import { UnknownError } from '../../errors';

import { BaseResponse, FavoriteProduct, FavoriteProductExtend, ORDER_TYPE_STATUS } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { FavoriteFilterType } from '../../../mypage/favorite/shared/interfaces/interface';

const getProductName = (dealProductName: string, isSoldOutText: boolean) => {
  if (isSoldOutText) {
    return `(품절) ${dealProductName}`;
  }
  return dealProductName;
};

export const fetchFavoriteProducts = async ({ sortType }: { sortType: FavoriteFilterType }) => {
  const endpoint = `/order/v2/frequent-products`;

  try {
    const { data } = await httpClient.get<BaseResponse<FavoriteProductExtend[]>>(endpoint, {
      params: {
        sortType,
      },
    });

    const sortedProducts = data.data.reduce(
      (acc: FavoriteProductExtend[][], cur: FavoriteProduct) => {
        const { normalOrderTypePolicyInContents, isSoldOut, isDisplay, dealProductName } = cur;
        const isCartAdd = normalOrderTypePolicyInContents === ORDER_TYPE_STATUS.DEFAULT;
        const isSoldOutText = !isDisplay || isSoldOut;
        const isDealSoldOut = !isDisplay;
        const isDealComingSoon = isDisplay && isSoldOut;

        const product = {
          contentsProductNo: cur.contentsProductNo,
          dealProductNo: cur.dealProductNo,
          dealProductName: cur.dealProductName,
          masterProductNo: cur.masterProductNo,
          count: cur.count,
          productImageUrl: cur.productImageUrl,
          productVerticalMediumUrl: cur.productVerticalMediumUrl,
          discountRate: cur.discountRate,
          productPrice: cur.productPrice,
          retailPrice: cur.retailPrice,
          discountPrice: cur.discountPrice,
          normalOrderTypePolicyInContents: cur.normalOrderTypePolicyInContents,
          isRestockNotify: cur.isRestockNotify,
          isDisplay: cur.isDisplay,
          isSoldOut: cur.isSoldOut,
          isCartAdd,
          isDealSoldOut,
          isDealComingSoon,
          productName: getProductName(dealProductName, isSoldOutText),
          categoryIds: cur.categoryIds,
        };

        const soldOutProduct = acc[1];
        const undisplayedProduct = acc[2];
        const buyPossibleProduct = acc[0];

        if (isDealComingSoon) {
          soldOutProduct.push(product);
        } else if (isDealSoldOut) {
          undisplayedProduct.push(product);
        } else {
          buyPossibleProduct.push(product);
        }

        return acc;
      },
      [[], [], []],
    );

    return sortedProducts.flat();
  } catch (error) {
    throw new UnknownError(error);
  }
};
