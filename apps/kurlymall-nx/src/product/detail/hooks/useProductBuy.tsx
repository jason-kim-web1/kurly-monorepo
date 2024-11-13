import { useEffect, useState } from 'react';
import { head, isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

import { redirectTo, showAlert } from '../../../shared/reducers/page';
import { useAppSelector } from '../../../shared/store';
import useCartItems from '../../../shared/components/Cart/hook/useCartItems';
import useSearchLocation from './useSearchLocation';
import { isPC } from '../../../../util/window/getDevice';
import { CART_PATH, COMMON_PATH, getPageUrl } from '../../../shared/constant';
import type { ShortCutType } from '../../../shared/types';
import { DealProduct } from '../types';

import Alert from '../../../shared/components/Alert/Alert';
import { ProductDetailState } from '../slice';
import { AddToCartProduct } from '../../../shared/amplitude/events/product/AddToCartProduct';
import { AddToCartSuccess } from '../../../shared/amplitude/events/product/AddToCartSuccess';
import { amplitudeService } from '../../../shared/amplitude';
import { storeCartCounter } from '../../../cart/shared/services/cart-counter.storage.service';
import { AddToCartFail } from '../../../shared/amplitude/events/product/AddToCartFail';
import { branchService } from '../../../shared/branch';
import { AddToCart } from '../../../shared/branch/events';
import { getFusionQueryId } from '../shared/utils/productDetailEvent';
import Confirm, { closeConfirm } from '../../../shared/components/Alert/Confirm';
import { SHORTCUT_TYPE } from '../../../shared/constant/shortcut-type';
import { ignoreError } from '../../../shared/utils/general';
import { fusionSignalsService } from '../../../shared/fusion-signals/FusionSignalsService';
import { FUSION_SIGNALS_EVENT } from '../../../shared/fusion-signals/fusionSignalsType';
import { PriceService } from '../../service/priceService';
import { DeliveryTimeType } from '../../../shared/interfaces/ShippingAddress';
import useCartRefreshQuery from '../../../order/cart/queries/useCartRefreshQuery';
import { submitToCheckout } from '../../../order/cart/store/cart';
import { ProceedToCheckoutRequest } from '../../../order/cart/api/postProceedToCheckout';
import { assertDisabledAddToCartByMembershipDeals } from '../../service/verifyMembershipOnlyProductByDeal';
import { logPixelAddToCart } from '../../../shared/utils/logPixelAddToCart';

interface EventAddToCartProductProps {
  productDetailState: ProductDetailState;
  defaultContentId: number;
  selectedProducts: DealProduct[];
  totalPrice: number;
  totalBasePrice: number;
  totalRetailPrice: number;
  fusionQueryId: string | null;
  isReferrerReviewDetail?: boolean;
  selectionType?: ShortCutType;
  isShortcutButton?: boolean;
  searchKeyword: string;
  referrerProductName?: string;
  referrerProductNo?: number;
}

const eventAddToCartProduct = async ({
  productDetailState,
  defaultContentId,
  selectedProducts,
  totalPrice,
  totalBasePrice,
  totalRetailPrice,
  fusionQueryId,
  isReferrerReviewDetail,
  selectionType,
  isShortcutButton,
  searchKeyword,
  referrerProductNo,
  referrerProductName,
}: EventAddToCartProductProps) => {
  selectedProducts.forEach((it) => {
    branchService.logEvent(
      new AddToCart([
        {
          $canonical_identifier: `product/${productDetailState.no}`,
          $sku: productDetailState.no,
          $price: it.discountedPrice || it.basePrice,
          $quantity: it.quantity,
          $currency: 'KRW',
          $product_name: productDetailState.name,
        },
      ]),
    );
    amplitudeService.logEvent(
      new AddToCartProduct({
        product: productDetailState,
        defaultContentId: defaultContentId,
        dealProduct: it,
        totalPrice,
        totalBasePrice,
        totalRetailPrice,
        fusionQueryId,
        isReferrerReviewDetail,
        ...(isShortcutButton && { selectionType }),
        referrerEventName: amplitudeService.bucket?.referrerEventName,
        searchKeyword,
        referrerProductNo,
        referrerProductName,
      }),
    );
  });
};

interface Props {
  isSoldOut: boolean;
  isDirectOrder: boolean;
  isPurchaseStatus: boolean;
  isReferrerReviewDetail?: boolean;
  isShortcutButton?: boolean;
  searchKeyword: string;
  productDetailState: ProductDetailState;
  referrerProductName?: string;
  referrerProductNo?: number;
}

export default function useProductBuy({
  isSoldOut,
  isDirectOrder,
  isPurchaseStatus,
  isReferrerReviewDetail,
  isShortcutButton = false,
  searchKeyword,
  productDetailState,
  referrerProductNo,
  referrerProductName,
}: Props) {
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const { data: cartItems } = useCartRefreshQuery();
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const { currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);
  const { defaultContentId, no, name, maxEa, minEa, mainImageUrl, dealProducts } = productDetailState;
  const selectedProducts = dealProducts.filter((it) => it.quantity > 0);
  const totalPrice = selectedProducts.reduce((prev, curr) => {
    const { retailPrice, basePrice, discountedPrice } = curr;
    const { representativePrice } = new PriceService({
      retailPrice,
      basePrice,
      discountedPrice,
    });
    return prev + curr.quantity * representativePrice;
  }, 0);
  const totalBasePrice = selectedProducts.reduce((pre, curr) => pre + curr.quantity * curr.basePrice, 0);
  const totalRetailPrice = selectedProducts.reduce((pre, curr) => pre + curr.quantity * (curr.retailPrice ?? 0), 0);
  const selectedDealTotalCount = selectedProducts.reduce((pre, curr) => pre + curr.quantity, 0);
  const [buyText, setBuyText] = useState('장바구니 담기');
  const { searchUserLocation } = useSearchLocation();
  const { addToBasket } = useCartItems();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPC && (isSoldOut || !isPurchaseStatus)) {
      setBuyText('상품준비중입니다');
      return;
    }

    if (isDirectOrder) {
      setBuyText('바로구매');
      return;
    }

    setBuyText('장바구니 담기');
  }, [isSoldOut, isPurchaseStatus, isDirectOrder]);

  const getInvalidQuantityMessage = (): string | null => {
    if (!head(selectedProducts)) {
      return '주문하실 상품을 선택해주세요.';
    }

    const totalQuantity = selectedProducts.reduce((prev, curr) => prev + curr.quantity, 0);

    if (minEa > totalQuantity) {
      return `${name} 상품의 최소 구매 수량은 ${minEa}개 입니다.`;
    }

    if (maxEa < totalQuantity) {
      return `${name} 상품의 최대 구매 수량은 ${maxEa}개 입니다.`;
    }

    return null;
  };

  // 장바구니 담기 이벤트 로깅
  const postAddToCartEvent = async () => {
    const fusionQueryId = getFusionQueryId(queryId);
    await eventAddToCartProduct({
      productDetailState,
      defaultContentId,
      selectedProducts,
      totalPrice,
      totalBasePrice,
      totalRetailPrice,
      fusionQueryId,
      isReferrerReviewDetail,
      isShortcutButton,
      selectionType: SHORTCUT_TYPE.CART,
      searchKeyword,
      referrerProductNo,
      referrerProductName,
    });
    amplitudeService.logEvent(
      new AddToCartSuccess({
        productDetailState,
        defaultContentId,
        totalPrice,
        totalBasePrice,
        totalRetailPrice,
        selectedDealTotalCount,
        fusionQueryId,
        isReferrerReviewDetail,
        ...(isShortcutButton && { selectionType: SHORTCUT_TYPE.CART }),
        referrerEventName: amplitudeService.bucket?.referrerEventName,
        referrerProductNo,
        referrerProductName,
      }),
    );

    ignoreError(() => {
      fusionSignalsService.logEvent({
        type: FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART,
        docId: no,
        label: name,
      });

      logPixelAddToCart(selectedProducts);
    });
  };

  // 장바구니 담기 완료 메세지
  const getToCartMessage = () => {
    const selectedProductsNo: number[] = selectedProducts.map(({ no: productNo }) => productNo);
    const isAlreadyAdded = cartItems.some(({ dealProductNo }) => selectedProductsNo.includes(dealProductNo));

    return isAlreadyAdded
      ? '장바구니에 상품을 담았습니다.\n이미 담은 상품의 수량을 추가했습니다.'
      : '장바구니에 상품을 담았습니다.';
  };

  // 장바구니 담기
  const addToCart = async () => {
    const invalidQuantityMessage = getInvalidQuantityMessage();

    try {
      if (invalidQuantityMessage) {
        throw Error(invalidQuantityMessage);
      }

      const panelOption = {
        representativeItem: {
          imageUrl: mainImageUrl,
          name: selectedProducts[0].name,
        },
        isOpenPanel: true,
      };

      const items = selectedProducts.map((it) => ({
        dealProductNo: it.no,
        quantity: it.quantity,
      }));

      await addToBasket({
        cartItems: items,
        panelOption,
      });

      await postAddToCartEvent();

      if (!isPC) {
        Confirm({
          text: getToCartMessage(),
          leftButtonText: '장바구니 확인',
          rightButtonText: '계속 쇼핑하기',
          showRightButton: true,
          onClickLeftButton: () => dispatch(redirectTo({ url: getPageUrl(CART_PATH.cart) })),
          onClickRightButton: () => closeConfirm(),
        });
      }
    } catch (err) {
      amplitudeService.logEvent(
        new AddToCartFail({
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );

      dispatch(
        showAlert({
          title: '알림',
          message: err.message,
        }),
      );
    }
  };

  // 바로구매
  const addToCheckout = async () => {
    const targetProducts = selectedProducts.map((it) => ({
      dealProductNo: it.no,
      quantity: it.quantity,
    }));

    if (isEmpty(targetProducts)) {
      Alert({
        title: '알림',
        text: '주문하실 상품을 선택해주세요.',
      });
      return;
    }

    const roadAddress = currentAddress?.roadAddress;
    const params: ProceedToCheckoutRequest = {
      dealProducts: targetProducts,
      address: roadAddress || '',
      addressDetail: currentAddress?.addressDetail,
      deliveryPolicy: currentAddress?.deliveryType === 'direct' ? DeliveryTimeType.DAWN : DeliveryTimeType.DAY,
      isDirectCheckout: true,
      showKurlyMembersPopupMessage: true,
    };

    if (isGuest) {
      storeCartCounter(params);
      dispatch(
        redirectTo({
          url: getPageUrl(COMMON_PATH.login),
          query: {
            internalUrl: getPageUrl(CART_PATH.counter),
          },
        }),
      );
      return;
    }

    const hasAddress = !!roadAddress;
    if (!hasAddress) {
      searchUserLocation();
      return;
    }

    dispatch(submitToCheckout(params));

    const fusionQueryId = getFusionQueryId(queryId);

    await eventAddToCartProduct({
      productDetailState,
      defaultContentId,
      selectedProducts,
      totalPrice,
      totalBasePrice,
      totalRetailPrice,
      fusionQueryId,
      isShortcutButton,
      selectionType: SHORTCUT_TYPE.PURCHASE,
      searchKeyword,
      referrerProductNo,
      referrerProductName,
    });
    amplitudeService.logEvent(
      new AddToCartSuccess({
        productDetailState,
        defaultContentId,
        totalPrice,
        totalBasePrice,
        totalRetailPrice,
        selectedDealTotalCount,
        fusionQueryId,
        ...(isShortcutButton && { selectionType: SHORTCUT_TYPE.PURCHASE }),
        referrerEventName: amplitudeService.bucket?.referrerEventName,
        referrerProductNo,
        referrerProductName,
      }),
    );

    ignoreError(() => {
      fusionSignalsService.logEvent({
        type: FUSION_SIGNALS_EVENT.CLICK_BUY_DIRECT,
        docId: no,
        label: name,
      });
    });
  };

  const buyProduct = async () => {
    if (isSoldOut) {
      return;
    }

    if (isDirectOrder) {
      await addToCheckout();
      return;
    }

    await addToCart();
  };

  const hasMembersDeal = assertDisabledAddToCartByMembershipDeals(selectedProducts);
  const disabledBuyButton = isSoldOut || !isPurchaseStatus || hasMembersDeal;

  return { buyText, buyProduct, disabledBuyButton };
}
