import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../../../shared/store';

import {
  calculatePrice,
  getCheckContinuity,
  isKurlypayPaymentType,
  isKurlypayVendor,
} from '../../../shared/shared/services';
import { putCheckoutAddress } from '../../../../shared/services';
import { notify, notifyAndFocus, notifyAndScroll } from '../../../../shared/reducers/page';

import {
  DeliveryCompleteMessage,
  FrontDoorMethod,
  PickupDetailCategory,
  ReceivePlace,
  ReceiverDetailTemplate,
} from '../../../../shared/enums';
import {
  AvailablePoint,
  CalculatedPrice,
  CalculateServiceRequest,
  CheckoutProductItem,
  CheckoutType,
  EasyPaymentType,
  JoinOrderMeta,
  PageType,
  ReusablePackage,
  ProductGroup,
  ProductGroupsByDeliveryPolicy,
} from '../../../../shared/interfaces';
import {
  ContinuityMessageBasicStyle,
  ContinuityMessageReplaceStyle,
  HolidayDelivery,
  PickupPeriod,
  PickupPlace,
  ReceiverForm,
  ReceiverInfo,
} from '../interfaces';
import { isLimitedPriceCondition } from '../../../shared/shared/utils/isLimitedPriceCondition';

import { getCalculateParams } from '../utils/getCalculateParams';
import { validateReceiverInfo } from '../utils/validateReceiverInfo';
import {
  validateDeliveryField,
  validateDeliveryReceiverInfo,
  validateDirectDelivery,
  validateRecipientField,
} from '../utils/validateDeliveryInfo';
import { validateVendor } from '../utils/validateVendor';
import { ValidationError } from '../../../../shared/errors/ValidationError';
import { ReformattedError } from '../../../../shared/errors/ReformattedError';
import { validateAlert } from '../../../../shared/error-handlers/ValidationErrorHandlers';
import { OrderTypes, originalTotalPrice, recalculatePoint } from '../utils';

import { Notification, NotificationType, RecipientInfo } from '../../../gift/shared/interfaces/ReceiverForm.interface';
import { TermsInfo } from '../../../../shared/interfaces/UserTerms';
import { checkoutError, handleContinuityError } from './checkoutErrors';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import {
  loadCheckoutPaymentMethods,
  resetCheckoutPaymentState,
  setSelectedInstallment,
} from './checkout-payment.slice';
import { findCouponVendor } from '../utils/validation/findCouponVendor';
import { findPaymentVendor } from '../utils/validation/findPaymentVendor';
import { validateCouponField } from '../utils/validation/validateCouponField';
import { ReturnCartError } from '../../../../shared/errors';
import { resetCouponState } from './checkout-coupon.slice';
import { resetPaymentsState } from '../../../shared/shared/reducers/payments.slice';
import { BaseAddressType } from '../../../../shared/interfaces/ShippingAddress';

