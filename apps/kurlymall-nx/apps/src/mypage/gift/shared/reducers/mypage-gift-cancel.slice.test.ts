import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { waitFor } from '@testing-library/react';

import {
  initialState,
  setOrderNo,
  startLoading,
  endLoading,
  setCancelReason,
  setCancelReasonEtc,
  setCancelInfo,
  setFailMessage,
  loadCancelOrder,
  postCancelOrder,
  mypageGiftCancelReducer,
} from './mypage-gift-cancel.slice';
import { GiftDetails } from '../../../../shared/interfaces/Gift';
import { mockGiftDetails } from '../../../../../fixtures';
import { fetchOrderDetail, postOrderCancel } from '../services/mypage-gift.service';
import { GiftOrderStatus } from '../enum/GiftOrderStatus.enum';
import { notifyAndRedirectTo, redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, GIFT_PATH } from '../../../../shared/constant';

jest.mock('react-redux');
jest.mock('next/router');
jest.mock('../services/mypage-gift.service');

const mockStore = configureStore(getDefaultMiddleware());

describe('Mypage Gift Cancel 주문 취소 테스트', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  const mock: GiftDetails = mockGiftDetails;

  given('orderNo', () => 1234567890);
  given('fetchOrderDetailResponse', () => null);
  given('selectedReason', () => '단순변심');
  given('etcReason', () => '');
  given('checkDirectOrderProductsResponse', () => null);

  beforeEach(() => {
    store = mockStore(() => ({
      mypageGiftCancel: {
        ...initialState,
        orderNo: given.orderNo,
        selectedReason: given.selectedReason,
        etcReason: given.etcReason,
      },
    }));

    (fetchOrderDetail as jest.Mock).mockImplementation(() => given.fetchOrderDetailResponse);
  });

  describe('MyPage Gift Cancel reducer', () => {
    describe('setOrderNo 테스트', () => {
      given('orderNo', () => '1234567890');

      it('orderNo 값을 변경한다.', () => {
        const { orderNo } = mypageGiftCancelReducer(initialState, setOrderNo(given.orderNo));

        expect(orderNo).toBe(given.orderNo);
      });
    });

    describe('Loading 테스트', () => {
      context('startLoading 실행 시', () => {
        it('isLoading 값을 true 로 변경한다.', () => {
          const { isLoading } = mypageGiftCancelReducer(initialState, startLoading());

          expect(isLoading).toBeTruthy();
        });
      });

      context('endLoading 실행 시', () => {
        it('isLoading 값을 false 로 변경한다.', () => {
          const { isLoading } = mypageGiftCancelReducer(initialState, endLoading());

          expect(isLoading).toBeFalsy();
        });
      });
    });

    describe('setCancelReason 테스트', () => {
      given('selectedReason', () => '취소 사유');

      it('selectedReason 값을 변경한다.', () => {
        const { selectedReason } = mypageGiftCancelReducer(initialState, setCancelReason(given.selectedReason));

        expect(selectedReason).toBe(given.selectedReason);
      });
    });

    describe('setCancelReasonEtc 테스트', () => {
      given('etcReason', () => '기타 취소 사유');

      it('etcReason 값을 변경한다.', () => {
        const { etcReason } = mypageGiftCancelReducer(initialState, setCancelReasonEtc(given.etcReason));

        expect(etcReason).toBe(given.etcReason);
      });
    });

    describe('setCancelInfo 테스트', () => {
      given('cancelInfo', () => ({
        summary: '',
        price: {
          totalDealProductPrice: 0,
          totalDealProductDiscountPrice: 0,
          totalCouponDiscountPrice: 0,
          totalUsedFreePoint: 0,
          totalUsedPaidPoint: 0,
          totalPaymentPrice: 0,
          totalAccruedPoint: 0,
          deliveryPrice: 0,
        },
      }));

      it('cancelInfo 값을 변경한다.', () => {
        const { cancelInfo } = mypageGiftCancelReducer(initialState, setCancelInfo(given.cancelInfo));

        expect(cancelInfo).toBe(given.cancelInfo);
      });
    });

    describe('setFailMessage 테스트', () => {
      given('failMessage', () => '취소 실패 사유');

      it('failMessage 값을 변경한다.', () => {
        const { failMessage } = mypageGiftCancelReducer(initialState, setFailMessage(given.failMessage));

        expect(failMessage).toBe(given.failMessage);
      });
    });
  });

  describe('MyPage Cancel Thunk', () => {
    describe('주문 취소 시 필요한 주문 내역 조회 - loadCancelOrder 테스트', () => {
      given('orderNo', () => '1234567890');

      context.each([
        {
          isSelfCancelable: false,
          status: GiftOrderStatus.ACCEPTED,
          message: '배송준비가 시작되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
        },
        {
          isSelfCancelable: false,
          status: GiftOrderStatus.DELIVERED,
          message: '배송이 완료되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
        },
        {
          isSelfCancelable: false,
          status: GiftOrderStatus.CANCELED,
          message: '이미 취소된 상품이 포함되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
        },
        {
          isSelfCancelable: false,
          status: GiftOrderStatus.REJECTED,
          message: '이미 취소된 상품이 포함되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
        },
        {
          isSelfCancelable: false,
          status: GiftOrderStatus.READY_FOR_ACCEPT,
          message: '상품준비가 시작되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
        },
      ])('선물 주문 취소가 불가능하면 선물 주문 상태에 따라', ({ isSelfCancelable, status, message }) => {
        given('fetchOrderDetailResponse', () => ({
          isSelfCancelable,
          status,
          orders: [],
        }));

        it('failMessage 를 노출하고 주문 실패 페이지로 이동한다.', async () => {
          store.dispatch(loadCancelOrder(given.orderNo));

          await waitFor(() => {
            const actions = store.getActions();

            expect(actions).toHaveLength(4);
            expect(actions[0]).toEqual(startLoading());
            expect(actions[1]).toEqual(setFailMessage(message));
            expect(actions[2]).toEqual(
              notifyAndRedirectTo({
                message,
                redirectUrl: getPageUrl(GIFT_PATH.cancelFail),
              }),
            );
            expect(actions[3]).toEqual(endLoading());
          });
        });
      });

      describe('취소 가능 테스트', () => {
        context('일반 상품이면', () => {
          given('fetchOrderDetailResponse', () => ({
            isSelfCancelable: true,
            status: GiftOrderStatus.READY_FOR_ACCEPT,
            orders: [mock],
          }));

          it('환불 정보를 업데이트 한다.', async () => {
            store.dispatch(loadCancelOrder(given.orderNo));

            await waitFor(() => {
              const actions = store.getActions();

              expect(actions).toHaveLength(4);
              expect(actions[0]).toEqual(startLoading());
              expect(actions[1]).toEqual(setOrderNo(given.orderNo));
              expect(actions[2].type).toEqual('mypageGiftCancel/setCancelInfo');
              expect(actions[3]).toEqual(endLoading());
            });
          });
        });
      });

      describe('주문 취소 요청 - postCancelOrder 테스트', () => {
        given('orderNo', () => '1234567890');

        describe('주문 취소 성공 테스트', () => {
          beforeEach(() => {
            (postOrderCancel as jest.Mock).mockResolvedValue(() => Promise.resolve({ success: true }));
          });

          context('일반 사유', () => {
            given('selectedReason', () => '단순변심');
            given('etcReason', () => '');

            it('주문 취소 성공 페이지로 이동한다.', async () => {
              store.dispatch(postCancelOrder());

              await waitFor(() => {
                const actions = store.getActions();

                expect(actions).toHaveLength(1);
                expect(actions[0]).toEqual(
                  redirectTo({
                    url: getPageUrl(GIFT_PATH.cancelSuccess),
                    replace: true,
                  }),
                );
              });
            });
          });

          context('기타 사유', () => {
            given('selectedReason', () => '기타');
            given('etcReason', () => '기타 사유');

            it('주문 취소 성공 페이지로 이동한다.', async () => {
              store.dispatch(postCancelOrder());

              await waitFor(() => {
                const actions = store.getActions();

                expect(actions).toHaveLength(1);
                expect(actions[0]).toEqual(
                  redirectTo({
                    url: getPageUrl(GIFT_PATH.cancelSuccess),
                    replace: true,
                  }),
                );
              });
            });
          });
        });

        context('주문 취소 실패 테스트', () => {
          beforeEach(() => {
            (postOrderCancel as jest.Mock).mockRejectedValue(new Error('실패 메세지'));
          });

          it('주문 취소 실패 페이지로 이동한다.', async () => {
            store.dispatch(postCancelOrder());

            await waitFor(() => {
              const actions = store.getActions();

              expect(actions).toHaveLength(1);
              expect(actions[0]).toEqual(
                notifyAndRedirectTo({
                  message: '실패 메세지',
                  redirectUrl: getPageUrl(GIFT_PATH.cancelFail),
                }),
              );
            });
          });
        });
      });
    });
  });
});
