import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import DeliveryNoticeContainer from './DeliveryNoticeContainer';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('DeliveryNoticeContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  given('holidayDelivery', () => undefined);
  given('deliveryNotice', () => '');

  const renderOrdererContainer = () => render(<DeliveryNoticeContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        holidayDelivery: given.holidayDelivery,
        deliveryNotice: given.deliveryNotice,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  context('배송 메세지가 있으면', () => {
    given('deliveryNotice', () => '23시까지 주문하면 내일 밤에 도착해요.');

    it('해당 메세지를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();

      expect(container).toHaveTextContent(given.deliveryNotice);
    });
  });

  context('특수 배송 제한(holidayDelivery) 이 있으면', () => {
    given('holidayDelivery', () => ({
      description: '값이 있습니다',
    }));

    it('특수 배송 제한 값을 볼 수 있다', () => {
      const { container } = renderOrdererContainer();

      expect(container).toHaveTextContent(given.holidayDelivery.description);
    });
  });
});
