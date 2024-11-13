import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { eq } from 'lodash';

import useProductBuy from '../../hooks/useProductBuy';

import { getContentsSoldOutGuideText } from '../../shared/utils/productDetailState';

import COLOR from '../../../../shared/constant/colorset';
import { zIndex } from '../../../../shared/styles';

import LikeButton from '../components/buyFooter/like-button/LikeButton';
import CartOptionModal from '../components/buyFooter/cart-option/CartOptionModal';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { useAppSelector } from '../../../../shared/store';
import { SelectPurchase } from '../../../../shared/amplitude/events/product/SelectPurchase';
import { getFusionQueryId } from '../../shared/utils/productDetailEvent';

import Button from '../../../../shared/components/Button/Button';
import SlideModal from '../../../../shared/components/modal/SlideModal';
import sendAmplitudeProductViewSelection from '../../../../shared/amplitude/component/sendAmplitudeProductViewSelection';

import type { ReferrerEventType } from '../../../types';
import { REFERRER_EVENT_TYPE } from '../../../constants';
import { getSword } from '../../../../search/shared/utils/getSword';

const ButtonGroup = styled.footer<{ isCartActive: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-content: space-between;
  padding: 8px 12px;
  box-sizing: border-box;
  box-shadow: ${(props) => !props.isCartActive && `inset 0 1px 0 0 ${COLOR.tabBg}`};
  background-color: ${COLOR.kurlyWhite};
  z-index: ${zIndex.productBuyFooter};

  @supports (height: constant(safe-area-inset-bottom)) {
    height: calc(68px + constant(safe-area-inset-bottom));
  }
  @supports (height: env(safe-area-inset-bottom)) {
    height: calc(68px + env(safe-area-inset-bottom));
  }

  > button + button {
    margin-left: 8px;
  }

  .cart-button {
    border-radius: 6px;

    > span {
      font-weight: 600;
    }
  }
`;

interface Props {
  referrerEventType?: ReferrerEventType;
  refererProductNo?: number;
  refererProductName?: string;
}

export default function BuyFooterContainer({
  referrerEventType = REFERRER_EVENT_TYPE.DETAIL,
  refererProductNo,
  refererProductName,
}: Props) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);
  const [searchKeyword, setSearchKeyword] = useState('');
  const isReferrerReviewDetail = eq(referrerEventType, REFERRER_EVENT_TYPE.REVIEW_DETAIL);
  const {
    defaultContentId,
    name,
    contentType,
    isDirectOrder,
    isSoldOut,
    dealProducts,
    isPurchaseStatus,
    discountedPrice,
    directOrderType,
    shortDescription,
    mainImageUrl,
    soldOutText,
    minEa,
    no,
    deliveryTypeNames,
    isGroupProduct,
    sellerName,
    isGiftable,
  } = productDetailState;
  const { buyProduct, disabledBuyButton } = useProductBuy({
    isSoldOut,
    isDirectOrder,
    isPurchaseStatus,
    isReferrerReviewDetail,
    searchKeyword,
    productDetailState,
    referrerProductNo: refererProductNo,
    referrerProductName: refererProductName,
  });
  const [isCartActive, setIsCartActive] = useState(false);
  const contentsSoldOutGuideText = getContentsSoldOutGuideText({
    contentType,
    isSoldOut,
    soldOutText,
  });

  const handleClickCart = () => {
    amplitudeService.logEvent(
      new SelectPurchase({
        productDetailState,
        defaultContentId,
        fusionQueryId: getFusionQueryId(queryId),
        isReferrerReviewDetail,
        referrerEventName: amplitudeService.bucket?.referrerEventName,
      }),
    );

    sendAmplitudeProductViewSelection({
      productDetailState: {
        no,
        name,
        isGroupProduct,
        deliveryTypeNames,
        sellerName,
        isGiftable,
      },
      defaultContentId,
      queryId: getFusionQueryId(queryId),
      isReferrerReviewDetail,
    });

    setIsCartActive(true);
  };

  const handleClickCloseSelectModal = () => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
    setIsCartActive(false);
  };

  useEffect(() => {
    const sword = getSword();

    setSearchKeyword(sword);
  }, []);

  return (
    <>
      <ButtonGroup isCartActive={isCartActive}>
        <LikeButton isReferrerReviewDetail={isReferrerReviewDetail} />
        <Button className="cart-button" text="구매하기" onClick={() => handleClickCart()} />
      </ButtonGroup>
      <SlideModal open={isCartActive} onClose={handleClickCloseSelectModal}>
        <CartOptionModal
          contentNo={no}
          mainImageUrl={mainImageUrl}
          name={name}
          shortDescription={shortDescription}
          dealProducts={dealProducts}
          minEa={minEa}
          isDirectOrder={isDirectOrder}
          isSoldOut={isSoldOut}
          isPurchaseStatus={isPurchaseStatus}
          contentsSoldOutGuideText={contentsSoldOutGuideText}
          isDiscountProduct={!!discountedPrice}
          directOrderType={directOrderType}
          disabledBuyButton={disabledBuyButton}
          buyProduct={buyProduct}
          contentType={contentType}
        />
      </SlideModal>
    </>
  );
}