export interface CheckoutState {
  reusablePackage: ReusablePackage;
  // 주문 목록
  products?: CheckoutProductItem[];
  // 배송 정책 기준으로 그룹화 된 상품 그룹
  productGroupsByDeliveryPolicies?: ProductGroupsByDeliveryPolicy[];
  // 증정품 목록
  giveawayProducts?: CheckoutProductItem[];
  // (회원) 사용한 적립금
  usedPoint: number;
  // (공통) 결제 금액 정보
  price: CalculatedPrice;
  // 모든 포인트 사용 여부
  isUseAllPoint: boolean;
  // 컬리캐시 사용 여부
  isUsePaidPoint: boolean;
  // 주문 목록에 100원딜/럭키박스 상품 포함 여부
  isEventProducts?: boolean;
  // (공통) 배송지 상세 정보
  receiverForm: ReceiverForm;
  // (공통) 배송지 상세 수정 완료 여부
  changedReceiverForm: boolean;
  // (공통) 배송지 상세 수정 후 오류 여부
  changedReceiverFormError: {
    type: string;
    message: string;
  };
  // 결제하기 버튼 클릭 시 배송 정보 에러 여부
  isReceiverError: boolean;
  // 특수 배송 제한
  holidayDelivery?: HolidayDelivery;
  // 재사용포장재 구매 주문 여부
  isReusablePackage: boolean;
  // 와인 픽업 서비스
  isPickupOrder: boolean;
  // [와인] 선택 된 픽업 매장
  selectedPickupPlace?: PickupPlace;
  // [와인] 픽업 가능 날짜 정보
  pickupPeriod?: PickupPeriod;
  validateConfirmed: boolean;
  // 바로구매 주문서 여부
  isDirectCheckout?: boolean;
  // 무배송 상품 포함 여부
  hasNonDeliveryProduct: boolean;
  // 럭키박스 단건 주문 여부
  isLuckyBoxOrder: boolean;
  // 컨티뉴이티 팝업 문구, 비어있으면 컨티뉴이티가 아닙니다.
  continuityPopupMessage: string;
  // 컨티뉴이티 팝업 서브 문구, 비어있으면 표시하지 않습니다.
  continuityPopupSubMessage: string;
  // 컨티뉴이티 팝업 BasicStyle, 있는 경우 팝업 문구의 스타일을 변경합니다.
  continuityPopupMessageBasicStyle?: ContinuityMessageBasicStyle;
  // 컨티뉴이티 팝업 ReplaceStyles, 있는 경우 팝업 문구 특정 text의 스타일을 변경합니다.
  continuityPopupMessageReplaceStyles?: ContinuityMessageReplaceStyle[];
  // 배송 안내 문구, 가격표 밑에 있다.
  deliveryNotice: string;
  // 배송 안내 문구 BasicStyle, 있는 경우 배송 안내 문구의 스타일을 변경합니다.
  deliveryNoticeBasicStyle?: ContinuityMessageBasicStyle;
  // 배송 안내 문구 ReplaceStyles, 있는 경우 배송 안내 문구 특정 text의 스타일을 변경합니다.
  deliveryNoticeReplaceStyles?: ContinuityMessageReplaceStyle[];
  // 선물하기 주문서 여부
  isGiftOrder: boolean;
  // [선물하기] 메세지 전송 타입
  notificationType: NotificationType;
  // [선물하기] 수신자 정보
  recipientInfo: RecipientInfo;
  // 약관 동의 정보
  personalInfoAgreement: {
    isVisibleThirdPartyAgree: boolean;
    terms: TermsInfo[];
  };
  isPaymentButtonLoading: boolean;
  // 함께구매 정보(일반/선물 주문에서는 없음)
  joinOrder: JoinOrderMeta | null;
  // 컬리 상품권 구매 주문서 여부
  isGiftCardOrder: boolean;
  // 사용가능 적립금/컬리캐시
  availablePoint: AvailablePoint;
  // 간편결제 무인증 결제에 사용됨
  deviceId: string;
  // 주문 타입
  checkoutType: CheckoutType;
  // 해외직배송 상품 여부
  hasInternationalDirectProduct: boolean;
  // 개인통관고유부호
  personalCustomsCode: string;
  // 주문서 타입
  orderType?: OrderTypes;
  // 상품그룹 - 새벽배송
  dawnProductGroups?: ProductGroup[];
  // 상품그룹 - 판매자배송
  normalParcelProductGroups?: ProductGroup[];
  // 상품그룹 - 해외직배송
  internationalDirectProductGroups?: ProductGroup[];
}

