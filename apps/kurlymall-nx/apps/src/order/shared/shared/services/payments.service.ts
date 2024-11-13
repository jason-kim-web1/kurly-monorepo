import {
  BaseApiResponse,
  PlaceOrderServiceRequest,
  GiftPlaceOrderServiceRequest,
  PlaceOrderResponse,
  PaymentCompleteRequest,
  PaymentCompleteResponse,
  PaymentCancelRequest,
} from '../../../../shared/interfaces';
import {
  postPlaceOrder,
  postGiftPlaceOrder,
  postPaymentComplete,
  postGiftPaymentComplete,
  postPaymentCancel,
  postGiftPaymentCancel,
  postJoinPlaceOrder,
} from '../../../../shared/api/checkout/payments';
import { appendHyphenToPhoneNumber } from '../../../../shared/services';
import {
  getReceiverDetailParams,
  getUserAgentDetailParams,
  getTermsAgreements,
  getCreditCardParameter,
  getKurlypayEasyPaymentParameter,
  getCallbackUrl,
} from '../../../checkout/shared/utils/getPlaceOrderParams';
import { PAYMENT_GIFT_PATH } from '../../../../shared/constant';
import { getTermsList } from '../utils';

// 주문 시작 - 주문서 & 함께구매
export const placeOrder = async (params: PlaceOrderServiceRequest): Promise<PlaceOrderResponse> => {
  const {
    selectedVendorCode,
    receiverForm,
    selectedInstallment,
    selectedCreditCard,
    selectedCoupon,
    selectedCardPoint,
    usedPoint,
    pickup,
    reusablePackage: { selected },
    kurlypayPaymentType,
    kurlypayPaymentMethodId,
    kurlypayInstallment,
    kurlypayCreditCard,
    plccDiscountPrice,
    isJoinOrder,
    deviceId,
    personalCustomsCode,
  } = params;

  const { paymentSuccessRedirectUrl, paymentFailRedirectUrl, paymentCancelRedirectUrl } = getCallbackUrl({
    isJoinOrder,
    selectedVendorCode,
  });

  const requestPlaceOrder = isJoinOrder ? postJoinPlaceOrder : postPlaceOrder;
  const data = await requestPlaceOrder({
    // (회원) 쿠폰 코드
    couponCode: selectedCoupon?.couponCode ?? null,
    // (회원) 사용 적립금
    usingFreePoint: usedPoint,
    // (공통) 선택한 결제 수단
    paymentGatewayId: selectedVendorCode,
    // 선택한 결제수단이 toss-payments | kurlypay-credit | kurlypay 인 경우 부가적으로 전달해야하는 파라미터
    creditCardParameter: getCreditCardParameter({
      selectedVendorCode,
      selectedInstallment,
      selectedCreditCard,
      kurlypayPaymentType,
      kurlypayInstallment,
      kurlypayCreditCard,
    }),
    paymentSuccessRedirectUrl,
    paymentFailRedirectUrl,
    paymentCancelRedirectUrl,
    // (공통) 받는 분 정보
    ...getReceiverDetailParams(receiverForm),
    // (회원) 재사용포장재 정보
    packingType: selected,
    // (공통) 플랫폼 정보
    userAgent: getUserAgentDetailParams(),
    termsAgreements: getTermsAgreements(
      getTermsList({
        code: selectedVendorCode,
        isGiftOrder: false,
      }).map((term) => ({
        ...term,
        agreed: true,
      })),
    ),
    // 와인 데이터
    pickup: pickup
      ? [
          {
            placeId: pickup.placeId,
            startDate: pickup.startDate,
            endDate: pickup.endDate,
          },
        ]
      : null,
    // 컬리페이 간편 결제
    kurlypayEasyPaymentParameter: getKurlypayEasyPaymentParameter({
      kurlypayPaymentType,
      kurlypayPaymentMethodId,
      useCardPoint: selectedCardPoint ?? false,
      deviceId,
    }),
    // PLCC
    plccDiscountPrice,
    // 개인통관고유부호
    personalCustomsCode,
  });

  return data;
};

