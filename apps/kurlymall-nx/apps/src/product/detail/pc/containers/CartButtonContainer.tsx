import { useCallback, useEffect, useState } from 'react';

import Button from '../../../../shared/components/Button/Button';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectPurchase } from '../../../../shared/amplitude/events/product/SelectPurchase';
import { getFusionQueryId } from '../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../shared/store';
import useProductBuy from '../../hooks/useProductBuy';
import type { ContentType } from '../../types';
import type { DeliveryInfoName } from '../../../types';
import { getSword } from '../../../../search/shared/utils/getSword';

interface EventSelectPurchaseProps {
  no: number;
  name: string;
  contentType: ContentType;
  isGroupProduct: boolean;
  deliveryTypeNames: DeliveryInfoName[];
  sellerName: string;
  retailPrice: number | null;
  basePrice: number;
  discountedPrice: number | null;
  isSoldOut: boolean;
  defaultContentId: number;
  queryId: string | null;
}
const eventSelectPurchase = ({
  no,
  name,
  contentType,
  isGroupProduct,
  deliveryTypeNames,
  sellerName,
  retailPrice,
  basePrice,
  discountedPrice,
  isSoldOut,
  defaultContentId,
  queryId,
}: EventSelectPurchaseProps) => {
  amplitudeService.logEvent(
    new SelectPurchase({
      productDetailState: {
        no,
        name,
        contentType,
        isGroupProduct,
        deliveryTypeNames,
        sellerName,
        retailPrice,
        basePrice,
        discountedPrice,
        isSoldOut,
      },
      defaultContentId,
      fusionQueryId: getFusionQueryId(queryId),
    }),
  );
};

export default function CartButtonContainer() {
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);
  const {
    no,
    name,
    contentType,
    isGroupProduct,
    deliveryTypeNames,
    sellerName,
    retailPrice,
    basePrice,
    discountedPrice,
    defaultContentId,
    isDirectOrder,
    isSoldOut,
    isPurchaseStatus,
  } = productDetailState;
  const [searchKeyword, setSearchKeyword] = useState('');

  const { buyText, buyProduct, disabledBuyButton } = useProductBuy({
    isDirectOrder,
    isSoldOut,
    isPurchaseStatus,
    searchKeyword,
    productDetailState,
  });

  const handleClickCartButton = useCallback(async () => {
    eventSelectPurchase({
      no,
      name,
      contentType,
      isGroupProduct,
      deliveryTypeNames,
      sellerName,
      retailPrice,
      basePrice,
      discountedPrice,
      isSoldOut,
      defaultContentId,
      queryId,
    });
    await buyProduct();
  }, [
    basePrice,
    buyProduct,
    contentType,
    defaultContentId,
    deliveryTypeNames,
    discountedPrice,
    isGroupProduct,
    isSoldOut,
    name,
    no,
    queryId,
    retailPrice,
    sellerName,
  ]);

  useEffect(() => {
    const sword = getSword();
    setSearchKeyword(sword);
  }, []);

  return (
    <Button
      text={buyText}
      className="cart-button"
      radius={3}
      onClick={handleClickCartButton}
      disabled={disabledBuyButton}
    />
  );
}
