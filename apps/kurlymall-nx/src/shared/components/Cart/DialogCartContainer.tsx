import styled from '@emotion/styled';

import { map } from 'lodash';

import { useEffect } from 'react';

import type { ContentsProduct } from '../../../mypage/order/shared/interfaces';
import DialogCartItem from './DialogCartItem';
import DialogCartTotal from './DialogCartTotal';
import DialogCartButtons from './DialogCartButtons';

import useCartAddProduct from './hook/useCartAddProduct';

import COLOR from '../../constant/colorset';

import { amplitudeService } from '../../amplitude';
import { ProductAddToCart, ProductAddToCartFail, ProductAddToCartSuccess } from '../../amplitude/events';
import { branchService } from '../../branch';
import { AddToCart } from '../../branch/events';
import { SHORTCUT_TYPE } from '../../constant/shortcut-type';
import type { DeliveryInfoName } from '../../../product/types';
import NextImage from '../NextImage';
import { multiMaxLineText } from '../../utils';
import { ignoreError } from '../../utils/general';
import { fusionSignalsService } from '../../fusion-signals/FusionSignalsService';
import { FUSION_SIGNALS_EVENT } from '../../fusion-signals/fusionSignalsType';

const DialogCartTitle = styled.div`
  display: flex;
  padding: 5px 0 12px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ImageWrapper = styled.div`
  flex: 0 0 50px;
  overflow: hidden;
  position: relative;
  height: 50px;
  margin-right: 14px;
  border-radius: 3px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-top: 2px;
  word-break: break-all;
`;

const NameInner = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  ${multiMaxLineText(3)}
`;

const DialogCartList = styled.div`
  overflow: hidden;
  overflow-y: auto;
  max-height: 355px;
`;

const DialogPaymentWrapper = styled.div`
  padding: 14px 0 23px;
`;

interface Props {
  productData: ContentsProduct;
  queryId?: string;
  deliveryTypeNames?: DeliveryInfoName[];
  onHandleClose(): void;
  onChangeSoldOutStatus?(): void;
}

export default function DialogCartContainer({
  productData,
  queryId,
  deliveryTypeNames,
  onHandleClose,
  onChangeSoldOutStatus,
}: Props) {
  const { no: contentNo, minEa, maxEa, originalImageUrl, name, dealProducts, legacyPromotion } = productData;

  const normalProductsInDealProduct = dealProducts.filter((it) => !it.isGiftable);

  const { changeBuyUnit, inCart, totalCount, totalPrice } = useCartAddProduct(
    contentNo,
    normalProductsInDealProduct,
    legacyPromotion,
  );

  const isMultiProduct = normalProductsInDealProduct.length > 1;
  const startQuantity = isMultiProduct ? 0 : normalProductsInDealProduct[0].minEa;

  const handleAddToCart = (isSuccess: boolean, failMessage?: string) => {
    if (!inCart) {
      return;
    }

    if (!isSuccess && failMessage) {
      amplitudeService.logEvent(new ProductAddToCartFail({ message: failMessage }));
      return;
    }

    const deliveryName = deliveryTypeNames ? deliveryTypeNames : [];

    const cartItems = map(
      inCart,
      ({
        basePrice,
        buyUnit,
        discountedPrice,
        isGiftable,
        masterProductCode,
        masterProductName,
        name: productName,
        no,
        retailPrice,
      }) => {
        return {
          basePrice,
          buyUnit,
          discountedPrice,
          isGiftable,
          masterProductCode,
          masterProductName,
          name: productName,
          no,
          retailPrice,
        };
      },
    );

    cartItems.forEach((item) => {
      amplitudeService.logEvent(
        new ProductAddToCart({
          productData,
          item,
          deliveryTypeNames: deliveryName,
          queryId,
          selectionType: SHORTCUT_TYPE.CART,
          referrerEventName: amplitudeService.bucket?.referrerEventName,
        }),
      );

      branchService.logEvent(
        new AddToCart([
          {
            $canonical_identifier: `product/${productData.no}`,
            $sku: productData.no,
            $price: item.discountedPrice || item.basePrice,
            $quantity: item.buyUnit,
            $currency: 'KRW',
            $product_name: productData.name,
          },
        ]),
      );
    });

    amplitudeService.logEvent(
      new ProductAddToCartSuccess({
        productData,
        cartItems,
        deliveryTypeNames: deliveryName,
        queryId,
        selectionType: SHORTCUT_TYPE.CART,
        referrerEventName: amplitudeService.bucket?.referrerEventName,
      }),
    );

    ignoreError(() => {
      fusionSignalsService.logEvent({
        type: FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART,
        docId: contentNo,
        label: name,
      });
    });
  };

  useEffect(() => {
    if (!isMultiProduct) {
      changeBuyUnit(normalProductsInDealProduct[0]?.no)(startQuantity);
    }
  }, [isMultiProduct, startQuantity]);

  return (
    <>
      <DialogCartTitle>
        <ImageWrapper>
          <NextImage src={originalImageUrl ?? originalImageUrl} alt="상품 이미지" layout="fill" objectFit="cover" />
        </ImageWrapper>
        <Name>
          <NameInner>{name}</NameInner>
        </Name>
      </DialogCartTitle>
      <DialogCartList>
        {normalProductsInDealProduct.map((dealProduct) => (
          <DialogCartItem
            key={dealProduct.no}
            deal={dealProduct}
            onChangeBuyUnit={changeBuyUnit}
            quantity={!inCart[dealProduct.no] ? startQuantity : inCart[dealProduct.no].buyUnit}
            isMultiProduct={isMultiProduct}
          />
        ))}
      </DialogCartList>
      <DialogPaymentWrapper>
        <DialogCartTotal totalPrice={totalPrice} />
      </DialogPaymentWrapper>
      <DialogCartButtons
        cart={inCart}
        onHandleClose={onHandleClose}
        contentsMinEa={minEa}
        contentsMaxEa={maxEa}
        totalCount={totalCount}
        imageUrl={originalImageUrl}
        contentsName={name}
        addToCart={handleAddToCart}
        onChangeSoldOutStatus={onChangeSoldOutStatus}
      />
    </>
  );
}
