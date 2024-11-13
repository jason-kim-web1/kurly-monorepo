import { fireEvent, render, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useWebview } from '../../../shared/hooks/useWebview';

import KurlyPassProductsContainer from './KurlyPassProductsContainer';
import { initialState } from '../../../shared/reducers/page';

const mockStore = configureStore(getDefaultMiddleware());

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

jest.mock('react-redux');
jest.mock('../../../shared/hooks/useWebview');

describe('KurlyPassProductsContainer 테스트', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  const push = jest.fn();

  const renderKurlyPassProductsContainer = () =>
    render(<KurlyPassProductsContainer currentKurlyPass={given.currentKurlyPass} />);

  given('isWebview', () => false);

  beforeEach(() => {
    store = mockStore(() => ({ page: initialState }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      isReady: true,
    }));
    (useWebview as jest.Mock).mockImplementation(() => given.isWebview);
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  describe('BillingInfo 컴포넌트 렌더링 테스트', () => {
    context('현재 이용 중인 컬리패스 정보가 없으면', () => {
      given('currentKurlyPass', () => undefined);

      it('BillingInfo 컴포넌트를 렌더링 하지 않는다.', () => {
        const { queryByTestId } = renderKurlyPassProductsContainer();

        expect(queryByTestId('billing-info')).not.toBeInTheDocument();
      });
    });

    context('현재 이용 중인 컬리패스 정보가 있으면', () => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired: false,
        status: 'Y',
        expiredDate: 1659193200000,
      }));

      it('BillingInfo 컴포넌트를 렌더링 한다.', () => {
        const { queryByTestId } = renderKurlyPassProductsContainer();

        expect(queryByTestId('billing-info')).toBeInTheDocument();
      });
    });
  });

  describe('Information 컴포넌트 렌더링 테스트', () => {
    context.each([
      {
        status: 'Y',
        message: '궁금하신 점은 자세히 보기 또는 1:1 문의를 이용해주세요.',
      },
      {
        status: 'N',
        message: '컬리패스는 언제든지 재구매 가능합니다. 문의 또는 피드백은 1:1 문의에 남겨주세요.',
      },
      {
        status: 'P',
        message: '궁금하신 점은 자세히 보기 또는 1:1 문의를 이용해주세요.',
      },
    ])('현재 이용 중인 컬리패스 상태에 따라', ({ status, message }) => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired: false,
        expiredDate: 1659193200000,
        status,
      }));

      it(`"${message}"을 볼 수 있다.`, () => {
        const { container } = renderKurlyPassProductsContainer();

        expect(container).toHaveTextContent(message);
      });
    });
  });

  describe('ButtonGroup 렌더링 테스트', () => {
    context.each([
      {
        isExpired: false,
        status: 'Y',
        button: '자세히 보기',
      },
      {
        isExpired: true,
        status: 'N',
        button: '컬리패스 구매하기',
      },
      {
        isExpired: false,
        status: 'P',
        button: '자세히 보기',
      },
    ])('현재 이용 중인 컬리패스 상태에 따라', ({ status, isExpired, button }) => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired,
        expiredDate: 1659193200000,
        status,
      }));

      it(`"${button}" 버튼을 볼 수 있다.`, () => {
        const { container } = renderKurlyPassProductsContainer();

        expect(container).toHaveTextContent(button);
      });

      it(`"${button}" 버튼을 클릭 시 해당 함수가 실행된다.`, async () => {
        const { getByText } = renderKurlyPassProductsContainer();

        fireEvent.click(getByText(button));

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0].type).toEqual('page/redirectTo');
        });
      });
    });
  });
});
