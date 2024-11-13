import { createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { AppThunk } from '../../../../shared/store';
import { placeOrder, placeGiftOrder, paymentComplete, giftPaymentComplete } from '../services/payments.service';
import { redirectTo } from '../../../../shared/reducers/page';
import orderResult from '../utils/orderResult';
import {
  CompleteOrderProps,
  PaymentErrorResponse,
  FailOrderWithSetMessage,
  LoadOrderProps,
  PaymentsResult,
} from '../../../../shared/interfaces';

import { getOrderParams } from '../utils/getOrderParams';
import { CardVendorCode } from '../../../../shared/constant';

import { checkPaymentGatewayResult } from '../utils/checkPaymentGatewayResult';
import { deletePreferenceMethods, updatePreferenceMethods } from '../../../../shared/api';
import { isUseAllCoupon } from '../utils/isUseAllCoupon';
import { amplitudeService } from '../../../../shared/amplitude';
import { CheckoutSuccess } from '../../../../shared/amplitude/events';
import { isViewPackagePaymentResult } from '../../../checkout/shared/utils';
import { getAmplitudePaymentMethod } from '../../../checkout/shared/utils/getAmplitudePaymentMethod';

import { VendorCode } from '../interfaces';
import { Notification } from '../../../gift/shared/interfaces/ReceiverForm.interface';
import { handlePlaceOrderError } from '../../../checkout/shared/reducers/checkoutErrors';
import { setPaymentButtonLoading } from '../../../checkout/shared/reducers/checkout.slice';
import { getShowPGFailMessage } from '../utils/getShowPGFailMessage';
import { ReceiverInfo } from '../../../checkout/shared/interfaces';

export interface PaymentsState {
  // PG 결제 처리 중 로딩 처리
  isPaymentsLoading: boolean;
  // 주문 완료 이벤트 전송 여부
  postedLogEvent: boolean;
  // PG사 URL
  paymentGatewayUrl: string | null;
  // 결제 결과 상세
  paymentsResult: PaymentsResult;
}

export const initialState: PaymentsState = {
  isPaymentsLoading: false,
  postedLogEvent: false,
  paymentGatewayUrl: null,
  paymentsResult: {
    name: '',
    address: '',
    addressDetail: '',
    reason: '',
    resultCode: 0,
    isFirstOrder: false,
    totalPrice: 0,
    expectedPoint: 0,
    benefitPercent: 0,
    reusablePackageType: 'PAPER',
    displayMessages: [],
    paymentGatewayId: 'toss-payments',
    deliveryPrice: 0,
    totalCouponDiscountPrice: 0,
    totalUsedPoint: 0,
    couponCode: null,
    couponName: null,
    orderDealProducts: [],
    isGiftPurchase: false,
    isViewPackage: undefined,
    notificationType: Notification.KAKAO_TALK,
    recipientName: '',
    orderedDate: '',
    availableDate: '',
    externalGroupOrderNo: '',
    memberships: [],
    isKurlypayPlccMember: false,
    isDeliveryOrder: false,
    joinOrderMeta: null,
  },
};

const { actions, reducer } = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    resetPaymentsState: () => ({ ...initialState }),
    setValue: (state, { payload }) => ({ ...state, ...payload }),
    setPaymentGatewayUrl(state, { payload }: { payload: string | null }) {
      state.paymentGatewayUrl = payload;
    },
  },
});

export const { resetPaymentsState, setValue, setPaymentGatewayUrl } = actions;

// 주문 시작 후 PG 페이지로 이동 (웹뷰에서도 사용) - 주문서 & 선물하기
export const loadOrder =
  (loadOrderProps: LoadOrderProps): AppThunk =>
  (dispatch) => {
    dispatch(redirectTo(getOrderParams(loadOrderProps)));
  };