// 주문 시작 - 선물하기
export const placeGiftOrder = async (params: GiftPlaceOrderServiceRequest): Promise<PlaceOrderResponse> => {
  const {
    selectedVendorCode,
    recipientInfo,
    selectedInstallment,
    notificationType,
    selectedCreditCard,
    selectedCoupon,
    selectedCardPoint,
    usedPoint,
    receiverInfo: { name, email, phone },
    kurlypayPaymentType,
    kurlypayPaymentMethodId,
    kurlypayInstallment,
    kurlypayCreditCard,
    plccDiscountPrice,
    deviceId,
    personalCustomsCode,
  } = params;
  const data = await postGiftPlaceOrder({
    // 주문자 정보
    ordererName: name,
    ordererPhoneNumber: appendHyphenToPhoneNumber(phone),
    ordererEmail: email,
    // (회원) 쿠폰 코드
    couponCode: selectedCoupon?.couponCode ?? null,
    // (회원) 사용 적립금
    usingFreePoint: usedPoint,
    // (공통) 선택한 결제 수단
    paymentGatewayId: selectedVendorCode,
    // 선택한 결제수단이 toss-payments | kurlypay-credit | kurlypay 인 경우 부가적으로 전달해야하는 파라미터
    creditCardParameter: getCreditCardParameter({
      selectedVendorCode,
      selectedInstallment,
      selectedCreditCard,
      kurlypayPaymentType,
      kurlypayInstallment,
      kurlypayCreditCard,
    }),
    // 결제 이후 리다이렉션 URL
    paymentSuccessRedirectUrl: `${origin}${PAYMENT_GIFT_PATH.process.uri}/${selectedVendorCode}`,
    paymentFailRedirectUrl: `${origin}${PAYMENT_GIFT_PATH.payFail.uri}`,
    paymentCancelRedirectUrl: `${origin}${PAYMENT_GIFT_PATH.cancel.uri}/${selectedVendorCode}`,
    // (공통) 플랫폼 정보
    userAgent: getUserAgentDetailParams(),
    termsAgreements: getTermsAgreements(
      getTermsList({
        isGiftOrder: true,
        code: selectedVendorCode,
      }).map((term) => ({
        ...term,
        agreed: true,
      })),
    ),
    usedPoint: 0,
    // 선물 알림 타입
    notificationType,
    // 선물 수신자명
    recipientName: recipientInfo.name,
    // 선물 수신자 전화번호
    recipientMobile: appendHyphenToPhoneNumber(recipientInfo.phone),
    // 선물 메시지
    message: recipientInfo.message,
    // 컬리페이 간편 결제
    kurlypayEasyPaymentParameter: getKurlypayEasyPaymentParameter({
      kurlypayPaymentType,
      kurlypayPaymentMethodId,
      useCardPoint: selectedCardPoint ?? false,
      deviceId,
    }),
    // PLCC
    plccDiscountPrice,
    personalCustomsCode,
  });

  return data;
};

// 결제 시도 중 이탈 - 주문서
export const paymentOutInProgress = (params: PaymentCancelRequest): Promise<BaseApiResponse<null>> =>
  postPaymentCancel(params);

// 결제 시도 중 이탈 - 선물하기
export const giftPaymentOutInProgress = (params: PaymentCancelRequest): Promise<BaseApiResponse<null>> =>
  postGiftPaymentCancel(params);

// 주문 완료 - 주문서
export const paymentComplete = (params: PaymentCompleteRequest): Promise<BaseApiResponse<PaymentCompleteResponse>> =>
  postPaymentComplete(params);

// 주문 완료 - 선물하기
export const giftPaymentComplete = (
  params: PaymentCompleteRequest,
): Promise<BaseApiResponse<PaymentCompleteResponse>> => postGiftPaymentComplete(params);
