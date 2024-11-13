import { render, fireEvent, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import usePaymentMethods from '../../../shared/shared/hooks/usePaymentMethods';
import useToggle from '../../../checkout/shared/hooks/useToggle';
import { setSelectedVendor } from '../../../checkout/shared/reducers/checkout-payment.slice';

import COLOR from '../../../../shared/constant/colorset';

import PaymentMethodsContainer from './PaymentMethodsContainer';
import { QueryClientWrapper } from '../../../../shared/react-query';
import { usePreviousVendorQuery } from '../../../checkout/shared/hooks/queries';
import useEvent from '../../shared/hooks/useEvent';
import {
  KAKAOPAY_VENDOR,
  NAVERPAY_VENDOR,
  simpleVendorsFixture,
  vendorsFixture,
} from '../../../../../fixtures/checkout/payment-vendors';
import { formattedKurlypayVendors } from '../../../../../fixtures';
import { CheckoutType } from '../../../../shared/interfaces';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../../shared/shared/hooks/usePaymentMethods');
jest.mock('../../../checkout/shared/hooks/useToggle');
jest.mock('../../../../shared/api/checkout/checkout');
jest.mock('../../../checkout/shared/hooks/queries');
jest.mock('../../shared/hooks/useEvent');

describe('PaymentMethodsContainer', () => {
  const open = jest.fn();

  let store: MockStoreEnhanced<unknown>;

  given('selectedVendor', () => undefined);
  given('kakaoPayCouponSelected', () => undefined);
  given('filteredSummaryEvents', () => []);
  given('event', () => ({}));
  given('hasSimplePayEvent', () => false);
  given('isGiftOrder', () => false);
  given('isOpen', () => true);
  given('paymentPrice', () => 10000);
  given('installments', () => []);
  given('creditCards', () => []);
  given('hasKurlypayError', () => false);
  given('userGrade', () => '');
  given('isSubscribed', () => '');

  const renderPaymentMethodsContainer = () =>
    render(
      <QueryClientWrapper>
        <PaymentMethodsContainer />
      </QueryClientWrapper>,
    );

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        isGiftOrder: given.isGiftOrder,
        price: { paymentPrice: given.paymentPrice },
        checkoutType: CheckoutType.NORMAL,
      },
      checkoutCoupon: {
        selectedCoupon: undefined,
      },
      checkoutPayment: {
        event: given.event,
        selectedVendor: given.selectedVendor,
        simplePaymentVendors: simpleVendorsFixture,
        vendors: vendorsFixture,
        creditCards: given.creditCards,
        installments: given.installments,
        kurlypayVendors: formattedKurlypayVendors,
        hasKurlypayError: given.hasKurlypayError,
        disableVendorCodes: [],
      },
      member: {
        info: {
          grade: given.userGrade,
        },
        subscription: {
          isSubscribed: given.isSubscribed,
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (usePaymentMethods as jest.Mock).mockImplementation(() => ({
      hasSimplePayEvent: given.hasSimplePayEvent,
      kakaoPayCouponSelected: given.kakaoPayCouponSelected,
      filteredSummaryEvents: given.filteredSummaryEvents,
    }));
    (useToggle as jest.Mock).mockImplementation(() => ({
      isOpen: given.isOpen,
      close: jest.fn(),
      open,
    }));
    (usePreviousVendorQuery as jest.Mock).mockReturnValue({
      data: {
        paymentGatewayId: 'naver-pay',
        companyId: '',
      },
    });
    (useEvent as jest.Mock).mockReturnValue({
      eventList: [],
      onlyInterestFree: false,
    });
  });

  context('컬리페이 결제수단 조회 에러가 발생하면', () => {
    given('hasKurlypayError', () => true);

    it('에러 메세지를 볼 수 있다.', () => {
      renderPaymentMethodsContainer();

      expect(screen.queryByText('컬리페이 시스템 점검 중입니다. 다른 결제수단을 이용해 주세요.')).toBeInTheDocument();
    });
  });

  context('최종결제금액이 0원이면', () => {
    given('paymentPrice', () => 0);

    it('결제수단을 볼 수 없다.', () => {
      const { container } = renderPaymentMethodsContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('카카오페이 쿠폰 선택하면', () => {
    given('kakaoPayCouponSelected', () => true);

    it('renders 카카오페이와 안내 메시지를 보여준다', () => {
      const { container } = renderPaymentMethodsContainer();

      expect(container).toHaveTextContent('카카오페이');

      expect(container).not.toHaveTextContent('신용카드');
    });
  });

  context('간편결제 선택하면', () => {
    given('selectedVendor', () => NAVERPAY_VENDOR);

    it('renders simple payments', () => {
      const { container } = renderPaymentMethodsContainer();

      expect(container).toHaveTextContent(NAVERPAY_VENDOR.name);
    });
  });

  context('결제수단 이벤트가 있으면', () => {
    given('event', () => ({
      'naver-pay': [
        {
          code: 'naver-pay',
          title: '네이버페이 이벤트',
          descriptions: ['이벤트 내용'],
        },
      ],
    }));

    it('renders benefit icon', () => {
      const { container } = renderPaymentMethodsContainer();

      expect(container).toHaveTextContent('혜택');
    });

    context('(접힘 상태) 카카오페이 선택 시 카카오페이 이벤트가 있으면', () => {
      given('isOpen', () => false);
      given('selectedVendor', () => KAKAOPAY_VENDOR);
      given('events', () => [
        {
          vendorName: '카카오페이',
          title: '제목',
          descriptions: ['내용'],
        },
      ]);
      given('filteredSummaryEvents', () => [{ vendorName: '카카오페이' }]);

      it('renders benefits', () => {
        const { container } = renderPaymentMethodsContainer();

        expect(container).toHaveTextContent('카카오페이 결제시 할인 이벤트');
      });
    });
  });

  context('간편결제 이벤트가 있으면', () => {
    given('hasSimplePayEvent', () => true);

    it('renders benefit icon', () => {
      const { container } = renderPaymentMethodsContainer();

      expect(container).toHaveTextContent('혜택');
    });
  });

  context('결제수단 버튼이 활성화 되어 있으면', () => {
    given('selectedVendor', () => NAVERPAY_VENDOR);

    it('renders activated button', () => {
      const { getByTestId } = renderPaymentMethodsContainer();

      const button = getByTestId('naver-pay-button');

      expect(button).toHaveStyle(`background-color: ${COLOR.naverBg};`);
    });
  });

  describe('결제수단을 선택하면', () => {
    given('selectedVendor', () => NAVERPAY_VENDOR);

    it('setSelectedVendor action 을 실행한다.', () => {
      const { getByTestId } = renderPaymentMethodsContainer();

      fireEvent.click(getByTestId('naver-pay-button'));

      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
    });
  });

  describe('간편 결제 버튼을 클릭하면', () => {
    given('selectedVendor', () => KAKAOPAY_VENDOR);

    it('setSelectedVendor action 을 실행한다.', () => {
      const { getByText } = renderPaymentMethodsContainer();

      fireEvent.click(getByText('간편 결제'));

      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toEqual(setSelectedVendor(NAVERPAY_VENDOR));
    });
  });
});