export const initialState: CheckoutState = {
  reusablePackage: {
    viewPackage: false,
    defaultSelected: null,
    selected: null,
    available: {
      kurlyBag: false,
      personalBag: false,
    },
  },
  // (공통) 배송 정보
  // 주문 배송 정보
  receiverForm: {
    addressNo: -1,
    name: '',
    phone: '',
    isDefaultAddress: false,
    address: '',
    addressDetail: '',
    roadAddress: '',
    baseAddressType: BaseAddressType.road,
    receivePlace: ReceivePlace.DOOR,
    frontDoorMethod: FrontDoorMethod.PASSWORD,
    frontDoorDetail: '',
    deliveryType: 'disable',
    deliveryCompleteMessage: DeliveryCompleteMessage.IMMEDIATELY,
    pickupDetailCategory: PickupDetailCategory.ETC,
    pickupDetail: '',
    requiredFillReceiverDetail: false,
    requiredFillReceiverContact: false,
    latitude: 0,
    longitude: 0,
    receiverTemplate: ReceiverDetailTemplate.DEFAULT,
  },
  changedReceiverForm: false,
  changedReceiverFormError: {
    type: '',
    message: '',
  },
  isReceiverError: false,
  usedPoint: 0,
  price: {
    totalPrice: 0,
    discountPrice: 0,
    expectedPoint: 0,
    couponDiscountPrice: 0,
    paymentPrice: 0,
    deliveryPrice: 0,
    deliveryPriceDiscountReason: '',
    usedPlccPoint: 0,
    kurlycardAccruedPoint: 0,
    usedFreePoint: 0,
    usedPaidPoint: 0,
  },
  isUseAllPoint: false,
  isUsePaidPoint: false,
  isPickupOrder: false,
  selectedPickupPlace: undefined,
  pickupPeriod: undefined,
  isReusablePackage: false,
  validateConfirmed: false,
  isDirectCheckout: undefined,
  holidayDelivery: undefined,
  hasNonDeliveryProduct: false,
  isLuckyBoxOrder: false,
  continuityPopupMessage: '',
  continuityPopupSubMessage: '',
  deliveryNotice: '',
  isGiftOrder: false,
  notificationType: Notification.SMS,
  recipientInfo: {
    name: '',
    message: '',
    phone: '',
  },
  personalInfoAgreement: {
    isVisibleThirdPartyAgree: false,
    terms: [],
  },
  isPaymentButtonLoading: false,
  joinOrder: null,
  isGiftCardOrder: false,
  availablePoint: {
    free: 0,
    paid: 0,
  },
  deviceId: '',
  checkoutType: CheckoutType.NORMAL,
  hasInternationalDirectProduct: false,
  personalCustomsCode: '',
};

const { actions, reducer } = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetCheckoutState: (state) => ({
      ...initialState,
      ...(state.isPickupOrder
        ? {
            selectedPickupPlace: state.selectedPickupPlace,
          }
        : {
            selectedPickupPlace: undefined,
          }),
    }),
    setValue: (state, { payload }) => ({ ...state, ...payload }),
    setPrice: (state, { payload: price }: PayloadAction<CalculatedPrice>) => ({
      ...state,
      price: {
        ...price,
        deliveryPriceDiscountReason: state.price.deliveryPriceDiscountReason,
      },
    }),
    setPoints: (state, { payload: usedPoint }: PayloadAction<number>) => {
      state.usedPoint = usedPoint;
    },
    setPaymentButtonLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      state.isPaymentButtonLoading = isLoading;
    },
    saveDeviceId: (state, { payload: deviceId }: PayloadAction<string>) => {
      state.deviceId = deviceId;
    },
    setOrderType: (state, { payload: orderType }: PayloadAction<OrderTypes>) => {
      state.orderType = orderType;
    },
  },
});

export const {
  resetCheckoutState,
  setValue,
  setPoints,
  setPrice,
  setPaymentButtonLoading,
  saveDeviceId,
  setOrderType,
} = actions;