const setPreferenceMethods = async ({
  isPreferencePayment,
  isUseAllPoint,
  selectedVendorCode,
  selectedCreditCardValue,
}: {
  isPreferencePayment: boolean;
  isUseAllPoint: boolean;
  selectedVendorCode: VendorCode;
  selectedCreditCardValue?: CardVendorCode;
}) => {
  if (!isPreferencePayment) {
    await deletePreferenceMethods();
  } else if (!isUseAllPoint) {
    await updatePreferenceMethods({
      paymentGatewayId: selectedVendorCode,
      tossPaymentsCreditCardCompanyId: selectedCreditCardValue,
      creditCardCompanyId: selectedCreditCardValue,
    });
  }
};

// 주문 시작 - 주문서 & 함께구매
export const submitCheckoutOrder = (): AppThunk => async (dispatch, getState) => {
  const { checkout, checkoutPayment, checkoutCoupon, payments } = getState();

  const {
    deviceId,
    receiverForm,
    selectedPickupPlace,
    pickupPeriod,
    usedPoint,
    reusablePackage,
    isUseAllPoint,
    isDirectCheckout,
    price,
    isLuckyBoxOrder,
    joinOrder,
    personalCustomsCode,
  } = checkout;

  const {
    selectedVendor,
    selectedInstallment,
    selectedCreditCard,
    selectedCardPoint,
    isPreferencePayment,
    selectedKurlypayVendor,
    plccDiscountPrice,
    selectedPlccPoint,
    kurlypayInstallment,
  } = checkoutPayment;

  const { selectedCoupon } = checkoutCoupon;

  if (payments.isPaymentsLoading || !selectedVendor) {
    return;
  }

  const isJoinOrder = !!joinOrder;
  const kurlypayPaymentType = selectedKurlypayVendor?.paymentType;
  const kurlypayPaymentMethodId = selectedKurlypayVendor?.paymentMethodId;
  const kurlypayCreditCard = selectedKurlypayVendor?.companyId;

  try {
    dispatch(setValue({ isPaymentsLoading: true }));

    setPreferenceMethods({
      isPreferencePayment,
      isUseAllPoint,
      selectedVendorCode: selectedVendor.code,
      selectedCreditCardValue: selectedCreditCard?.value,
    });

    // PG 를 통하지 않는 주문(전액 적립금 결제, 상품금액 전액 쿠폰+전액적립금 결제, 럭키박스 단건 주문)
    const hasKurly =
      isUseAllPoint ||
      (isUseAllCoupon(price) && price.paymentPrice === 0) ||
      (isLuckyBoxOrder && price.paymentPrice === 0);

    const selectedVendorCode = hasKurly ? 'kurly' : selectedVendor.code;
    const pickup =
      selectedPickupPlace && pickupPeriod ? { placeId: selectedPickupPlace.placeId, ...pickupPeriod } : null;

    const placeOrderResponse = await placeOrder({
      selectedVendorCode,
      receiverForm,
      selectedInstallment,
      selectedCreditCard,
      selectedCoupon,
      selectedCardPoint,
      usedPoint,
      reusablePackage,
      pickup,
      kurlypayPaymentType,
      kurlypayPaymentMethodId,
      kurlypayInstallment,
      kurlypayCreditCard,
      plccDiscountPrice: selectedPlccPoint ? plccDiscountPrice : 0,
      isJoinOrder,
      deviceId,
      personalCustomsCode,
    });

    dispatch(
      loadOrder({
        placeOrderResponse,
        selectedVendorCode,
        isJoinOrder,
      }),
    );

    amplitudeService.logEvent(
      new CheckoutSuccess({
        orderNumber: placeOrderResponse.groupOrderNo,
        isGiftPurchase: false,
        isDirectCheckout: !!isDirectCheckout,
        paymentMethod: getAmplitudePaymentMethod(
          selectedVendor,
          isUseAllPoint,
          kurlypayPaymentType,
          kurlypayCreditCard,
        ),
        referrerEvent: amplitudeService.getWebviewReferrerEvent(),
      }),
    );
  } catch (err) {
    dispatch(setPaymentButtonLoading(false));
    const typedError = err as Error;

    dispatch(handlePlaceOrderError({ err: typedError }));
  }

  dispatch(setValue({ isPaymentsLoading: false }));
};

