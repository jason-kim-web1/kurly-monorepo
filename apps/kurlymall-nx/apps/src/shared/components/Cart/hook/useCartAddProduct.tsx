import { useMemo, useState } from 'react';

import { isEmpty, map } from 'lodash';

import { useDispatch } from 'react-redux';

import { DealProduct } from '../../../../mypage/order/shared/interfaces';
import { validateDealProductQuantity } from '../../../utils/validate-deal-product-quantity';
import Alert from '../../Alert/Alert';
import { LegacyPromotionType } from '../../../../product/detail/types';
import { PriceService } from '../../../../product/service/priceService';
import { redirectTo } from '../../../reducers/page';
import { getPageUrl, MEMBERSHIP_PATH } from '../../../constant';
import { storeSessionStorage } from '../../../services/session.storage.service';
import {
  getMembershipPurchaseAlertInfo,
  getVerifiedMembershipOnlyDeals,
} from '../../../../product/service/verifyMembershipOnlyProductByDeal';
import MembershipOnlyProductAlert from '../MembershipOnlyProductAlert';
import { LAST_VIEWING_CONTENT_NO, PRODUCT_SELECT_USER_ACTION_TYPE } from '../MembershipOnlyProductAlert/constants';

export default function useCartAddProduct(
  contentNo: number,
  dealProducts: DealProduct[],
  legacyPromotion: LegacyPromotionType,
) {
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState<{ [key: string]: DealProduct }>({});

  const getProductList = ({
    changedQuantity,
    targetProductNo,
    target,
  }: {
    changedQuantity: number;
    targetProductNo: number;
    target: DealProduct;
  }) => {
    const isDeleteProduct = changedQuantity === 0;

    if (isDeleteProduct) {
      const productList = { ...inCart };
      delete productList[targetProductNo];
      return productList;
    }

    const productList = {
      ...inCart,
      [targetProductNo]: {
        ...(inCart[targetProductNo] || target),
        buyUnit: changedQuantity,
      },
    };

    return productList;
  };

  const changeBuyUnit = (targetProductNo: number) => async (newBuyUnit: number) => {
    const target = dealProducts.find((product) => product.no === targetProductNo);

    if (!target) {
      return;
    }

    const isMultiProduct = dealProducts.length > 1;
    const isLegacyPromotion = legacyPromotion !== null;

    const { text, changedQuantity } = validateDealProductQuantity({
      quantity: newBuyUnit,
      dealProductName: target.name,
      dealProductLimit: {
        min: isMultiProduct ? 0 : target.minEa,
        max: isLegacyPromotion ? 1 : target.maxEa,
      },
    });

    if (!isEmpty(text)) {
      await Alert({ text });
      return;
    }

    const updateInCart = getProductList({ changedQuantity, targetProductNo, target });
    setInCart(updateInCart);

    const isIncrease = changedQuantity > 0 && changedQuantity > (inCart[targetProductNo]?.buyUnit || 0);
    if (isIncrease) {
      const filteredMembersOnlyDeals = getVerifiedMembershipOnlyDeals([updateInCart[targetProductNo]]);
      if (isEmpty(filteredMembersOnlyDeals)) {
        return;
      }

      const membershipPurchaseAlertInfo = getMembershipPurchaseAlertInfo(filteredMembersOnlyDeals);
      MembershipOnlyProductAlert({
        userAction: PRODUCT_SELECT_USER_ACTION_TYPE.SET_QUANTITY,
        membershipPurchaseAlertInfo,
        onClickConfirm: () => {
          storeSessionStorage<string>(LAST_VIEWING_CONTENT_NO, JSON.stringify(contentNo));
          dispatch(redirectTo({ url: getPageUrl(MEMBERSHIP_PATH.membership) }));
        },
      });
    }
  };

  const selectedDealProducts = map(inCart, (item) => item).filter((item) => item.buyUnit > 0);

  const calculatedCart = selectedDealProducts.reduce(
    (prev, curr) => {
      const { buyUnit, retailPrice, basePrice, discountedPrice, expectedPoint } = curr;

      const { representativePrice } = new PriceService({
        retailPrice,
        basePrice,
        discountedPrice,
      });

      const totalCount = prev.totalCount + buyUnit;
      const totalPrice = prev.totalPrice + buyUnit * representativePrice;
      const totalPoint = prev.totalPoint + buyUnit * expectedPoint;

      return { totalCount, totalPrice, totalPoint };
    },
    {
      totalCount: 0,
      totalPrice: 0,
      totalPoint: 0,
    },
  );

  const isDiscountProduct = useMemo(() => dealProducts.some((deal) => deal.discountRate > 0), [dealProducts]);

  return { changeBuyUnit, inCart, isDiscountProduct, ...calculatedCart };
}
