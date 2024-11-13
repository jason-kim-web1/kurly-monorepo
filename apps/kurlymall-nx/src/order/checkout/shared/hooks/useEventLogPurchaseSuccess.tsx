import { useCallback, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import ReactGA from 'react-ga4';

import { head, isEmpty } from 'lodash';

import { InitiatePurchase, Purchase, PurchaseGAContentItem } from '../../../../shared/branch/events';

import { AppState, useAppSelector } from '../../../../shared/store';
import { ParsedUrlQuery } from 'querystring';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { PurchaseProduct, PurchaseSuccess } from '../../../../shared/amplitude/events';
import { branchService } from '../../../../shared/branch';
import { AmplitudePaymentMethods } from '../../../shared/shared/interfaces/OrderVendorCode.interface';
import { PaymentCompletedDealProducts } from '../../../../shared/interfaces';
import { extractAuthentication } from '../../../../shared/utils/token';
import appService from '../../../../shared/services/app.service';
import { isWebview } from '../../../../../util/window/getDevice';
import { setValue } from '../../../shared/shared/reducers/payments.slice';
import { isNotNull } from '../../../../shared/utils/lodash-extends';
import Pixel from '../../../../shared/pixel/PixelService';
import { PIXEL_EVENT_TITLE } from '../../../../shared/pixel/constants/pixelEventTitle';
import { ignoreError } from '../../../../shared/utils/general';
import { DELIVERY_POLICIES } from '../../../cart/constants/CartDeliveryType';

interface PriceResponse {
  totalRetailPrice: number;
  totalBasePrice: number;
  productDiscountAmount: number;
}

const GA_DEAL_PRICE_CALCULATED_VALUE = 0.000001;

export default function useEventLogPurchaseSuccess() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    postedLogEvent,
    paymentsResult: {
      isFirstOrder,
      totalPrice,
      paymentGatewayId,
      orderDealProducts,
      deliveryPrice,
      totalCouponDiscountPrice,
      totalUsedPoint,
      couponCode,
      couponName,
      isGiftPurchase,
      joinOrderMeta,
    },
  } = useAppSelector(({ payments }) => payments);
  const accessToken = useSelector(({ auth }: AppState) => auth.accessToken);

  const { orderNo } = router.query as ParsedUrlQuery & {
    orderNo: string;
  };

  const deliveryType = useMemo(() => {
    const firstDeliveryType = head(orderDealProducts)?.deliveryPolicy;
    if (!firstDeliveryType) {
      return null;
    }

    const isCombinedOrder = orderDealProducts.some(({ deliveryPolicy }) => deliveryPolicy !== firstDeliveryType);

    return isCombinedOrder ? DELIVERY_POLICIES.COMBINED_ORDER : DELIVERY_POLICIES[firstDeliveryType];
  }, [orderDealProducts]);

  // Pixel 이벤트
  const logEventPixelPurchase = useCallback(() => {
    const contentIds = orderDealProducts.map(({ contentsProductNo }) => contentsProductNo);
    const numItems = orderDealProducts.reduce((acc, { quantity }) => acc + quantity, 0);
    const totalValue = orderDealProducts.reduce((acc, { quantity, productPrice }) => acc + quantity * productPrice, 0);

    ignoreError(() =>
      Pixel.logEvent(PIXEL_EVENT_TITLE.PURCHASE, {
        content_ids: contentIds,
        content_type: 'product',
        contents: orderDealProducts.map(({ dealProductNo: id, quantity, dealProductName: content_name }) => ({
          id,
          quantity,
          content_name,
        })),
        currency: 'KRW',
        num_items: numItems,
        value: totalValue,
      }),
    );
  }, [orderDealProducts]);

  // Amplitude : 스크린 이벤트
  const postScreenNameEvent = () => {
    if (isFirstOrder) {
      amplitudeService.setScreenName(ScreenName.FIRST_PAYMENT_SUCCESS);
      return;
    }

    if (isNotNull(joinOrderMeta)) {
      amplitudeService.setScreenName(ScreenName.PURCHASE_TOGETHER_SUCCESS);
      return;
    }

    amplitudeService.setScreenName(ScreenName.PAYMENT_SUCCESS);
  };

  // Branch : 구매 이벤트
  const postPurchaseEvent = ({
    firstOrder,
    eventData,
    products,
  }: {
    firstOrder: boolean;
    eventData: {
      transaction_id: string;
      revenue: number;
      shipping: number;
      coupon: string | null;
      currency: string;
    };
    products: PaymentCompletedDealProducts[];
  }) => {
    const contentItem = products.map((product) => ({
      $price: product.productPrice,
      $quantity: product.quantity,
      $currency: 'KRW',
      $sku: product.contentsProductNo,
      $product_name: product.contentsProductName,
    }));

    branchService.logEvent(
      firstOrder ? new InitiatePurchase(eventData, contentItem) : new Purchase(eventData, contentItem),
    );
  };

  // Amplitude : 상품 구매 이벤트
  const postPurchaseProductEvent = useCallback((params) => {
    amplitudeService.logEvent(new PurchaseProduct(params));
  }, []);

  // Amplitude : 구매 성공 이벤트
  const postPurchaseSuccessEvent = useCallback((params) => {
    amplitudeService.logEvent(new PurchaseSuccess(params));
  }, []);

  // GA : 구매 성공 이벤트
  const postGAEvent = useCallback((params) => {
    if (isEmpty(params.items)) {
      return;
    }

    if (isWebview()) {
      appService.analyticsSendGAEvent({
        optionsOrName: 'purchase',
        params,
      });
      return;
    }

    ReactGA.event('purchase', params);
  }, []);

  const getPrice = (products: PaymentCompletedDealProducts[]): PriceResponse => {
    return products.reduce(
      (acc, { quantity, retailPrice, productPrice, discountPrice }) => ({
        totalRetailPrice: acc.totalRetailPrice + quantity * retailPrice,
        totalBasePrice: acc.totalBasePrice + quantity * productPrice,
        productDiscountAmount: acc.productDiscountAmount + quantity * discountPrice,
      }),
      {
        totalRetailPrice: 0,
        totalBasePrice: 0,
        productDiscountAmount: 0,
      },
    );
  };

  // 이벤트 로깅
  const postLogEvent = useCallback(() => {
    const gaContentItem: PurchaseGAContentItem[] = [];

    postScreenNameEvent();

    orderDealProducts.forEach((product: PaymentCompletedDealProducts) => {
      const dealProductPrice =
        product.discountPrice === 0 ? product.productPrice : product.productPrice - product.discountPrice;

      postPurchaseProductEvent({
        contentId: product.contentsProductNo,
        contentName: product.contentsProductName,
        dealId: product.dealProductNo,
        dealName: product.dealProductName,
        masterId: product.masterProductCode,
        deliveryType: DELIVERY_POLICIES[product.deliveryPolicy],
        retailPrice: product.retailPrice === 0 ? null : product.retailPrice,
        basePrice: product.productPrice,
        price: dealProductPrice,
        totalRetailPrice: product.retailPrice === 0 ? null : product.quantity * product.retailPrice,
        totalBasePrice: product.quantity * product.productPrice,
        totalPrice: product.quantity * dealProductPrice,
        transactionId: orderNo,
        isGiftPurchase,
        isFirstPurchase: isFirstOrder,
        quantity: product.quantity,
        referrerEvent: amplitudeService.getWebviewReferrerEvent(),
      });

      gaContentItem.push({
        item_id: String(product.contentsProductNo),
        item_name: product.contentsProductName,
        price: dealProductPrice * GA_DEAL_PRICE_CALCULATED_VALUE * product.quantity,
        quantity: product.quantity,
        currency: 'KRW',
      });
    });

    postPurchaseEvent({
      firstOrder: isFirstOrder,
      eventData: {
        transaction_id: orderNo,
        revenue: totalPrice,
        shipping: deliveryPrice,
        coupon: couponName,
        currency: 'KRW',
      },
      products: orderDealProducts,
    });

    const price = getPrice(orderDealProducts);
    postPurchaseSuccessEvent({
      totalRetailPrice: price.totalRetailPrice === 0 ? null : price.totalRetailPrice,
      totalBasePrice: price.totalBasePrice,
      totalPrice,
      deliveryType,
      orderNumber: orderNo,
      isGiftPurchase,
      isFirstOrder,
      paymentMethod: AmplitudePaymentMethods[paymentGatewayId] ?? '',
      skuCount: orderDealProducts.length,
      deliveryCharge: deliveryPrice,
      productDiscountAmount: price.productDiscountAmount,
      couponDiscountAmount: totalCouponDiscountPrice,
      pointDiscountAmount: totalUsedPoint,
      couponId: couponCode,
      couponName: couponName,
      joinOrderMeta,
    });

    postGAEvent({
      is_first_purchase: isFirstOrder.toString(),
      value: totalPrice,
      transaction_id: orderNo,
      coupon: couponName || null,
      shipping: deliveryPrice,
      currency: 'KRW',
      items: gaContentItem,
    });
  }, [isFirstOrder, totalPrice, postPurchaseProductEvent, postPurchaseSuccessEvent, postGAEvent]);

  useEffect(() => {
    if (!orderNo || !accessToken || isEmpty(orderDealProducts) || postedLogEvent) {
      return;
    }

    const { uid } = extractAuthentication(accessToken);

    branchService.setAccessToken(accessToken);
    amplitudeService.setUserId(uid);
    postLogEvent();
    logEventPixelPurchase();

    dispatch(
      setValue({
        postedLogEvent: true,
      }),
    );
  }, [accessToken, dispatch, logEventPixelPurchase, orderDealProducts, orderNo, postLogEvent, postedLogEvent]);
}
