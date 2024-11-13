import { fireEvent, render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import GiftReceiverInfo from './GiftReceiverInfo';
import { Notification } from '../../shared/interfaces/ReceiverForm.interface';
import { useWebview } from '../../../../shared/hooks';
import appService from '../../../../shared/services/app.service';

jest.mock('react-redux');
jest.mock('../../../../shared/services/app.service');
jest.mock('../../../../shared/hooks');

const onChange = jest.fn();
const onChangeContact = jest.fn();

const mockStore = configureStore(getDefaultMiddleware());

describe('GiftReceiverInfo 테스트', () => {
  let store: MockStoreEnhanced<unknown>;

  given('recipientInfo', () => ({
    name: '김컬리',
    message: '',
    phone: '010-1111-1111',
  }));
  given('notificationType', () => Notification.SMS);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        recipientInfo: given.recipientInfo,
        notificationType: given.notificationType,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useWebview as jest.Mock).mockImplementation(() => true);
  });

  const renderGiftReceiverInfo = () =>
    render(
      <GiftReceiverInfo
        recipientInfo={given.recipientInfo}
        notificationType={given.notificationType}
        onChange={onChange}
        onChangeContact={onChangeContact}
      />,
    );

  it('받으실 분 이름* 을 볼 수 있다.', () => {
    const { container } = renderGiftReceiverInfo();

    expect(container).toHaveTextContent('받으실 분 이름*');
  });

  it('받으실 분 연락처* 를 볼 수 있다.', () => {
    const { container } = renderGiftReceiverInfo();

    expect(container).toHaveTextContent('받으실 분 연락처*');
  });

  it('안전한 배송을 위해 받으실 분 연락처를 입력해 주세요 를 볼 수 있다.', () => {
    const { container } = renderGiftReceiverInfo();

    expect(container).toHaveTextContent('안전한 배송을 위해 받으실 분 연락처를 입력해 주세요');
  });

  it('연락처 불러오기를 버튼을 볼 수 있다.', () => {
    const { container } = renderGiftReceiverInfo();

    expect(container).toHaveTextContent('연락처 불러오기');
  });

  context('연락처 불러오기 버튼을 클릭하면', () => {
    given('notificationType', () => Notification.KAKAO_TALK);

    it('getContacts 인터페이스가실행된다.', () => {
      const { getByText } = renderGiftReceiverInfo();
      fireEvent.click(getByText('연락처 불러오기'));

      expect(appService.getContacts).toBeCalled();
    });
  });

  it('컬리 카톡 채널로 안내되며 미설치 시 문자 발송됩니다. 를 볼 수 있다.', () => {
    const { container } = renderGiftReceiverInfo();

    expect(container).toHaveTextContent('컬리 카톡 채널로 안내되며 미설치 시 문자 발송됩니다.');
  });

  context('메세지 전송타입을 카카오톡으로 선택하면', () => {
    given('notificationType', () => Notification.KAKAO_TALK);

    it('받으실 분 이름* 을 볼 수 있다.', () => {
      const { container } = renderGiftReceiverInfo();

      expect(container).toHaveTextContent('받으실 분 이름*');
    });

    it('받으실 분 연락처 를 볼 수 있다.', () => {
      const { container } = renderGiftReceiverInfo();

      expect(container).toHaveTextContent('받으실 분 연락처');
    });

    it('연락처 불러오기를 버튼을 볼 수 있다.', () => {
      const { container } = renderGiftReceiverInfo();

      expect(container).toHaveTextContent('연락처 불러오기');
    });

    it('카카오톡 친구에게 직접 메시지를 발송할 수 있습니다. 를 볼 수 있다.', () => {
      const { container } = renderGiftReceiverInfo();

      expect(container).toHaveTextContent('카카오톡 친구에게 직접 메시지를 발송할 수 있습니다.');
    });
  });
});