export const isShowCashReceiptSelector = createDraftSafeSelector(
  [
    ({ checkout }: RootState) => checkout.price.paymentPrice,
    ({ checkout }: RootState) => checkout.isUsePaidPoint,
    ({ checkout }: RootState) => checkout.isGiftCardOrder,
    ({ checkoutPayment }: RootState) => checkoutPayment.selectedVendor,
    ({ checkoutPayment }: RootState) => checkoutPayment.selectedKurlypayVendor,
  ],
  (paymentPrice, isUsePaidPoint, isGiftCardOrder, selectedVendor, selectedKurlypayVendor) => {
    return (
      (paymentPrice !== 0 &&
        !isGiftCardOrder &&
        isKurlypayVendor(selectedVendor) &&
        isKurlypayPaymentType(EasyPaymentType.BANK, selectedKurlypayVendor)) ||
      isUsePaidPoint
    );
  },
);

export const initCheckout = (): AppThunk => (dispatch) => {
  dispatch(resetCheckoutState());
  dispatch(resetCheckoutPaymentState());
  dispatch(resetCouponState());
  dispatch(resetPaymentsState());
};

// 결제금액 재계산
export const recalculatePrice = (): AppThunk => async (dispatch, getState) => {
  const {
    member: { pointBenefit },
    checkout: { usedPoint, price, isGiftOrder, availablePoint, joinOrder, isPickupOrder, checkoutType },
    checkoutPayment: {
      selectedVendor,
      selectedCreditCard,
      selectedInstallment,
      selectedPlccPoint,
      plccDiscountPrice,
      selectedKurlypayVendor,
      hasKurlypayError,
    },
    checkoutCoupon: { selectedCoupon },
  } = getState();
  const isLiquidity = checkoutType === CheckoutType.LIQUIDITY;

  // 컬리페이 점검 & 컬리캐시 사용할 경우
  if (hasKurlypayError && (isLiquidity || usedPoint > availablePoint.free)) {
    const message = '컬리페이 간편결제 점검중으로 컬리캐시 사용이 불가능 합니다.';
    if (isWebview()) {
      appService.postToast({
        type: 'failure',
        title: message,
      });
    } else {
      dispatch(notify(message));
    }
  }

  // 포인트를 재계산해라.
  const recalculateUsingPoint = recalculatePoint({
    price: {
      ...price,
      couponDiscountPrice: selectedCoupon?.totalCouponDiscount ?? 0,
      deliveryPrice: price.deliveryPrice,
    },
    usedPoint,
    availablePoint,
    selectedCoupon,
    selectedPlccPoint,
    hasKurlypayError,
    isLiquidity,
  });
  dispatch(setPoints(recalculateUsingPoint));

  // 전액적립금 사용 여부를 계산해라.
  const isUseAllPoint =
    recalculateUsingPoint ===
    originalTotalPrice({
      price: {
        ...price,
        couponDiscountPrice: selectedCoupon?.totalCouponDiscount ?? 0,
      },
    });
  dispatch(setValue({ isUseAllPoint }));

  //컬리캐시 사용 여부
  const isUsePaidPoint =
    availablePoint.paid !== 0 &&
    (recalculateUsingPoint > availablePoint.free || // 일반 상품은 적립금이 우선 사용되므로 사용가능한 적립금보다 사용한 적립금이 더 많으면 이는 컬리캐시가 사용 된 것임.
      (isLiquidity && recalculateUsingPoint !== 0)); // 환금성 상품은 서버에서 컬리캐시를 우선 사용해서 응답함. 환금성 상품이고 사용한 적립금이 있으면 이는 컬리캐시 사용임.

  dispatch(setValue({ isUsePaidPoint }));

  const params: CalculateServiceRequest = getCalculateParams({
    selectedCoupon,
    usedPoint: recalculateUsingPoint,
    deliveryPrice: price.deliveryPrice,
    selectedVendor,
    selectedCreditCard,
    pointBenefit,
    selectedKurlypayVendor,
    usedPlccPoint: selectedPlccPoint ? plccDiscountPrice : 0,
    isUseAllPoint,
  });

  try {
    const isJoinOrder = !!joinOrder;
    const recalculatedPrice = await calculatePrice(params, isGiftOrder, isJoinOrder, isPickupOrder);
    dispatch(setPrice(recalculatedPrice));

    dispatch(loadCheckoutPaymentMethods());
    if (selectedInstallment) {
      dispatch(setSelectedInstallment({ name: '일시불', value: '0' }));
    }
  } catch (err) {
    if (err instanceof ReturnCartError) {
      dispatch(checkoutError(err));
      return;
    }

    if (err instanceof Error) {
      dispatch(notify(err.message));
    }
  }
};

