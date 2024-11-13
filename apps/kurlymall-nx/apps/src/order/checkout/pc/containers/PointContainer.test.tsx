import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { addComma } from '../../../../shared/services';
import { setPoints } from '../../shared/reducers/checkout.slice';

import PointContainer from './PointContainer';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../../../shared/api/members/info');
jest.mock('../../../../shared/api/checkout/checkout');
jest.mock('../../shared/hooks/queries');

describe('PointContainer 테스트', () => {
  let store: MockStoreEnhanced<unknown>;

  given('selectedCoupon', () => undefined);
  given('isEventProducts', () => false);
  given('selectedPlccPoint', () => false);
  given('usedPoint', () => 0);
  given('availablePoint', () => ({
    free: 5000,
    paid: 5000,
  }));

  const renderPointContainer = () => render(<PointContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        hasSession: true,
        isGuest: false,
      },
      checkout: {
        availablePoint: given.availablePoint,
        usedPoint: given.usedPoint,
        isEventProducts: given.isEventProducts,
        price: {
          totalPrice: 100000,
          deliveryPrice: 0,
        },
      },
      checkoutCoupon: {
        selectedCoupon: given.selectedCoupon,
      },
      checkoutPayment: {
        selectedPlccPoint: given.selectedPlccPoint,
      },
      member: {
        pointBenefit: {
          percent: 3,
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (usePreviousVendorQuery as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  it('사용가능 잔액을 볼 수 있다', () => {
    const { container } = renderPointContainer();

    expect(container).toHaveTextContent(
      `사용가능 잔액${addComma(given.availablePoint.free + given.availablePoint.paid)} 원`,
    );
  });

  it('무상 적립금 잔액을 볼 수 있다', () => {
    const { container } = renderPointContainer();

    expect(container).toHaveTextContent(`적립금${addComma(given.availablePoint.free)} 원`);
  });

  it('유상 적립금(컬리캐시) 잔액을 볼 수 있다', () => {
    const { container } = renderPointContainer();

    expect(container).toHaveTextContent(`컬리캐시`);
    expect(container).toHaveTextContent(`${addComma(given.availablePoint.paid)} 원`);
  });

  context('적립금 사용 불가 결제수단이면', () => {
    given('selectedCoupon', () => ({
      name: '카카오페이 결제수단 쿠폰',
      paymentGateways: ['kakao-pay'],
    }));

    it('사용 불가 메세지를 볼 수 있다', () => {
      const { container } = renderPointContainer();

      expect(container).toHaveTextContent('[카카오페이 전용쿠폰] 사용 시 적립금*컬리캐시 사용 불가');
    });
  });

  context('적립금 사용 불가 쿠폰이면', () => {
    given('selectedCoupon', () => ({
      name: '적립금 사용불가 쿠폰',
      paymentGateways: ['ALL'],
      pointAllowed: false,
    }));

    it('사용 불가 메세지를 볼 수 있다', () => {
      const { container } = renderPointContainer();

      expect(container).toHaveTextContent('적립금*컬리캐시 사용 불가 쿠폰 입니다.');
    });
  });

  context('적립금 변경 시', () => {
    given('usedPoint', () => 0);

    it('setPoints 액션이 실행 된다', () => {
      const { getByTestId } = renderPointContainer();

      fireEvent.change(getByTestId('input-box'), {
        target: {
          name: 'point-usage',
          value: 5000,
        },
      });

      const actions = store.getActions();

      expect(actions).toHaveLength(1);
      expect(actions[0]).toEqual(setPoints(5000));
    });
  });

  context('모두사용 버튼을 누르면', () => {
    given('usedPoint', () => 100);
    given('availablePoint', () => ({
      free: 5000,
      paid: 5000,
    }));

    it('setPoints 액션이 실행 된다', async () => {
      const { getByText } = renderPointContainer();

      fireEvent.click(getByText('모두사용'));

      const actions = store.getActions();

      expect(actions).toHaveLength(1);
      expect(actions[0]).toEqual(setPoints(given.availablePoint.free + given.availablePoint.paid));
    });
  });

  context('이벤트 상품이 있으면', () => {
    given('isEventProducts', () => true);

    it('[이벤트] 상품 구매시 적립금*컬리캐시 사용 불가 문구를 볼 수 있다.', () => {
      const { container } = renderPointContainer();

      expect(container).toHaveTextContent('[이벤트] 상품 구매시 적립금*컬리캐시 사용 불가');
    });

    it('적립금*컬리캐시 사용을 할 수 없다.', () => {
      const { getByText } = renderPointContainer();

      expect(getByText('모두사용').closest('button')).toBeDisabled();
    });
  });
});
