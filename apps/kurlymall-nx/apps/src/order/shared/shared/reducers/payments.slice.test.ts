import router from 'next/router';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { waitFor } from '@testing-library/react';

import reducer, { completeOrder, initialState, setValue, submitCheckoutOrder } from './payments.slice';

import { placeOrder, paymentComplete } from '../services/payments.service';
import appService from '../../../../shared/services/app.service';
import { ORDER_SERVICE_FAIL, ORDER_SUCCESS } from '../../../../shared/services';

import { calculatedPriceFixture } from '../../../../../fixtures';
import { isPaymentWebview } from '../../../../../util/window/getDevice';
import { getOrderParams } from '../utils/getOrderParams';
import { CART_PATH, getPageUrl, ORDER_PATH } from '../../../../shared/constant';
import { CompleteOrderProps, PaymentCompleteRequest } from '../../../../shared/interfaces';
import { deletePreferenceMethods, updatePreferenceMethods } from '../../../../shared/api';

import Alert from '../../../../shared/components/Alert/Alert';
import { isViewPackagePaymentResult } from '../../../checkout/shared/utils';
import { getOrderSuccessDataForApp } from '../utils/orderResult';
import { getTermsList } from '../utils';
import { mockCheckoutProducts } from '../../../../../fixtures/checkout/checkout-fixtures';
import { KAKAOPAY_VENDOR } from '../../../../../fixtures/checkout/payment-vendors';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services/payments.service');
jest.mock('../../../../shared/services/app.service');
jest.mock('../../../../../util/window/getDevice');
jest.mock('../../../../shared/components/Alert/Alert');
jest.mock('../../../../shared/api');
jest.mock('../utils/getOrderParams');

jest.mock('next/router', () => ({
  push: jest.fn(),
  replace: jest.fn(),
}));

