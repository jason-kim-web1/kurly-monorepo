import { render } from '@testing-library/react';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import useCheckoutTerms from '../../shared/hooks/useCheckoutTerms';

import { MEMBER_CARD_WITH_KURLYPAY, MEMBER_NOT_CARD } from '../../../shared/shared/constants/terms';

import TermsContainer from './TermsContainer';
import { KURLYPAY_CERDIT_VENDOR, NAVERPAY_VENDOR } from '../../../../../fixtures/checkout/payment-vendors';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../shared/hooks/useCheckoutTerms');

describe('TermsContainer 테스트', () => {
  const renderTermsContainer = () => render(<TermsContainer />);

  beforeEach(() => {
    mockStore(() => ({
      checkout: {
        selectedVendor: given.selectedVendor,
        isGiftService: false,
      },
    }));
  });

  context('컬리페이 결제면', () => {
    given('selectedVendor', () => KURLYPAY_CERDIT_VENDOR);

    it('결제대행 서비스 약관 동의 를 볼 수 있다.', () => {
      (useCheckoutTerms as jest.Mock).mockReturnValue({
        terms: MEMBER_CARD_WITH_KURLYPAY,
        onClickTerms: jest.fn(),
      });

      const { container } = renderTermsContainer();

      expect(container).toHaveTextContent('결제대행 서비스 약관 동의');
    });
  });

  context('카드 결제가 아니면', () => {
    given('selectedVendor', () => NAVERPAY_VENDOR);

    it('결제대행 서비스 약관 동의 를 볼 수 없다.', () => {
      (useCheckoutTerms as jest.Mock).mockReturnValue({
        terms: MEMBER_NOT_CARD,
        onClickTerms: jest.fn(),
      });

      const { container } = renderTermsContainer();

      expect(container).not.toHaveTextContent('결제대행 서비스 약관 동의');
    });
  });
});
