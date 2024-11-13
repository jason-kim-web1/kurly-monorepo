import styled from '@emotion/styled';
import { useEffect } from 'react';
import { eq, isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

import { getCartButtonText } from '../../../../shared/utils/productDetailState';
import type { ContentType, DealProduct, DirectOrderType } from '../../../../types';
import CartOptionHeader from './CartOptionHeader';
import CartOptionButton from './CartOptionButton';
import { hiddenScrollBar } from '../../../../../../shared/utils/hidden-scrollbar';
import CartOptionItem from './CartOptionItem';
import { redirectTo } from '../../../../../../shared/reducers/page';
import { getPageUrl, MEMBERSHIP_PATH } from '../../../../../../shared/constant';
import { storeSessionStorage } from '../../../../../../shared/services/session.storage.service';
import {
  getMembershipPurchaseAlertInfo,
  getVerifiedMembershipOnlyDeals,
} from '../../../../../service/verifyMembershipOnlyProductByDeal';
import MembershipOnlyProductAlert from '../../../../../../shared/components/Cart/MembershipOnlyProductAlert';
import {
  LAST_VIEWING_CONTENT_NO,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from '../../../../../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import { PriceService } from '../../../../../service/priceService';

const CartOptionContents = styled.div`
  padding: 0 20px;
  border-radius: 10px;
`;

const CartOptionListWrapper = styled.div`
  width: 100%;
  max-height: 60vh;
  ${hiddenScrollBar({ x: 'visible' })};
`;

interface Props {
  contentNo: number;
  mainImageUrl: string;
  name: string;
  shortDescription: string;
  dealProducts: DealProduct[];
  minEa: number;
  isDirectOrder: boolean;
  isSoldOut: boolean;
  isPurchaseStatus: boolean;
  contentsSoldOutGuideText: string;
  isDiscountProduct: boolean;
  directOrderType: DirectOrderType;
  disabledBuyButton: boolean;
  contentType: ContentType;
  buyProduct(): void;
  onChangeSoldOutStatus?(): void;
}

export default function CartOptionModal({
  contentNo,
  mainImageUrl,
  name,
  shortDescription,
  dealProducts,
  isDirectOrder,
  isSoldOut,
  isPurchaseStatus,
  contentsSoldOutGuideText,
  directOrderType,
  disabledBuyButton,
  buyProduct,
  contentType,
  onChangeSoldOutStatus,
}: Props) {
  const dispatch = useDispatch();
  const selectedProducts = dealProducts.filter((it) => it.quantity > 0);
  const totalQuantity = selectedProducts.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = selectedProducts.reduce((prev, curr) => {
    const { retailPrice, basePrice, discountedPrice } = curr;
    const { representativePrice } = new PriceService({
      retailPrice,
      basePrice,
      discountedPrice,
    });
    return prev + curr.quantity * representativePrice;
  }, 0);
  const isProductDisabled = disabledBuyButton;
  const cartButtonText = getCartButtonText({
    isDirectOrder,
    isProductDisabled,
    totalPrice,
    totalQuantity,
  });

  const onClickCartButton = async () => {
    try {
      await buyProduct();
    } catch (error) {
      if (onChangeSoldOutStatus) {
        onChangeSoldOutStatus();
      }
    }
  };

  useEffect(() => {
    if (isProductDisabled && onChangeSoldOutStatus) {
      onChangeSoldOutStatus();
    }
  }, [isProductDisabled, onChangeSoldOutStatus]);

  useEffect(() => {
    if (!eq(dealProducts.length, 1)) {
      return;
    }

    const filteredMembersOnlyDeals = getVerifiedMembershipOnlyDeals(selectedProducts);
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
  }, []);

  return (
    <>
      <CartOptionContents>
        <CartOptionHeader
          name={name}
          shortDescription={shortDescription}
          thumbnailImageUrl={mainImageUrl}
          isSoldOut={isSoldOut}
          isPurchaseStatus={isPurchaseStatus}
        />
        <CartOptionListWrapper>
          {dealProducts.map((deal) => (
            <CartOptionItem
              key={deal.no}
              contentNo={contentNo}
              deal={deal}
              contentsSoldOutGuideText={contentsSoldOutGuideText}
              contentType={contentType}
              directOrderType={directOrderType}
            />
          ))}
        </CartOptionListWrapper>
      </CartOptionContents>
      <CartOptionButton text={cartButtonText} onClick={onClickCartButton} disabled={isProductDisabled} />
    </>
  );
}
