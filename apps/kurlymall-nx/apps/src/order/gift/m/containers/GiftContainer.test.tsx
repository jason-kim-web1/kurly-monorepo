import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import GiftContainer from './GiftContainer';
import { Notification } from '../../shared/interfaces/ReceiverForm.interface';

jest.mock('react-redux');

const mockStore = configureStore(getDefaultMiddleware());

describe('GiftContainer 테스트', () => {
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
  });

  const renderGiftContainer = () => render(<GiftContainer />);

  it('받으실 분 영역을 볼 수 있다.', () => {
    const { container } = renderGiftContainer();

    expect(container).toHaveTextContent('받으실 분');
  });

  it('선물 메시지 영역을 볼 수 있다.', () => {
    const { container } = renderGiftContainer();

    expect(container).toHaveTextContent('선물 메시지');
  });
});
