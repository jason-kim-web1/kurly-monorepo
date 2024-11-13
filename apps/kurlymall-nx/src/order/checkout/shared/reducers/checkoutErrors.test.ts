import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { screen, waitFor } from '@testing-library/react';

import { CART_PATH, getPageUrl, ORDER_PATH, PAYMENT_GIFT_PATH, USER_MENU_PATH } from '../../../../shared/constant';

import {
  ReturnCancelError,
  ReturnCartError,
  JoinOrderError,
  ReturnMainError,
  TAMError,
  UnauthenticatedError,
  OnlyMembersProductsError,
} from '../../../../shared/errors';
import {
  notify,
  notifyAndFinishRefreshWebview,
  notifyAndRedirectTo,
  redirectTo,
} from '../../../../shared/reducers/page';
import { isWebview } from '../../../../../util/window/getDevice';

import { handleContinuityError, checkoutError, handlePlaceOrderError } from './checkoutErrors';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { mockCheckoutProducts, mockGiftCheckoutProduct } from '../../../../../fixtures/checkout/checkout-fixtures';
import { RootState } from '../../../../shared/store';

const mockStore = configureStore(getDefaultMiddleware({ thunk: true }));

jest.mock('react-redux');
jest.mock('../../../../shared/services/app.service');
jest.mock('../../../../../util/window/getDevice');

