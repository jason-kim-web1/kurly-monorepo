import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import useToggle from '../../../checkout/shared/hooks/useToggle';
import usePaymentMethods from '../../shared/hooks/usePaymentMethods';

import Events from './Events';
import { QueryClientWrapper } from '../../../../shared/react-query';
import useInterestFree from '../../shared/hooks/queries/useInterestFree';
import useEvent from '../../shared/hooks/useEvent';

jest.mock('react-redux');
jest.mock('../../../checkout/shared/hooks/useToggle');
jest.mock('../../../shared/shared/hooks/usePaymentMethods');
jest.mock('../../shared/hooks/queries/useInterestFree');
jest.mock('../../shared/hooks/useEvent');

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

const open = jest.fn();
const close = jest.fn();

describe('Events', () => {
  let store: MockStoreEnhanced<unknown>;

  given('selectedVendor', () => undefined);
  given('easyPaymentEvent', () => []);
  given('filteredAllEvents', () => {});
  given('events', () => []);
  given('isOpen', () => false);
  given('useInterestFree', () => ({
    interestFreeList: [],
  }));
  given('eventList', () => []);
  given('onlyInterestFree', () => false);

  const renderEvents = () =>
    render(
      <QueryClientWrapper>
        <Events />
      </QueryClientWrapper>,
    );

  beforeEach(() => {
    mockStore(() => ({
      checkout: {
        selectedVendor: given.selectedVendor,
      },
    }));

    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));

    (usePaymentMethods as jest.Mock).mockImplementation(() => ({
      easyPaymentEvent: given.easyPaymentEvent,
      filteredAllEvents: given.filteredAllEvents,
      events: given.events,
    }));

    (useToggle as jest.Mock).mockImplementation(() => ({
      isOpen: given.isOpen,
      open,
      close,
    }));

    (useInterestFree as jest.Mock).mockReturnValue(given.useInterestFree);

    (useEvent as jest.Mock).mockReturnValue({
      eventList: given.eventList,
      onlyInterestFree: given.onlyInterestFree,
    });
  });

  context('이벤트가 없고, 무이자할부 혜택이 없으면', () => {
    it('아무것도 렌더링 되지 않는다', () => {
      const { container } = renderEvents();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
