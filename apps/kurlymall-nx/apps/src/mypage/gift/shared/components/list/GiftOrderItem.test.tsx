import { format } from 'date-fns';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { addComma } from '../../../../../shared/services';
import { GiftListItem } from '../../../../../shared/interfaces';
import { INQUIRY_PATH, getPageUrl } from '../../../../../shared/constant';

import GiftOrderItem from './GiftOrderItem';
import Alert from '../../../../../shared/components/Alert/Alert';
import { initialState, redirectTo } from '../../../../../shared/reducers/page';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../../../../shared/components/Alert/Alert');
jest.mock('../../../../../../util/window/getDevice');

describe('GiftOrderItem 테스트', () => {
  let store: MockStoreEnhanced<unknown>;

  const handleOrderCancel = jest.fn();
  const handleKakaoTalkSend = jest.fn();
  const handleSmsSend = jest.fn();
  const push = jest.fn();

  const giftFixture: GiftListItem = {
    notificationType: 'SMS',
    groupOrderNo: 1111,
    externalGroupOrderNo: 'exex',
    contentsProductName: '제품명',
    paymentCompletedAt: new Date().toISOString(),
    paymentGatewayId: 'kurly',
    ordererName: '주문자명',
    recipientName: '이름',
    totalPaymentPrice: 1000,
    imageUrl: 'imageUrl',
    availableDate: new Date().toISOString(),
    orderedAt: new Date().toISOString(),
    giftOrderStatus: 'READY_FOR_ACCEPT',
    productCount: 1,
    notificationSentCount: 0,
    possibleNotificationSentCount: 2,
  };

  const mockGetDevice = jest.requireMock('../../../../../../util/window/getDevice');
  mockGetDevice.isMobileWeb = true;
  mockGetDevice.isPC = false;
  mockGetDevice.isMobileDevice = true;

  given('messageTimeCheck', () => false);
  given('item', () => giftFixture);

  const renderGiftOrderItem = () =>
    render(
      <GiftOrderItem
        item={given.item}
        handleOrderCancel={handleOrderCancel}
        handleKakaoTalkSend={handleKakaoTalkSend}
        handleSmsSend={handleSmsSend}
      />,
    );

  beforeEach(() => {
    store = mockStore(() => ({
      mypageGift: {
        messageTimeCheck: given.messageTimeCheck,
      },
      page: initialState,
    }));

    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      isReady: true,
    }));
    (Alert as jest.Mock).mockImplementation(() => Promise.resolve());
  });

  it('주문 정보를 볼 수 있다.', () => {
    const { container } = renderGiftOrderItem();

    const { recipientName, notificationType, paymentCompletedAt, groupOrderNo, totalPaymentPrice } = given.item;

    expect(container).toHaveTextContent(
      `받으실 분${recipientName} (${notificationType === 'SMS' ? '연락처' : '카카오톡'})`,
    );
    expect(container).toHaveTextContent(`결제 일시${format(new Date(paymentCompletedAt), 'yyyy-MM-dd HH:mm:ss')}`);
    expect(container).toHaveTextContent(`주문번호${groupOrderNo}`);
    expect(container).toHaveTextContent(`결제 금액${addComma(totalPaymentPrice)}원`);
  });

  context.each([
    { giftOrderStatus: 'READY_FOR_ACCEPT', text: '선물 수락 대기' },
    { giftOrderStatus: 'ACCEPTED', text: '선물 수락' },
    { giftOrderStatus: 'DELIVERED', text: '선물 배송완료' },
    { giftOrderStatus: 'REJECTED', text: '선물 거절' },
    { giftOrderStatus: 'CANCELED', text: '선물 취소완료' },
  ])('giftOrderStatus 상태에 따라', ({ giftOrderStatus, text }) => {
    given('item', () => ({
      ...giftFixture,
      giftOrderStatus,
    }));

    it(`"${text}을 볼 수 있다.`, () => {
      const { container } = renderGiftOrderItem();

      expect(container).toHaveTextContent(`선물 상태${text}`);
    });
  });

  describe('선물 수락 대기 상태일 때', () => {
    given('item', () => ({
      ...giftFixture,
      giftOrderStatus: 'READY_FOR_ACCEPT',
    }));

    it('주문취소 버튼과 메시지 재전송 버튼을 볼 수 있다.', () => {
      const { queryByRole } = renderGiftOrderItem();
      const cancelButton = queryByRole('button', { name: /주문취소/i });
      const messageButton = queryByRole('button', { name: /메시지 재전송/i });

      expect(cancelButton).toBeInTheDocument();
      expect(messageButton).toBeInTheDocument();
    });

    it('주문취소 버튼을 클릭 할 수 있다.', () => {
      const { getByText } = renderGiftOrderItem();

      act(() => {
        fireEvent.click(getByText('주문취소'));
      });

      expect(handleOrderCancel).toBeCalled();
    });

    context('메시지 재전송 수단이 카카오톡이면', () => {
      given('item', () => ({
        ...giftFixture,
        notificationType: 'KAKAO_TALK',
        giftOrderStatus: 'READY_FOR_ACCEPT',
      }));

      it('메시지 재전송 버튼 클릭 시 handleKakaoTalkSend 를 호출한다.', () => {
        const { getByText } = renderGiftOrderItem();

        act(() => {
          fireEvent.click(getByText('메시지 재전송'));
        });

        expect(handleKakaoTalkSend).toBeCalled();
      });
    });

    context('메시지 재전송 수단이 연락처이면', () => {
      given('item', () => ({
        ...giftFixture,
        notificationType: 'SMS',
        giftOrderStatus: 'READY_FOR_ACCEPT',
      }));

      it('메시지 재전송 버튼 클릭 시 handleSmsSend 를 호출한다.', () => {
        const { getByText } = renderGiftOrderItem();

        act(() => {
          fireEvent.click(getByText('메시지 재전송'));
        });

        expect(handleSmsSend).toBeCalled();
      });
    });

    context('메시지 재전송 수단이 연락처이고 리밋을 초과했으면', () => {
      given('item', () => ({
        ...giftFixture,
        notificationType: 'SMS',
        giftOrderStatus: 'READY_FOR_ACCEPT',
        possibleNotificationSentCount: 2,
        notificationSentCount: 2,
      }));

      it('메시지 재전송 버튼 클릭 시 메시지는 1일 2회까지 다시 보낼 수 있습니다 를 볼 수 있다.', async () => {
        const { getByText } = renderGiftOrderItem();

        fireEvent.click(getByText('메시지 재전송'));

        await waitFor(() => {
          expect(Alert).toBeCalledWith({
            text: '메시지는 1일 2회까지 다시 보낼 수 있습니다',
          });
        });
      });
    });
  });

  describe('선물 수락 대기 상태가 아닐 때', () => {
    given('item', () => ({
      ...giftFixture,
      giftOrderStatus: 'ACCEPTED',
    }));

    it('선물하기 버튼과 1:1문의 버튼을 볼 수 있다.', () => {
      const { queryByRole } = renderGiftOrderItem();
      const giftButton = queryByRole('button', { name: /선물하기/i });
      const inquiryButton = queryByRole('button', { name: /1:1문의/i });

      expect(giftButton).toBeInTheDocument();
      expect(inquiryButton).toBeInTheDocument();
    });

    context('선물하기 버튼을 클릭 하면', () => {
      it('선물하기 기능은 컬리 앱을 이용해 주세요. 알럿이 뜬다.', () => {
        const { getByText } = renderGiftOrderItem();

        act(() => {
          fireEvent.click(getByText('선물하기'));
        });

        expect(Alert).toBeCalledWith({
          text: '선물하기 기능은 컬리 앱을 이용해 주세요.',
        });
      });
    });

    context('1:1문의 버튼을 클릭 하면', () => {
      it('1:1문의 페이지로 이동 한다.', async () => {
        const { getByText } = renderGiftOrderItem();

        act(() => {
          fireEvent.click(getByText('1:1문의'));
        });

        await waitFor(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(
            redirectTo({
              url: getPageUrl(INQUIRY_PATH.inquiry),
            }),
          );
        });
      });
    });
  });
});