describe('주문서 에러 처리', () => {
  let store: MockStoreEnhanced<unknown, any>;

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  describe('주문서 api 기본 에러처리', () => {
    context('웹뷰일 때 에러가 발생하면', () => {
      it('notifyAndFinishRefreshWebview action 을 실행한다.', () => {
        store = mockStore({});

        const error = new Error('Error 발생');

        (isWebview as jest.Mock).mockReturnValueOnce(true);

        store.dispatch(checkoutError(error));

        const actions = store.getActions();

        expect(actions[0]).toEqual(notifyAndFinishRefreshWebview(error.message));
      });
    });

    context('웹 일 때 에러가 발생하면', () => {
      it('notifyAndRedirectTo action을 실행한다.', () => {
        store = mockStore({});

        const error = new Error('Error 발생');

        (isWebview as jest.Mock).mockReturnValueOnce(false);

        store.dispatch(checkoutError(error));

        const actions = store.getActions();

        expect(actions[0]).toEqual(
          notifyAndRedirectTo({
            message: error.message,
            redirectUrl: getPageUrl(CART_PATH.cart),
          }),
        );
      });
    });
  });

  describe('컨티뉴이티 에러', () => {
    context.each([
      {
        error: new ReturnCartError('ReturnCartError 발생'),
      },
      { error: new TAMError('TAMError 발생') },
    ])('웹에서 컨티뉴이티 조회 에러가 ReturnCartError, TAMError 이면', ({ error }) => {
      it('notifyAndRedirectTo action을 실행한다.', () => {
        store = mockStore({});

        (isWebview as jest.Mock).mockReturnValueOnce(false);

        store.dispatch(handleContinuityError(error));

        const actions = store.getActions();

        expect(actions[0]).toEqual(
          notifyAndRedirectTo({
            message: error.message,
            redirectUrl: getPageUrl(CART_PATH.cart),
          }),
        );
      });
    });

    context.each([
      {
        error: new ReturnCartError('ReturnCartError 발생'),
      },
      { error: new TAMError('TAMError 발생') },
    ])('webview 에서 컨티뉴이티 조회 에러가 ReturnCartError, TAMError 이면', ({ error }) => {
      it('notifyAndFinishRefreshWebview action 을 실행한다.', () => {
        store = mockStore({});

        (isWebview as jest.Mock).mockReturnValueOnce(true);

        store.dispatch(handleContinuityError(error));

        const actions = store.getActions();

        expect(actions[0]).toEqual(notifyAndFinishRefreshWebview(error.message));
      });
    });

    context('그외의 에러는', () => {
      it('throw 한다.', async () => {
        store = mockStore({});

        const error = new Error('test');

        try {
          await store.dispatch(handleContinuityError(error));
        } catch (err) {
          expect(err).toEqual(error);
        }
      });
    });
  });

  describe('주문서 생성 에러', () => {
    context('웹 일 때', () => {
      (isWebview as jest.Mock).mockReturnValue(false);

      context('ReturnCancelError 발생 시', () => {
        const error = new ReturnCancelError('ReturnCancelError 발생');

        context('일반 주문이면', () => {
          it('notifyAndRedirectTo action을 실행하고 일반 주문 실패 페이지로 이동한다.', () => {
            store = mockStore({
              checkout: {
                products: mockCheckoutProducts,
                isGiftOrder: false,
              },
            });

            store.dispatch(handlePlaceOrderError({ err: error }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              notifyAndRedirectTo({
                message: error.message,
                redirectUrl: getPageUrl(ORDER_PATH.fail),
              }),
            );
          });
        });

        context('선물하기 주문이면', () => {
          it('notifyAndRedirectTo action을 실행하고 선물하기 주문 실패 페이지로 이동한다.', () => {
            store = mockStore({
              checkout: {
                products: mockGiftCheckoutProduct,
                isGiftOrder: true,
              },
            });

            store.dispatch(handlePlaceOrderError({ err: error }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              notifyAndRedirectTo({
                message: error.message,
                redirectUrl: getPageUrl(PAYMENT_GIFT_PATH.fail),
              }),
            );
          });
        });
      });

      context.each`
        name | error
        ${'ReturnCartError'} | ${new ReturnCartError('ReturnCartError')},
        ${'TAMError'} | ${new TAMError('TAMError')},
      `('$name 발생 시', ({ error }) => {
        context('일반 상품이면', () => {
          it('notifyAndRedirectTo action을 실행하고 장바구니 페이지로 이동한다', () => {
            store = mockStore({
              checkout: {
                products: mockCheckoutProducts,
                isGiftOrder: false,
                isDirectCheckout: false,
              },
            });

            store.dispatch(handlePlaceOrderError({ err: error }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              notifyAndRedirectTo({
                message: error.message,
                redirectUrl: getPageUrl(CART_PATH.cart),
                dismissedRedirect: true,
              }),
            );
          });
        });

        context('선물하기 또는 바로구매 상품이면', () => {
          it('notifyAndRedirectTo action을 실행하고 상품상세 페이지로 이동한다', () => {
            store = mockStore({
              checkout: {
                products: mockGiftCheckoutProduct,
                isGiftOrder: true,
                isDirectCheckout: false,
              },
            });

            store.dispatch(
              handlePlaceOrderError({
                err: error,
              }),
            );

            const actions = store.getActions();

            const { checkout } = store.getState() as RootState;

            expect(actions[0]).toEqual(
              notifyAndRedirectTo({
                message: error.message,
                redirectUrl: `/goods/${checkout.products?.[0].contentProductNo}`,
                dismissedRedirect: true,
              }),
            );
          });
        });
      });

      context('ReturnMainError 발생 시', () => {
        const error = new ReturnMainError('ReturnMainError 발생');

        it('notifyAndRedirectTo action을 실행하고, main url 로 간다.', () => {
          store = mockStore({
            checkout: {
              products: mockCheckoutProducts,
            },
          });

          store.dispatch(
            handlePlaceOrderError({
              err: error,
            }),
          );

          const actions = store.getActions();

          expect(actions[0]).toEqual(
            notifyAndRedirectTo({
              message: error.message,
              redirectUrl: USER_MENU_PATH.home.uri,
              dismissedRedirect: true,
            }),
          );
        });
      });

      context('OnlyMembersProductsError 발생 시', () => {
        const message = '컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?';
        const error = new OnlyMembersProductsError(message);

        it('멤버스 가입 유도 alert 을 띄운다.', async () => {
          store = mockStore({
            checkout: {
              products: mockCheckoutProducts,
            },
          });

          store.dispatch(handlePlaceOrderError({ err: error }));

          await waitFor(() => {
            expect(screen.getByText(message)).toBeInTheDocument();
          });
        });
      });

      context('그 외의 에러는', () => {
        const error = new Error('그 외의 에러');

        it('notify 를 실행한다.', () => {
          store = mockStore({
            checkout: {
              products: mockCheckoutProducts,
            },
          });

          store.dispatch(handlePlaceOrderError({ err: error }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(notify(error.message));
        });
      });
    });

    context('웹뷰에서', () => {
      context.each`
        name | error
        ${'ReturnCartError'} | ${new ReturnCartError('ReturnCartError')},
        ${'JoinOrderError'} | ${new JoinOrderError('JoinOrderError')},
        ${'TAMError'} | ${new TAMError('TAMError')},
        ${'UnauthenticatedError'} | ${new UnauthenticatedError(new Error('UnauthenticatedError'))},
      `('$name 가 발생하면', ({ error }) => {
        it('notifyAndFinishRefreshWebview action을 호출한다.', () => {
          store = mockStore({
            checkout: {
              products: mockCheckoutProducts,
            },
          });

          (isWebview as jest.Mock).mockReturnValue(true);

          store.dispatch(handlePlaceOrderError({ err: error }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(notifyAndFinishRefreshWebview(error.message));
        });
      });

      context('ReturnMainError 가 발생하면', () => {
        const error = new ReturnMainError('ReturnMainError');

        it('notifyAndRedirectTo action 을 실행한다.', () => {
          store = mockStore({
            checkout: {
              products: mockCheckoutProducts,
            },
          });

          (isWebview as jest.Mock).mockReturnValue(true);

          store.dispatch(handlePlaceOrderError({ err: error }));

          const actions = store.getActions();

          expect(actions[0]).toEqual(
            notifyAndRedirectTo({
              message: 'ReturnMainError',
              redirectUrl: deepLinkUrl.HOME,
            }),
          );
        });
      });

      context('OnlyMembersProductsError 가 발생하면', () => {
        const message = '컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?';
        const error = new OnlyMembersProductsError(message);

        it('멤버스 가입 유도 alert 을 띄운다.', async () => {
          store = mockStore({
            checkout: {
              products: mockCheckoutProducts,
            },
          });

          store.dispatch(handlePlaceOrderError({ err: error }));

          await waitFor(() => {
            expect(screen.getByText(message)).toBeInTheDocument();
          });
        });
      });

      context('ReturnCancelError 가 발생하면', () => {
        const error = new ReturnCancelError('ReturnCancelError');

        context('선물하기 주문이면', () => {
          it('선물 주문 실패 페이지로 이동한다.', () => {
            store = mockStore({
              checkout: {
                products: mockGiftCheckoutProduct,
                isGiftOrder: true,
              },
            });

            (isWebview as jest.Mock).mockReturnValue(true);

            store.dispatch(handlePlaceOrderError({ err: error }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(redirectTo({ url: getPageUrl(PAYMENT_GIFT_PATH.fail) }));
          });
        });

        context('선물하기 주문이 아니면', () => {
          it('일반 주문 실패 페이지로 이동한다.', () => {
            store = mockStore({
              checkout: {
                products: mockCheckoutProducts,
                isGiftOrder: false,
              },
            });

            (isWebview as jest.Mock).mockReturnValue(true);

            store.dispatch(handlePlaceOrderError({ err: error }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(redirectTo({ url: getPageUrl(ORDER_PATH.fail) }));
          });
        });
      });
    });
  });
});
