import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { waitFor } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import reducer, {
  checkContinuity,
  initialState,
  recalculatePrice,
  setPoints,
  setPrice,
  setValue,
  submitReceiverForm,
  updateCheckoutAddress,
  validateCheckoutOrder,
} from './checkout.slice';

import { notifyAndFocus } from '../../../../shared/reducers/page';

import {
  KAKAOPAY_COUPON,
  memberPointBenefitFixture,
  paymentMethodResponse,
  productDetailFixtures,
  receiverFormFixtures,
  TOSSPAYMENTS_COUPON_WITH_SHINHAN,
} from '../../../../../fixtures';
import { calculatePrice, formattedPaymentVendors, getCheckContinuity } from '../../../shared/shared/services';
import { calculatePriceResponseMock } from '../../../../shared/api/checkout/__mocks__/checkout';

import { readPaymentMethods } from '../../../../shared/api';

import { Grade, ReceivePlace } from '../../../../shared/enums';
import { validateAlert } from '../../../../shared/error-handlers/ValidationErrorHandlers';
import { setPaymentVendors } from './checkout-payment.slice';
import { CreditCardFixture } from '../../../../../fixtures/checkout/credit-cards';
import {
  KAKAOPAY_VENDOR,
  simpleVendorsFixture,
  TOSSPAYMENTS_VENDOR,
  vendorsFixture,
} from '../../../../../fixtures/checkout/payment-vendors';
import { CheckoutType } from '../../../../shared/interfaces';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../../../../shared/api/');
jest.mock('./checkoutErrors');
jest.mock('../../../shared/shared/services', () => {
  const originalModule = jest.requireActual('../../../shared/shared/services');

  return {
    ...originalModule,
    getPreviousVendor: jest.fn(),
    calculatePrice: jest.fn(),
    getCheckContinuity: jest.fn(),
  };
});

