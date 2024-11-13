import { fireEvent, render, waitFor } from '@testing-library/react';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { initialState as paymentsInitialState } from '../../../shared/shared/reducers/payments.slice';
import { useWebview } from '../../../../shared/hooks';

import { memberPointBenefitFixture } from '../../../../../fixtures';
import { extractAuthentication } from '../../../../shared/utils/token';

import SuccessContainer from './SuccessContainer';

import { QueryClientWrapper } from '../../../../shared/react-query';
import Alert from '../../../../shared/components/Alert/Alert';
import { ORDER_NO_SUCCESS_MESSAGE } from '../../shared/constants/copy-alert-message';
import { initialState } from '../../../../shared/reducers/page';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('next/router');
jest.mock('../../../../shared/utils/token');
jest.mock('../../../../shared/hooks');
jest.mock('../../../../shared/components/Alert/Alert');

describe('SuccessContainer 컴포넌트 테스트', () => {
  const push = jest.fn();
  document.execCommand = jest.fn();

  given('orderNo', () => '12345');
  given('paymentsResult', () => ({ ...paymentsInitialState.paymentsResult, isViewPackage: true }));
  given('currentAddress', () => undefined);
  given('pointBenefit', () => memberPointBenefitFixture);

  let store: MockStoreEnhanced<unknown>;

  const renderSuccessContainer = () =>
    render(
      <QueryClientWrapper>
        <SuccessContainer />
      </QueryClientWrapper>,
    );

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        accessToken: given.accessToken,
      },
      checkout: {
        isUseAllPoint: given.isUseAllPoint,
      },
      payments: {
        paymentsResult: given.paymentsResult,
      },
      shippingAddress: {
        currentAddress: given.currentAddress,
      },
      member: {
        pointBenefit: given.pointBenefit,
      },
      page: initialState,
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        orderNo: given.orderNo,
      },
      push,
    }));
    (useWebview as jest.Mock).mockImplementation(() => false);
    (extractAuthentication as jest.Mock).mockImplementation(() => ({
      accessToken: '',
      uid: 'uid',
      isGuest: false,
      cartId: 'cartId',
      memberId: 'memberId',
      isExpired: false,
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  context('픽업 주문 성공시', () => {
    given('paymentsResult', () => ({
      ...paymentsInitialState.paymentsResult,
      isDeliveryOrder: false,
      address: '강남구 테헤란로 133',
      addressDetail: '15층',
    }));

    // it('픽업 주문 완료에 대한 정책 문구를 볼 수 있다.', () => {
    //   const { container } = renderSuccessContainer();

    //   expect(container).toHaveTextContent(PICKUP_POLICY[0]);
    // });

    it('배송지 영역을 노출하지 않는다.', () => {
      const { container } = renderSuccessContainer();

      expect(container).not.toHaveTextContent('강남구 테헤란로 133');
      expect(container).not.toHaveTextContent('15층');
    });

    it('주문 번호를 볼 수 있다.', () => {
      const { container } = renderSuccessContainer();

      expect(container).toHaveTextContent('12345');
    });

    it('주문 번호 옆 복사 아이콘을 볼 수 있다.', () => {
      const { queryByTestId } = renderSuccessContainer();
      const copyButton = queryByTestId('copy-button');
      expect(copyButton).toBeInTheDocument();
    });

    context('주문 번호 옆 복사 아이콘 버튼을 누르면', () => {
      it('주문번호를 복사할 수 있다', () => {
        const { getByTestId } = renderSuccessContainer();

        fireEvent.click(getByTestId('copy-button'));
        expect(document.execCommand).toHaveBeenCalled();
      });

      it('"주문 번호가 복사되었습니다." 문구를 볼 수 있다.', async () => {
        const { getByTestId } = renderSuccessContainer();

        fireEvent.click(getByTestId('copy-button'));

        await waitFor(() => {
          expect(Alert).toBeCalledWith({
            text: ORDER_NO_SUCCESS_MESSAGE,
          });
        });
      });
    });
  });

  context('판매자 배송 상품일 경우', () => {
    given('paymentsResult', () => ({
      ...paymentsInitialState.paymentsResult,
      isDeliveryOrder: true,
      address: '강남구 테헤란로 133',
      addressDetail: '15층',
    }));

    it('주문 번호를 볼 수 있다.', () => {
      const { container } = renderSuccessContainer();

      expect(container).toHaveTextContent('12345');
    });

    it('주문 번호 옆 복사 아이콘을 볼 수 있다.', () => {
      const { queryByTestId } = renderSuccessContainer();
      const copyButton = queryByTestId('copy-button');
      expect(copyButton).toBeInTheDocument();
    });

    context('주문 번호 옆 복사 아이콘 버튼을 누르면', () => {
      it('주문번호를 복사할 수 있다', () => {
        const { getByTestId } = renderSuccessContainer();

        fireEvent.click(getByTestId('copy-button'));
        expect(document.execCommand).toHaveBeenCalled();
      });

      it('"주문 번호가 복사되었습니다." 문구를 볼 수 있다.', async () => {
        const { getByTestId } = renderSuccessContainer();

        fireEvent.click(getByTestId('copy-button'));

        await waitFor(() => {
          expect(Alert).toBeCalledWith({
            text: ORDER_NO_SUCCESS_MESSAGE,
          });
        });
      });
    });

    it('배송지 영역을 노출한다.', () => {
      const { container } = renderSuccessContainer();

      expect(container).toHaveTextContent('강남구 테헤란로 133');
      expect(container).toHaveTextContent('15층');
    });
  });

  context('적립할 적립금이 없으면', () => {
    given('paymentsResult', () => ({
      ...paymentsInitialState.paymentsResult,
      expectedPoint: 0,
    }));

    it('적립금 영역을 노출하지 않는다.', () => {
      const { container } = renderSuccessContainer();

      expect(container).not.toHaveTextContent('적립금');
    });
  });

  context('전액 적립금 주문이면', () => {
    given('isUseAllPoint', () => true);

    it('적립금 영역을 노출하지 않는다.', () => {
      const { container } = renderSuccessContainer();

      expect(container).not.toHaveTextContent('적립금');
    });
  });

  context('isViewPackage 가 false 이면', () => {
    given('paymentsResult', () => ({
      ...paymentsInitialState.paymentsResult,
      isViewPackage: false,
    }));

    it('포장재 배너를 볼 수 없다.', () => {
      const { queryByAltText } = renderSuccessContainer();

      expect(queryByAltText('All Paper Challenge')).not.toBeInTheDocument();
    });
  });
});
