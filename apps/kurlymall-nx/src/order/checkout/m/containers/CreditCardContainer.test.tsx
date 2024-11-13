import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import CreditCardContainer from './CreditCardContainer';
import {
  setSelectedInstallment,
  setSelectedCreditCard,
} from '../../../checkout/shared/reducers/checkout-payment.slice';
import { KB_CARD } from '../../../../../fixtures/checkout/credit-cards';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('CreditCardContainer', () => {
  const installments = [
    { name: '일시불', value: '0' },
    { name: '2개월', value: '2' },
  ];

  let store: MockStoreEnhanced<unknown>;

  given('selectedCreditCard', () => undefined);

  const renderCreditCardContainer = () => render(<CreditCardContainer />);

  beforeEach(() => {
    store = mockStore(() => ({
      checkoutPayment: {
        selectedCreditCard: given.selectedCreditCard,
        selectedInstallment: given.selectedInstallment,
        creditCards: [KB_CARD],
        installments: {
          [KB_CARD.value]: installments,
        },
      },
      checkoutCoupon: {
        selectedCoupon: undefined,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
  });

  context('when selected creditCard does not exist', () => {
    it('renders CreditCardContainer', () => {
      const { container } = renderCreditCardContainer();

      expect(container).toHaveTextContent('카드를 선택해주세요');
      expect(container).toHaveTextContent('할부를 선택해주세요');
    });

    it('renders disabled installment select', () => {
      const { getByText } = renderCreditCardContainer();

      expect(getByText('할부를 선택해주세요')).toBeDisabled();
    });

    describe('Changing creditCard', () => {
      it('dispatches', () => {
        const { getByText } = renderCreditCardContainer();

        fireEvent.click(getByText('카드를 선택해주세요'));

        fireEvent.click(getByText(KB_CARD.name));

        const actions = store.getActions();

        expect(actions).calledActions([setSelectedCreditCard, setSelectedInstallment]);
      });
    });
  });

  context('when creditCard is selected', () => {
    given('selectedCreditCard', () => KB_CARD);

    it('renders creditCard name', () => {
      const { container } = renderCreditCardContainer();

      expect(container).toHaveTextContent(KB_CARD.name);
    });

    it('renders enabled installment select', () => {
      const { getByText } = renderCreditCardContainer();

      expect(getByText('할부를 선택해주세요')).toBeEnabled();
    });

    describe('Changing installment', () => {
      it('dispatches setValue', () => {
        const { getByText } = renderCreditCardContainer();

        fireEvent.click(getByText('할부를 선택해주세요'));

        fireEvent.click(getByText(installments[0].name));

        const actions = store.getActions();

        expect(actions).calledActions([setSelectedInstallment]);
      });
    });
  });
});