// (공통) 주문서 - 배송 상세 수정
export const updateCheckoutAddress = (): AppThunk => async (dispatch, getState) => {
  const {
    checkout: { receiverForm },
  } = getState();

  try {
    await putCheckoutAddress(receiverForm);
  } catch (err) {
    if (err instanceof ReturnCartError) {
      dispatch(
        setValue({
          changedReceiverFormError: { type: 'ReturnCartError', message: err.message },
        }),
      );
    }

    if (err instanceof Error) {
      dispatch(
        setValue({
          changedReceiverFormError: { type: 'Error', message: err.message },
        }),
      );
    }
  } finally {
    dispatch(
      setValue({
        changedReceiverForm: true,
      }),
    );
  }
};

export const submitReceiverForm = (): AppThunk => async (dispatch, getState) => {
  const {
    checkout: { receiverForm },
  } = getState();

  try {
    const validateReceivePlace = await validateDeliveryReceiverInfo(receiverForm);
    await validateAlert(validateReceivePlace);

    const validateDelivery = await validateDirectDelivery(receiverForm);
    await validateAlert(validateDelivery);

    dispatch(updateCheckoutAddress());
  } catch (err) {
    // 주문자 정보의 허용 불가능 문자열 수정 처리
    if (err instanceof ReformattedError) {
      const {
        errorMessage,
        documentId,
        reformattedField: { value, text },
      } = JSON.parse(err.message);

      dispatch(
        setValue({
          receiverForm: {
            ...receiverForm,
            [value]: text,
          },
        }),
      );

      dispatch(
        notifyAndFocus({
          message: errorMessage,
          documentId: documentId,
        }),
      );
      return;
    }

    if (err instanceof ValidationError) {
      dispatch(
        notifyAndFocus({
          message: err.message,
          documentId: err.name,
        }),
      );
      return;
    }

    dispatch(notify((err as Error).message));
  }
};

export const checkContinuity = (): AppThunk => async (dispatch, getState) => {
  const {
    checkout: {
      receiverForm: { roadAddress, addressDetail },
      products,
    },
  } = getState();

  if (!products) {
    return;
  }

  const dealProducts = products.map(({ dealProductNo, quantity }) => ({ dealProductNo, quantity }));

  try {
    const continuityPopupMessageData = await getCheckContinuity({
      pageType: PageType.PLACE_ORDER,
      address: roadAddress,
      addressDetail,
      dealProducts,
    });

    dispatch(setValue(continuityPopupMessageData));
  } catch (err) {
    dispatch(handleContinuityError(err as Error));
  }
};