// 주문 시작 - 선물하기
export const submitCheckoutGiftOrder =
  (receiverInfo?: ReceiverInfo): AppThunk =>
  async (dispatch, getState) => {
    const { checkout, checkoutPayment, checkoutCoupon, payments } = getState();

    const {
      deviceId,
      usedPoint,
      isUseAllPoint,
      isDirectCheckout,
      price,
      notificationType,
      recipientInfo,
      personalCustomsCode,
    } = checkout;

    const {
      selectedVendor,
      selectedInstallment,
      selectedCreditCard,
      selectedCardPoint,
      isPreferencePayment,
      selectedKurlypayVendor,
      selectedPlccPoint,
      plccDiscountPrice,
      kurlypayInstallment,
    } = checkoutPayment;

    const { selectedCoupon } = checkoutCoupon;

    if (payments.isPaymentsLoading || !selectedVendor || !receiverInfo) {
      return;
    }

    const kurlypayPaymentType = selectedKurlypayVendor?.paymentType;
    const kurlypayPaymentMethodId = selectedKurlypayVendor?.paymentMethodId;
    const kurlypayCreditCard = selectedKurlypayVendor?.companyId;

    try {
      dispatch(setValue({ isPaymentsLoading: true }));

      setPreferenceMethods({
        isPreferencePayment,
        isUseAllPoint,
        selectedVendorCode: selectedVendor.code,
        selectedCreditCardValue: selectedCreditCard?.value,
      });

      // PG 를 통하지 않는 주문(전액 적립금 결제, 상품금액 전액 쿠폰+전액적립금 결제)
      const hasKurly = isUseAllPoint || (isUseAllCoupon(price) && price.paymentPrice === 0) || price.paymentPrice === 0;
      const selectedVendorCode = hasKurly ? 'kurly' : selectedVendor.code;

      const placeOrderResponse = await placeGiftOrder({
        selectedVendorCode,
        receiverInfo,
        selectedInstallment,
        selectedCreditCard,
        selectedCoupon,
        selectedCardPoint,
        usedPoint,
        notificationType,
        recipientInfo,
        kurlypayPaymentType,
        kurlypayPaymentMethodId,
        kurlypayInstallment,
        kurlypayCreditCard,
        plccDiscountPrice: selectedPlccPoint ? plccDiscountPrice : 0,
        deviceId,
        personalCustomsCode,
      });

      dispatch(
        redirectTo(
          getOrderParams({
            placeOrderResponse,
            selectedVendorCode,
            isGiftOrder: true,
          }),
        ),
      );

      amplitudeService.logEvent(
        new CheckoutSuccess({
          orderNumber: placeOrderResponse.groupOrderNo,
          isGiftPurchase: true,
          isDirectCheckout: !!isDirectCheckout,
          paymentMethod: getAmplitudePaymentMethod(
            selectedVendor,
            isUseAllPoint,
            kurlypayPaymentType,
            kurlypayCreditCard,
          ),
          referrerEvent: amplitudeService.getWebviewReferrerEvent(),
        }),
      );
    } catch (err) {
      dispatch(setPaymentButtonLoading(false));
      const typedError = err as Error;
      dispatch(handlePlaceOrderError({ err: typedError }));
    }

    dispatch(setValue({ isPaymentsLoading: false }));
  };

// 주문 실패 - 주문 실패 처리 전에 주문 실패 페이지에서 메세지를 보여줄지 설정합니다.
export const failOrderWithSetMessage =
  ({
    groupOrderNo,
    paymentAllResult,
    paymentGatewayMessage,
    isGiftOrder = false,
    showPGFailMessage = false,
  }: FailOrderWithSetMessage): AppThunk =>
  (dispatch) => {
    if (showPGFailMessage) {
      dispatch(
        setValue({
          paymentsResult: {
            reason: paymentGatewayMessage,
          },
        }),
      );
    }

    orderResult().paymentsFail({
      paymentAllResult,
      groupOrderNo,
      isGiftOrder,
      message: paymentGatewayMessage,
    });
  };

