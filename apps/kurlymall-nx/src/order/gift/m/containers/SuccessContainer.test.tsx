import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import { useRouter } from 'next/router';

import appService from '../../../../shared/services/app.service';
import { useWebview } from '../../../../shared/hooks';
import { Notification } from '../../shared/interfaces/ReceiverForm.interface';
import useCheckoutResult from '../../../shared/shared/hooks/useCheckoutResult';
import { extractAuthentication } from '../../../../shared/utils/token';

import SuccessContainer from './SuccessContainer';

jest.mock('react-redux');
jest.mock('../../../../shared/hooks');
jest.mock('next/router');
jest.mock('../../../../shared/utils/token');
jest.mock('../../../shared/shared/hooks/useCheckoutResult');
jest.mock('../../../../shared/services/app.service');

const mockStore = configureStore(getDefaultMiddleware());

describe('선물하기 SuccessContainer 테스트', () => {
  const push = jest.fn();
  const handleGiftListPage = jest.fn();
  const handleGiftProductPage = jest.fn();

  let store: MockStoreEnhanced<unknown>;

  given('orderNo', () => '12345');
  given('gift', () => true);
  given('notificationType', () => Notification.SMS);
  given('recipientName', () => '김컬리');
  given('totalPrice', () => '23000');
  given('isWebview', () => true);

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        accessToken: given.accessToken,
      },
      payments: {
        paymentsResult: {
          notificationType: given.notificationType,
          recipientName: given.recipientName,
          totalPrice: given.totalPrice,
        },
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useWebview as jest.Mock).mockImplementation(() => given.isWebview);
    (useCheckoutResult as jest.Mock).mockImplementation(() => ({
      moveGiftListPage: handleGiftListPage,
      moveGiftProductPage: handleGiftProductPage,
      orderNo: given.orderNo,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        orderNo: given.orderNo,
        gift: given.gift,
      },
      push,
    }));
    (extractAuthentication as jest.Mock).mockImplementation(() => ({
      accessToken: '',
      uid: 'uid',
      isGuest: false,
      cartId: 'cartId',
      memberId: 'memberId',
      isExpired: false,
    }));
  });

  const renderGiftSuccessContainer = () => render(<SuccessContainer />);

  context('render test', () => {
    context('웹뷰가 아니라면', () => {
      given('isWebview', () => false);

      it('주문번호를 볼 수 없다.', () => {
        const { container } = renderGiftSuccessContainer();

        expect(container).toHaveTextContent(given.orderNo);
      });

      it('주문 성공 인터페이스를 호출하지않는다.', () => {
        renderGiftSuccessContainer();

        expect(appService.postOrderSuccess).not.toBeCalled();
      });
    });

    context('웹뷰 일때 ', () => {
      it('주문번호를 볼 수 있다.', () => {
        const { container } = renderGiftSuccessContainer();

        expect(container).toHaveTextContent(given.orderNo);
      });

      it('주문 성공 인터페이스를 호출한다.', () => {
        renderGiftSuccessContainer();

        expect(appService.postOrderSuccess).toBeCalledWith({ orderNumber: given.orderNo, amount: given.totalPrice });
      });
    });
  });

  context('메시지 전송 타입이 카카오톡이면', () => {
    given('notificationType', () => Notification.KAKAO_TALK);

    it('"카카오톡에서 받으실 분을 선택해주세요." 를 볼 수 있다.', () => {
      const { container } = renderGiftSuccessContainer();

      expect(container).toHaveTextContent('카카오톡에서 받으실 분을 선택해주세요.');
    });

    context('메시지를 보내지 않았다면', () => {
      it('타이틀 좌측의 버튼을 "X" 로 바꾸는 함수를 호출하지 않는다.', () => {
        renderGiftSuccessContainer();

        expect(appService.setNavigationButton).not.toBeCalledWith({ buttonType: 'close' });
      });

      it('"카카오톡 친구 리스트에서 받으실 분에게 꼭 메시지를 보내주세요." 약관 문구를 볼 수 있다.', () => {
        const { container } = renderGiftSuccessContainer();

        expect(container).toHaveTextContent('카카오톡 친구 리스트에서 받으실 분에게 꼭 메시지를 보내주세요.');
      });

      it('하단에 선물 내역 보기, 계속 선물하기 버튼을 볼 수 없다.', () => {
        const { container } = renderGiftSuccessContainer();

        expect(container).not.toHaveTextContent('선물 내역 보기');
        expect(container).not.toHaveTextContent('계속 선물하기');
      });
    });

    context('메시지를 보냈다면', () => {
      it('타이틀 좌측의 버튼을 "X" 로 바꾸는 함수를 호출한다.', () => {
        const { getByText } = renderGiftSuccessContainer();
        const button = getByText('카카오톡에서 받으실 분을 선택해주세요.');
        fireEvent.click(button);

        expect(appService.setNavigationButton).toBeCalledWith({ buttonType: 'close' });
      });

      it('하단에 선물 내역 보기, 계속 선물하기 버튼을 볼 수 있다.', () => {
        const { getByText, container } = renderGiftSuccessContainer();
        const button = getByText('카카오톡에서 받으실 분을 선택해주세요.');
        fireEvent.click(button);

        expect(container).toHaveTextContent('선물 내역 보기');
        expect(container).toHaveTextContent('계속 선물하기');
      });

      context('선물 내역 보기 버튼을 누르면', () => {
        it('선물 내역 상세페이지로 이동한다.', () => {
          const { getByText } = renderGiftSuccessContainer();
          const kakaoButton = getByText('카카오톡에서 받으실 분을 선택해주세요.');
          fireEvent.click(kakaoButton);

          const button = getByText('선물 내역 보기');
          fireEvent.click(button);

          expect(handleGiftListPage).toBeCalled();
        });
      });

      context('계속 선물하기 버튼을 누르면', () => {
        it('카테고리 탭 페이지로 이동한다.', () => {
          const { getByText } = renderGiftSuccessContainer();
          const kakaoButton = getByText('카카오톡에서 받으실 분을 선택해주세요.');
          fireEvent.click(kakaoButton);

          const button = getByText('계속 선물하기');
          fireEvent.click(button);

          expect(handleGiftProductPage).toBeCalled();
        });
      });
    });
  });

  context('메시지 전송 타입이 연락처이면', () => {
    given('notificationType', () => Notification.SMS);
    it('"받으실 분의 연락처로 선물이 발송되었습니다." 를 볼 수 있다.', () => {
      const { container } = renderGiftSuccessContainer();

      expect(container).toHaveTextContent('받으실 분의 연락처로 선물이 발송되었습니다.');
    });

    it('타이틀 좌측의 버튼을 "X" 로 바꾸는 함수를 호출한다.', () => {
      renderGiftSuccessContainer();

      expect(appService.setNavigationButton).toBeCalledWith({ buttonType: 'close' });
    });

    it('"카카오톡 친구 리스트에서 받으실 분에게 꼭 메시지를 보내주세요." 약관 문구를 볼 수 없다.', () => {
      const { container } = renderGiftSuccessContainer();

      expect(container).not.toHaveTextContent('카카오톡 친구 리스트에서 받으실 분에게 꼭 메시지를 보내주세요.');
    });

    it('하단에 선물 내역 보기, 계속 선물하기 버튼을 볼 수 있다.', () => {
      const { container } = renderGiftSuccessContainer();

      expect(container).toHaveTextContent('선물 내역 보기');
      expect(container).toHaveTextContent('계속 선물하기');
    });

    context('선물 내역 보기 버튼을 누르면', () => {
      given('orderNo', () => '12345');

      it('선물 내역 상세페이지로 이동한다.', () => {
        const { getByText } = renderGiftSuccessContainer();

        const button = getByText('선물 내역 보기');
        fireEvent.click(button);

        expect(handleGiftListPage).toBeCalled();
      });
    });

    context('계속 선물하기 버튼을 누르면', () => {
      given('orderNo', () => '12345');

      it('카테고리 탭 페이지로 이동한다.', () => {
        const { getByText } = renderGiftSuccessContainer();

        const button = getByText('계속 선물하기');
        fireEvent.click(button);

        expect(handleGiftProductPage).toBeCalled();
      });
    });
  });
});