describe('Payments Slice', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  const mockGetDevice = jest.requireMock('../../../../../util/window/getDevice');

  // payments slice
  given('isPaymentsLoading', () => false);
  given('groupOrderNo', () => '1234');

  // checkout slice
  given('receiverForm', () => undefined);
  given('selectedVendor', () => KAKAOPAY_VENDOR);
  given('selectedCreditCard', () => ({ name: 'KB국민', value: '11' }));
  given('selectedInstallment', () => ({ name: '일시불', value: '0' }));
  given('selectedCoupon', () => undefined);
  given('usedPoint', () => 0);
  given('reusablePackage', () => ({
    selected: 'PAPER',
  }));
  given('terms', () =>
    getTermsList({
      isGiftOrder: false,
      code: given.selectedVendor.code,
    }).map((item) => ({
      ...item,
      agreed: true,
    })),
  );

  given('isUseAllPoint', () => false);
  given('isPreferencePayment', () => true);
  given('price', () => ({
    ...calculatedPriceFixture,
  }));

  // 와인 상품
  given('isPickupOrder', () => false);
  given('selectedPickupPlace', () => undefined);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        products: mockCheckoutProducts,
        usedPoint: given.usedPoint,
        reusablePackage: given.reusablePackage,
        price: given.price,
        isUseAllPoint: given.isUseAllPoint,
      },
      checkoutPayment: {
        selectedVendor: given.selectedVendor,
        selectedCreditCard: given.selectedCreditCard,
        selectedInstallment: given.selectedInstallment,
        isPreferencePayment: given.isPreferencePayment,
      },
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      payments: {
        isPaymentsLoading: given.isPaymentsLoading,
      },
      member: {
        info: {
          memberNo: 1,
          id: 'id',
          name: 'name',
          email: 'email',
          mobile: '010-1234-1234',
        },
      },
    }));
    mockGetDevice.isPC = true;

    (deletePreferenceMethods as jest.Mock).mockResolvedValue({});
    (updatePreferenceMethods as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setValue', () => {
    it('updates with value', () => {
      const { isPaymentsLoading } = reducer(
        initialState,
        setValue({
          isPaymentsLoading: true,
        }),
      );

      expect(isPaymentsLoading).toBeTruthy();
    });
  });

  describe('submitCheckoutOrder - 주문시작 (주문서)', () => {
    context('isPaymentsLoading이 true 이면', () => {
      given('isPaymentsLoading', () => true);

      it('calls actions가 일어나지 않는다.', () => {
        store.dispatch(submitCheckoutOrder());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('주문시작 API 호출을 성공하면', () => {
      it('getOrderParams을 호출한다.', async () => {
        const placeOrderResponse = {
          groupOrderNo: given.groupOrderNo,
          paymentAuthParameter: {
            tossPaymentsParameter: {},
            paymentGatewayTransactionId: 'pgTransactionId',
            paymentGatewayToken: 'pgToken',
          },
          paymentUrlParameter: {
            nextRedirectMobileUrl: 'nextRedirectMobileUrl',
            nextRedirectPcUrl: 'nextRedirectPcUrl',
          },
        };

        (placeOrder as jest.Mock).mockResolvedValue(placeOrderResponse);

        store.dispatch(submitCheckoutOrder());

        await waitFor(() => {
          expect(getOrderParams).toHaveBeenCalledWith({
            placeOrderResponse,
            selectedVendorCode: given.selectedVendor.code,
            isJoinOrder: false,
          });
        });
      });
    });

    context('주문시작 API 호출을 실패하면', () => {
      it('getOrderParams을 호출하지 않는다.', async () => {
        (placeOrder as jest.Mock).mockRejectedValue({
          code: '9999',
          success: false,
          message: 'message',
        });

        store.dispatch(submitCheckoutOrder());

        await waitFor(() => {
          expect(getOrderParams).not.toBeCalled();
        });
      });
    });
  });

  describe('completeOrder - 결제완료 (주문서)', () => {
    const groupOrderNo = '78910';
    const transactionId = 'testId';
    const paymentCompleteRequest: PaymentCompleteRequest = {
      groupOrderNo,
      paymentGatewayAuthNo: transactionId,
      paymentGatewayAuthToken: transactionId,
      paymentGatewayToken: transactionId,
      paymentGatewayTransactionId: transactionId,
    };
    const completeOrderParams: CompleteOrderProps = {
      ...paymentCompleteRequest,
      selectedVendorCode: 'kakao-pay',
      paymentGatewayResult: '',
      paymentGatewayMessage: '',
    };

    given('isPaymentsLoading', () => false);

    context('주문을 성공하면', () => {
      beforeEach(() => {
        (paymentComplete as jest.Mock).mockResolvedValue({
          success: true,
          message: null,
          data: {
            ordererName: 'Lavender',
            ordererMemberGroup: 1,
            ordererMemberGroupName: '일반',
            ordererPointRatio: 5,
            isFirstPurchased: false,
            totalPaymentPrice: 58400,
            totalAccruedPoint: 584,
            packingType: 'PAPER',
            memberships: [],
            orderDealProducts: [
              {
                dealProductNo: 10031441,
                dealProductName: '[KF365] DOLE 실속 바나나 1kg (필리핀)',
                contentsProductNo: 5031441,
                contentsProductName: '[KF365] DOLE 실속 바나나 1kg (필리핀)',
                masterProductCode: 'MK0000031441',
                quantity: 2,
                retailPrice: 0,
                productPrice: 2980,
                discountPrice: 0,
                deliveryPolicy: 'NORMAL_PARCEL',
              },
            ],
            isKurlypayPlccMember: false,
            paymentGatewayId: 'naver-pay',
            deliveryPrice: 3000,
            totalCouponDiscountPrice: 0,
            totalUsedPoint: 0,
            couponCode: null,
            couponName: null,
            displayMessage: {
              deliveryNotice: {
                text: '',
              },
            },
          },
        });
      });

      context('Webview일 때', () => {
        it('ORDER_SUCCESS가 담긴 메세지를 앱에 전송한다.', async () => {
          (isPaymentWebview as jest.Mock).mockReturnValue(true);

          store.dispatch(completeOrder(completeOrderParams));

          const { success, data } = await paymentComplete(paymentCompleteRequest);

          await waitFor(() => {
            expect(success).toBe(true);
            expect(appService.postCheckoutResult).toBeCalledWith({
              code: ORDER_SUCCESS,
              data: getOrderSuccessDataForApp(data),
              error: null,
              message: null,
            });
          });
        });
      });

      context('Webview가 아닐 때', () => {
        it('state에 주문 결과를 저장하고 주문 성공 페이지로 이동한다.', async () => {
          (isPaymentWebview as jest.Mock).mockReturnValue(false);

          store.dispatch(completeOrder(completeOrderParams));

          const actions = store.getActions();
          const { success, message, data } = await paymentComplete(paymentCompleteRequest);

          await waitFor(() => {
            expect(actions[0]).toEqual(
              setValue({
                paymentsResult: {
                  name: data.ordererName ?? '',
                  reason: message,
                  resultCode: success ? 0 : 1,
                  isFirstOrder: data.isFirstPurchased ?? false,
                  totalPrice: data.totalPaymentPrice ?? 0,
                  expectedPoint: data.totalAccruedPoint ?? 0,
                  benefitPercent: data.ordererPointRatio,
                  reusablePackageType: data.packingType ?? 'PAPER',
                  displayMessages: data.displayMessages,
                  isKurlypayPlccMember: data.isKurlypayPlccMember,
                  memberships: [],
                  orderDealProducts: [
                    {
                      dealProductNo: 10031441,
                      dealProductName: '[KF365] DOLE 실속 바나나 1kg (필리핀)',
                      contentsProductNo: 5031441,
                      contentsProductName: '[KF365] DOLE 실속 바나나 1kg (필리핀)',
                      masterProductCode: 'MK0000031441',
                      quantity: 2,
                      retailPrice: 0,
                      productPrice: 2980,
                      discountPrice: 0,
                      deliveryPolicy: 'NORMAL_PARCEL',
                    },
                  ],
                  paymentGatewayId: 'naver-pay',
                  deliveryPrice: 3000,
                  totalCouponDiscountPrice: 0,
                  totalUsedPoint: 0,
                  couponCode: null,
                  couponName: null,
                  isGiftPurchase: false,
                  isViewPackage: isViewPackagePaymentResult({
                    packageType: 'PAPER',
                  }),
                  externalGroupOrderNo: '',
                  availableDate: '',
                  notificationType: 'KAKAO_TALK',
                  orderedDate: '',
                  recipientName: '',
                },
              }),
            );
            expect(router.replace).toHaveBeenCalledWith(`${getPageUrl(ORDER_PATH.success)}?orderNo=${groupOrderNo}`);
          });
        });
      });
    });

    context('주문을 실패하면', () => {
      beforeEach(() => {
        (paymentComplete as jest.Mock).mockRejectedValue({
          response: {
            data: {
              code: '9999',
              success: false,
              message: 'message',
            },
          },
        });
      });

      context('Webview일 때', () => {
        it('ORDER_SERVICE_FAIL이 담긴 메세지를 앱에 전송한다.', async () => {
          (isPaymentWebview as jest.Mock).mockReturnValue(true);

          store.dispatch(completeOrder(completeOrderParams));

          await waitFor(() => {
            expect(appService.postCheckoutResult).toBeCalledWith({
              code: ORDER_SERVICE_FAIL,
              data: null,
              error: {
                code: '9999',
                success: false,
                message: 'message',
              },
              message: null,
            });
          });
        });
      });

      context('Webview가 아닐 때', () => {
        context('에러코드가 9999 이면', () => {
          it('Alert를 띄우고 주문 실패 페이지로 이동한다.', async () => {
            (isPaymentWebview as jest.Mock).mockReturnValue(false);

            store.dispatch(completeOrder(completeOrderParams));

            await waitFor(() => {
              expect(Alert).toHaveBeenCalledWith({ text: '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.' });
              expect(router.replace).toHaveBeenCalledWith(`${ORDER_PATH.fail.uri}?orderNo=${groupOrderNo}`);
            });
          });
        });

        context('에러코드가 9001 이면', () => {
          it('Alert를 띄우고 장바구니 페이지로 이동한다.', async () => {
            (paymentComplete as jest.Mock).mockRejectedValueOnce({
              response: {
                data: {
                  code: '9001',
                  success: false,
                  message: 'message',
                },
              },
            });
            (isPaymentWebview as jest.Mock).mockReturnValue(false);

            store.dispatch(completeOrder(completeOrderParams));

            await waitFor(() => {
              expect(Alert).toHaveBeenCalledWith({ text: '주문 정보가 변경되었습니다.\n주문을 다시 시도해 주세요.' });
              expect(router.replace).toHaveBeenCalledWith(getPageUrl(CART_PATH.cart));
            });
          });
        });
      });
    });
  });
});