describe('Checkout Slice', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('selectedVendor', () => undefined);
  given('selectedCreditCard', () => undefined);
  given('simplePaymentVendors', () => simpleVendorsFixture);
  given('vendors', () => vendorsFixture);
  given('kurlypayVendors', () => []);
  given('selectedInstallment', () => undefined);
  given('isPreferencePayment', () => true);

  given('selectedCoupon', () => undefined);
  given('usedPoint', () => 0);
  given('availablePoint', () => ({ free: 0, paid: 0 }));
  given('selectedPickupPlace', () => undefined);
  given('validateResult', () => ({
    errorMessage: '',
    documentId: '',
  }));
  given('totalPrice', () => 10000);
  given('paymentPrice', () => 10000);
  given('receiverForm', () => receiverFormFixtures);
  given('receiverInfo', () => ({
    name: '',
    phone: '',
    email: '',
  }));
  given('isPickupOrder', () => false);
  given('isUseAllPoint', () => false);
  given('isLuckyBoxOrder', () => false);
  given('hasNonDeliveryProduct', () => true);
  given('products', () => productDetailFixtures.products);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        ...initialState,
        usedPoint: given.usedPoint,
        price: {
          deliveryPrice: 0,
          discountPrice: 0,
          couponDiscountPrice: 0,
          paymentPrice: given.paymentPrice,
          totalPrice: given.totalPrice,
          deliveryPriceDiscountReason: '',
          usedFreePoint: 0,
          usedPaidPoint: 0,
        },
        selectedPickupPlace: given.selectedPickupPlace,
        receiverForm: given.receiverForm,
        isPickupOrder: given.isPickupOrder,
        isUseAllPoint: given.isUseAllPoint,
        isLuckyBoxOrder: given.isLuckyBoxOrder,
        hasNonDeliveryProduct: given.hasNonDeliveryProduct,
        products: given.products,
        availablePoint: given.availablePoint,
      },
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      checkoutPayment: {
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        vendors: given.vendors,
        creditCards: CreditCardFixture,
        isPreferencePayment: given.isPreferencePayment,
        simplePaymentVendors: given.simplePaymentVendors,
        selectedInstallment: given.selectedInstallment,
        kurlypayVendors: given.kurlypayVendors,
      },
      shippingAddress: {
        currentAddress: {
          deliveryType: 'direct',
        },
      },
      member: {
        pointBenefit: {
          percent: memberPointBenefitFixture,
        },
        subscription: {
          isSubscribed: false,
        },
      },
    }));

    (readPaymentMethods as jest.Mock).mockResolvedValue(paymentMethodResponse);
    (calculatePrice as jest.Mock).mockResolvedValue(calculatePriceResponseMock);
  });

  describe('setValue', () => {
    it('상태를 변경한다.', () => {
      const { isUseAllPoint } = reducer(initialState, setValue({ isUseAllPoint: true }));

      expect(isUseAllPoint).toBeTruthy();
    });
  });

  describe('setPoints', () => {
    given('usedPoint', () => 1000);

    it('적립금 상태를 변경한다.', () => {
      const { usedPoint } = reducer(initialState, setPoints(given.usedPoint));

      expect(usedPoint).toEqual(given.usedPoint);
    });
  });

  describe('setPrice', () => {
    given('price', () => calculatePriceResponseMock);

    it('기존의 deliveryPriceDiscountReason 을 유지하면서 가격 상태를 변경한다.', () => {
      const { price } = reducer(initialState, setPrice(given.price));

      expect(price).toEqual({
        ...given.price,
        deliveryPriceDiscountReason: '',
      });
    });
  });

  describe('validateAlert - 공통 밸리데이션 검증', () => {
    context('에러 메세지가 없으면', () => {
      given('validateResult', () => ({
        errorMessage: '',
        documentId: '',
      }));

      it('아무 액션도 실행하지 않는다.', async () => {
        const result = await validateAlert(given.validateResult);
        expect(result).toBeUndefined();
      });
    });

    context('에러 메세지가 있으면', () => {
      given('validateResult', () => ({
        errorMessage: 'Error Message',
        documentId: 'documentId',
      }));

      it('ValidationError 를 반환한다.', async () => {
        try {
          await validateAlert(given.validateResult);
        } catch (e) {
          expect(e.message).toBe(given.validateResult.errorMessage);
        }
      });
    });
  });

  describe('recalculatePrice - (공통) 결제 금액 재계산', () => {
    given('selectedCoupon', () => KAKAOPAY_COUPON);
    given('selectedVender', () => KAKAOPAY_VENDOR);
    given('paymentPrice', () => 60000);

    it('setPrice 로 상품 상세 정보를 업데이트 한다', async () => {
      store.dispatch(recalculatePrice());

      await waitFor(() => {
        const actions = store.getActions();

        const formattedVendors = formattedPaymentVendors(
          paymentMethodResponse.paymentMethods,
          paymentMethodResponse.kurlypayEasyPayment,
          {
            checkoutType: CheckoutType.NORMAL,
            isGiftOrder: false,
            isJoinOrder: false,
            userGrade: Grade.Normal,
            isSubscribed: false,
          },
        );

        expect(actions).toHaveLength(7);
        expect(actions[0].type).toBe('checkout/setPoints');
        expect(actions[1]).toEqual(setValue({ isUseAllPoint: false }));
        expect(actions[2]).toEqual(setValue({ isUsePaidPoint: false }));
        expect(actions[3]).toEqual(setPrice(calculatePriceResponseMock));
        expect(actions[4]).toEqual(setPaymentVendors(formattedVendors));
      });
    });

    context('전액 적립금 결제라면', () => {
      given('selectedCoupon', () => undefined);
      given('totalPrice', () => 10000);
      given('usedPoint', () => 10000);
      given('availablePoint', () => ({ free: 10000, paid: 10000 }));

      it('isUseAllPoint 를 true로 바꿔준다.', async () => {
        store.dispatch(recalculatePrice());

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[1]).toEqual(setValue({ isUseAllPoint: true }));
        });
      });
    });
  });

  describe('updateCheckoutAddress - (공통) 배송 상세 수정', () => {
    it('setValue 로 changedReceiverForm 를 true 로 바꾼다.', async () => {
      await store.dispatch(updateCheckoutAddress());

      const actions = store.getActions();

      expect(actions).toHaveLength(1);
      expect(actions[0]).toEqual(
        setValue({
          changedReceiverForm: true,
        }),
      );
    });
  });

  describe('submit receiver form', () => {
    context('필수 배송 정보가 입력되어 있지 않으면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        name: '',
      }));

      it('경고 문구를 alert으로 노출합니다', async () => {
        await store.dispatch(submitReceiverForm());

        const actions = store.getActions();

        expect(actions[0]).toEqual(
          notifyAndFocus({
            message: '받는 분 이름을 입력해주세요.',
            documentId: 'receiver-name',
          }),
        );
      });
    });
  });

  describe('check continuity', () => {
    (getCheckContinuity as jest.Mock).mockResolvedValueOnce({
      continuityPopupMessage: '오늘 주문이 마감되어, 내일 밤에 배송받으실 수 있습니다. 주문을 계속 진행하시겠습니까?',
    });

    it('isContinuity 를 변경한다.', async () => {
      await store.dispatch(checkContinuity());

      const actions = store.getActions();

      expect(actions[0]).toEqual(
        setValue({
          continuityPopupMessage:
            '오늘 주문이 마감되어, 내일 밤에 배송받으실 수 있습니다. 주문을 계속 진행하시겠습니까?',
        }),
      );
    });
  });

  describe('validateCheckoutOrder - 주문서 결제하기 버튼 클릭 시 밸리데이션', () => {
    context('주문자 정보 이름에 특수문자가 있으면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        deliveryType: 'direct',
      }));
      given('receiverInfo', () => ({
        name: '뷁',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));

      it('보내는 분의 이름을 변경해달라는 알럿을 볼 수 있다.', async () => {
        try {
          await store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo }));
        } catch (e) {
          expect(e.message).toBe(
            '보내는 분 이름에 한글, 영어, 숫자 외 특수문자를 사용할 수 없습니다. /n마이컬리 > 개인정보수정 화면에서 회원 이름을 변경해주세요.',
          );
          expect(e.name).toBe('name');
        }
      });
    });

    context('픽업 상품의 픽업 매장을 선택하지 않았으면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: '',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => true);
      given('selectedPickupPlace', () => undefined);

      it('와인 픽업 매장을 선택해주세요. 알럿을 볼 수 있다.', async () => {
        try {
          await store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo }));
        } catch (e) {
          expect(e.message).toBe('와인 픽업 매장을 선택해주세요.');
          expect(e.name).toBe('name');
        }
      });
    });

    context('적립금 사용 불가 쿠폰을 선택 했으면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: 'asdfasdf',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => false);
      given('totalPrice', () => 10000);
      given('selectedCoupon', () => TOSSPAYMENTS_COUPON_WITH_SHINHAN);
      given('selectedVendor', () => TOSSPAYMENTS_VENDOR);
      given('usedPoint', () => 100);

      it('적립금을 사용할 수 없습니다. 알럿을 볼 수 있다.', async () => {
        try {
          await store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo }));
        } catch (e) {
          expect(e.message).toBe('적립금을 사용할 수 없습니다.');
        }
      });
    });

    context('결제하려는 금액이 100원 미만이면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: 'asdfasdf',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => false);
      given('paymentPrice', () => 0);

      it('최소 결제 금액은 100원 이상입니다. 알럿을 볼 수 있다.', async () => {
        try {
          await store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo }));
        } catch (e) {
          expect(e.message).toBe('최소 결제 금액은 100원 이상입니다.');
        }
      });
    });

    context('결제하려는 금액이 100원 미만이지만 럭키박스만 단건 구매이면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: 'asdfasdf',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => false);
      given('paymentPrice', () => 0);
      given('isLuckyBoxOrder', () => true);

      it('최소 결제 금액은 100원 이상입니다. 에러를 볼 수 없다.', async () => {
        await expect(
          store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo })),
        ).resolves.not.toThrow();
      });
    });

    context('전액 적립금 결제이면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: 'asdfasdf',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => false);
      given('paymentPrice', () => 0);
      given('isUseAllPoint', () => true);

      it('최소 결제 금액은 100원 이상입니다. 에러를 볼 수 없다.', async () => {
        await expect(
          store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo })),
        ).resolves.not.toThrow();
      });
    });

    context('쿠폰으로 결제 금액이 0원이 되면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: 'asdfasdf',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => false);
      given('paymentPrice', () => 0);
      given('isUseAllPoint', () => false);
      given('selectedCoupon', () => KAKAOPAY_COUPON);

      it('최소 결제 금액은 100원 이상입니다. 에러를 볼 수 없다.', async () => {
        await expect(
          store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo })),
        ).resolves.not.toThrow();
      });
    });

    context('약관을 선택하지 않았으면', () => {
      given('receiverForm', () => ({
        ...receiverFormFixtures,
        receivePlace: ReceivePlace.DOOR,
        frontDoorDetail: 'asdfasdf',
      }));
      given('receiverInfo', () => ({
        name: '김컬리',
        phone: '010-1234-1234',
        email: 'kurly@kurlycorp.com',
      }));
      given('isPickupOrder', () => false);
      given('totalPrice', () => 10000);
      given('selectedCoupon', () => undefined);
      given('selectedVendor', () => KAKAOPAY_VENDOR);

      it('결제 진행을 위해 결제 진행 필수 동의에 체크해주세요. 알럿을 볼 수 있다.', async () => {
        try {
          await store.dispatch(validateCheckoutOrder({ receiverInfo: given.receiverInfo }));
        } catch (e) {
          expect(e.message).toBe('결제 진행을 위해 결제 진행 필수 동의에 체크해주세요.');
        }
      });
    });
  });
});