// 주문서 결제하기 버튼 클릭 시 밸리데이션
export const validateCheckoutOrder =
  ({ receiverInfo }: { receiverInfo: ReceiverInfo }): AppThunk =>
  async (dispatch, getState) => {
    const {
      checkout: {
        receiverForm,
        isPickupOrder,
        selectedPickupPlace,
        isUseAllPoint,
        price,
        usedPoint,
        isLuckyBoxOrder,
        isGiftOrder,
        notificationType,
        recipientInfo,
        joinOrder,
        hasInternationalDirectProduct,
        personalCustomsCode,
      },
      checkoutPayment: {
        vendors,
        selectedVendor,
        creditCards,
        selectedCreditCard,
        selectedInstallment,
        selectedKurlypayVendor,
        kurlypayVendors,
      },
      checkoutCoupon: { selectedCoupon },
    } = getState();

    dispatch(
      setValue({
        validateConfirmed: false,
      }),
    );

    const isJoinOrder = !!joinOrder;

    // STEP 1 - 상품 검증
    try {
      // STEP 2 - 주문자, 배송 정보 검증
      const validateReceiver = validateReceiverInfo(receiverInfo);
      validateAlert(validateReceiver);

      if (!isGiftOrder) {
        const validateDeliveryPlace = validateDeliveryField(receiverForm);
        validateAlert(validateDeliveryPlace);
      }

      // 선물하기 수신자 정보 검증
      if (isGiftOrder) {
        const validateRecipient = validateRecipientField(recipientInfo, notificationType);
        validateAlert(validateRecipient);
      }

      //해외직배송시 개인통관고유부호 검증
      if (hasInternationalDirectProduct && !personalCustomsCode) {
        throw new ValidationError({
          errorMessage: '개인통관고유부호를 입력해 주세요.',
          documentId: 'personal-customs-code-container',
        });
      }

      // STEP 3 - 포장 방법 검증
      // 와인
      if (isPickupOrder && !selectedPickupPlace) {
        throw new ValidationError({
          errorMessage: '와인 픽업 매장을 선택해주세요.',
          documentId: 'pickup-container',
        });
      }

      // STEP 4 - 쿠폰, 결제 금액, 결제 수단 검증
      if (!isUseAllPoint && !(isLuckyBoxOrder && price.paymentPrice === 0)) {
        const validatePayments = validateVendor({
          selectedVendor,
          selectedCreditCard,
          selectedInstallment,
          selectedKurlypayVendor,
        });
        validateAlert(validatePayments);
      }

      const couponVendor = findCouponVendor({ selectedCoupon, vendors, creditCards, kurlypayVendors });
      const paymentVendor = findPaymentVendor({
        selectedVendor,
        selectedKurlypayVendor,
        selectedCreditCard,
        vendors,
        creditCards,
      });
      const validateCouponResult = validateCouponField({
        selectedCoupon,
        usedPoint,
        couponVendor,
        paymentVendor,
        price,
      });
      validateAlert(validateCouponResult);

      const hasLimitedPriceCondition = isLimitedPriceCondition({
        isUseAllPoint,
        price,
        isLuckyBoxOrder,
      });

      // 100원 미만 결제 검증
      if (hasLimitedPriceCondition) {
        throw new Error('최소 결제 금액은 100원 이상입니다.');
      }

      // STEP 5 - 컨티뉴이티 검증
      if (!(isJoinOrder || isGiftOrder)) {
        await dispatch(checkContinuity());
      }

      dispatch(setValue({ validateConfirmed: true }));
    } catch (err) {
      dispatch(setPaymentButtonLoading(false));

      // 주문자 정보의 허용 불가능 문자열 수정 처리
      if (err instanceof ReformattedError) {
        const {
          errorMessage,
          documentId,
          reformattedField: { value, text },
        } = JSON.parse(err.message);

        if (isGiftOrder) {
          dispatch(
            setValue({
              recipientInfo: {
                ...recipientInfo,
                [value]: text,
              },
            }),
          );
        } else {
          dispatch(
            setValue({
              receiverInfo: {
                ...receiverInfo,
                [value]: text,
              },
            }),
          );
        }

        dispatch(
          notifyAndFocus({
            message: errorMessage,
            scrollId: documentId,
          }),
        );
        return;
      }

      if (err instanceof ValidationError) {
        if (isWebview()) {
          appService.postToast({
            type: 'failure',
            title: err.message,
          });

          if (isGiftOrder) {
            document.getElementById(err.name)?.focus();
            return;
          }

          document.getElementById(err.name)?.scrollIntoView();
          return;
        }
        dispatch(
          notifyAndScroll({
            message: err.message,
            scrollId: err.name,
          }),
        );
        return;
      }

      dispatch(notify((err as Error).message));
    }
  };

export default reducer;
