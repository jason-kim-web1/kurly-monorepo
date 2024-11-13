/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { PaymentVendor } from '../../../shared/shared/interfaces';
import COLOR from '../../../../shared/constant/colorset';

import PaymentMethodsContainer from './PaymentMethodsContainer';
import usePaymentMethods from '../../../shared/shared/hooks/usePaymentMethods';
import { QueryClientWrapper } from '../../../../shared/react-query';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';
import { KAKAOPAY_VENDOR, NAVERPAY_VENDOR, vendorsFixture } from '../../../../../fixtures/checkout/payment-vendors';
import { formattedKurlypayVendors } from '../../../../../fixtures';
import { CheckoutType } from '../../../../shared/interfaces';
import { setSelectedVendor } from '../../shared/reducers/checkout-payment.slice';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../../shared/shared/hooks/usePaymentMethods');
jest.mock('../../../../shared/api/checkout/checkout');
jest.mock('../../shared/hooks/queries');

describe('PaymentMethodsContainer', () => {
  const simplePaymentVendors: PaymentVendor[] = [KAKAOPAY_VENDOR];

  let store: MockStoreEnhanced<unknown>;

  given('selectedVendor', () => undefined);
  given('kakaoPayCouponSelected', () => undefined);
  given('event', () => ({}));
  given('hasSimplePayEvent', () => false);
  given('events', () => []);
  given('easyPaymentEvent', () => []);
  given('paymentPrice', () => 10000);
  given('installments', () => []);
  given('creditCards', () => []);
  given('hasKurlypayError', () => false);

  const renderPaymentMethodsContainer = () =>
    render(
      <QueryClientWrapper>
        <PaymentMethodsContainer />
      </QueryClientWrapper>,
    );

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        checkoutType: CheckoutType.NORMAL,
        price: {
          paymentPrice: given.paymentPrice,
        },
      },
      checkoutCoupon: {
        selectedCoupon: undefined,
      },
      checkoutPayment: {
        vendors: vendorsFixture,
        selectedVendor: given.selectedVendor,
        simplePaymentVendors,
        event: given.event,
        installments: given.installments,
        creditCards: given.creditCards,
        kurlypayVendors: formattedKurlypayVendors,
        hasKurlypayError: given.hasKurlypayError,
        disableVendorCodes: [],
      },
      member: {
        subscription: {
          isSubscribed: [],
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (usePaymentMethods as jest.Mock).mockImplementation(() => ({
      hasSimplePayEvent: given.hasSimplePayEvent,
      events: given.events,
      easyPaymentEvent: given.easyPaymentEvent,
      kakaoPayCouponSelected: given.kakaoPayCouponSelected,
      filteredAllEvents: {},
    }));
    (usePreviousVendorQuery as jest.Mock).mockReturnValue({
      data: {
        paymentGatewayId: 'naver-pay',
        companyId: '',
      },
    });
  });

  context('컬리페이 결제수단 조회 에러가 발생하면', () => {
    given('hasKurlypayError', () => true);

    it('에러 메세지를 볼 수 있다.', () => {
      renderPaymentMethodsContainer();

      expect(screen.queryByText('컬리페이 시스템 점검 중입니다. 다른 결제수단을 이용해 주세요.')).toBeInTheDocument();
    });
  });

  context('컬리패스 주문이 아니면', () => {
    it('결제 안내 문구를 볼 수 있다.', () => {
      const { container } = renderPaymentMethodsContainer();

      expect(container).toHaveTextContent(
        '카카오페이, 토스, 네이버페이, 페이코 결제 시, 결제하신 수단으로만 환불되는 점 양해부탁드립니다.',
      );
      expect(container).toHaveTextContent(
        '고객님은 안전거래를 위해 현금 등으로 결제시 저희 쇼핑몰에서 가입한 토스 페이먼츠의 구매안전(에스크로) 서비스를 이용하실 수 있습니다.',
      );
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

    context('카카오페이 선택 시 카카오페이 이벤트가 있으면', () => {
      given('selectedVendor', () => KAKAOPAY_VENDOR);
      given('events', () => [
        {
          vendorName: '카카오페이',
          title: '카카오페이 이벤트 제목~~~',
          descriptions: ['내용'],
        },
      ]);

      it('renders benefits', () => {
        const { container } = renderPaymentMethodsContainer();

        expect(container).toHaveTextContent('카카오페이');
        expect(container).toHaveTextContent('카카오페이 이벤트 제목~~~');
        expect(container).toHaveTextContent('내용');
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

  context('결제수단이 활성화 되어 있으면', () => {
    given('selectedVendor', () => NAVERPAY_VENDOR);

    it('renders activated button', () => {
      const { getByTestId } = renderPaymentMethodsContainer();

      const button = getByTestId('naver-pay-button');

      expect(button).toHaveStyle(`background-color: ${COLOR.naverBg};`);
    });
  });

  context('최종 결제 금액이 0원이면', () => {
    given('paymentPrice', () => 0);

    it('결제수단 목록을 볼 수 없다.', () => {
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

      expect(actions).calledActions([]);
    });
  });
});
