import { renderHook } from '@testing-library/react-hooks';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import useNavigator from './useNavigator';
import { MEMBERSHIP_PATH, MYPAGE_PATH, USER_MENU_PATH } from '../../shared/constant';
import { isWebview } from '../../../util/window/getDevice';
import deepLinkUrl from '../../shared/constant/deepLink';

const mockStore = configureStore(getDefaultMiddleware());
jest.mock('next/router');
jest.mock('react-redux');
jest.mock('../../../util/window/getDevice');

describe('useNavigator', () => {
  const push = jest.fn();
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      asPath: '',
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  context('goToMyMembership 함수를 호출하면', () => {
    it('"마이 컬리멤버스" 페이지로 이동한다.', () => {
      const { result } = renderHook(() => useNavigator());

      result.current.goToMyMembership();

      expect(push).toBeCalledWith(MYPAGE_PATH.myMembership.uri);
    });
  });

  context('goToMembership 함수를 호출하면', () => {
    it('"컬리멤버스 구독" 페이지로 이동한다.', () => {
      const { result } = renderHook(() => useNavigator());

      result.current.goToMembership();

      expect(push).toBeCalledWith(MEMBERSHIP_PATH.membership.uri);
    });
  });

  context('goToHome 함수를 호출하면', () => {
    context('웹뷰일 경우', () => {
      it('딥링크 메인으로 이동한다.', () => {
        (isWebview as jest.Mock).mockReturnValueOnce(true);

        const { result } = renderHook(() => useNavigator());

        result.current.goToHome();

        expect(push).toBeCalledWith(deepLinkUrl.HOME);
      });
    });

    context('웹뷰가 아닐경우', () => {
      it('일반 컬리 메인으로 이동한다.', () => {
        (isWebview as jest.Mock).mockReturnValueOnce(false);

        const { result } = renderHook(() => useNavigator());

        result.current.goToHome();

        expect(push).toBeCalledWith(USER_MENU_PATH.home.uri);
      });
    });
  });

  context('goToShopping 함수를 호출하면', () => {
    context('진입이 멤버십 상품을 통하지 않은 경우', () => {
      it('메인으로 이동한다.', () => {
        const { result } = renderHook(() => useNavigator());

        result.current.goToShopping();

        expect(push).toBeCalledWith(deepLinkUrl.HOME);
      });
    });
  });
});