// 주문 완료 - 주문서 & 선물하기 & 함께구매
export const completeOrder =
  ({
    groupOrderNo,
    selectedVendorCode,
    paymentAllResult,
    paymentGatewayResult,
    paymentGatewayMessage,
    paymentGatewayAuthNo = '',
    paymentGatewayAuthToken = '',
    paymentGatewayToken = '',
    paymentGatewayTransactionId = '',
    tossPaymentsParameter,
    kurlypayParameter,
    isGiftOrder = false,
    isJoinOrder,
  }: CompleteOrderProps): AppThunk =>
  async (dispatch) => {
    const { paymentsFail, paymentsCancel, paymentsServiceFail, paymentsSuccess } = orderResult();

    const paymentGatewayStatus = checkPaymentGatewayResult({
      selectedVendorCode,
      paymentGatewayResult,
      paymentGatewayMessage,
    });

    if (paymentGatewayStatus === 'fail') {
      dispatch(
        failOrderWithSetMessage({
          groupOrderNo,
          paymentAllResult,
          paymentGatewayMessage,
          isGiftOrder,
          showPGFailMessage: getShowPGFailMessage({
            selectedVendorCode,
            paymentGatewayMessage,
          }),
        }),
      );

      return;
    }

    if (paymentGatewayStatus === 'cancel') {
      paymentsCancel({ groupOrderNo, isGiftOrder, isJoinOrder });
      return;
    }

    const paymentCompleteProps = {
      groupOrderNo,
      paymentGatewayAuthNo,
      paymentGatewayAuthToken,
      paymentGatewayToken,
      paymentGatewayTransactionId,
      tossPaymentsParameter,
      kurlypayParameter,
    };

    try {
      const { success, message, data } = isGiftOrder
        ? await giftPaymentComplete(paymentCompleteProps)
        : await paymentComplete(paymentCompleteProps);

      if (!success || !data) {
        paymentsFail({ groupOrderNo, isGiftOrder, apiMessage: message });
        return;
      }

      const isViewPackage = isViewPackagePaymentResult({
        packageType: data.packingType ?? 'PAPER',
      });

      dispatch(
        setValue({
          paymentsResult: {
            name: data.ordererName ?? '',
            address: data.address,
            addressDetail: data.addressDetail,
            reason: message,
            resultCode: success ? 0 : 1,
            isFirstOrder: data.isFirstPurchased ?? false,
            totalPrice: data.totalPaymentPrice ?? 0,
            expectedPoint: data.totalAccruedPoint ?? 0,
            benefitPercent: data.ordererPointRatio,
            reusablePackageType: data.packingType ?? 'PAPER',
            displayMessages: data.displayMessages,
            paymentGatewayId: data.paymentGatewayId,
            deliveryPrice: data.deliveryPrice,
            totalCouponDiscountPrice: data.totalCouponDiscountPrice,
            totalUsedPoint: data.totalUsedPoint,
            couponCode: data.couponCode,
            couponName: data.couponName,
            orderDealProducts: data.orderDealProducts,
            isGiftPurchase: isGiftOrder,
            isViewPackage,
            notificationType: data.notificationType ?? Notification.KAKAO_TALK,
            recipientName: data.recipientName ?? '',
            orderedDate: data.orderedDate ?? '',
            availableDate: data.availableDate ?? '',
            externalGroupOrderNo: data.externalGroupOrderNo ?? '',
            memberships: data.memberships ?? [],
            isKurlypayPlccMember: data.isKurlypayPlccMember ?? false,
            isDeliveryOrder: data.isDeliveryOrder,
            joinOrderMeta: data.joinOrderMeta,
          },
        }),
      );

      paymentsSuccess({ groupOrderNo, isGiftOrder, data, isJoinOrder });
    } catch (err) {
      const error = (err as AxiosError).response?.data as PaymentErrorResponse;

      if (error?.code === '9998') {
        dispatch(
          setValue({
            paymentsResult: {
              reason: error.message,
              isGiftOrder,
              groupOrderNo,
            },
          }),
        );
      }

      paymentsServiceFail({
        error: err as AxiosError,
        isGiftOrder,
        groupOrderNo,
      });
    }
  };

export default reducer;
