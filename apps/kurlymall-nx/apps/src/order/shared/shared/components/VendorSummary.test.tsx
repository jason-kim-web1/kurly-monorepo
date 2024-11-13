import { screen } from '@testing-library/react';

import { KurlypayAddVendor, KurlypayBankVendor } from '../../../../../fixtures';
import { renderWithProviders } from '../../../../../util/testutil';

import VendorSummary from './VendorSummary';
import {
  EASY_KURLYPAY_VENDOR,
  KURLYPAY_CERDIT_VENDOR,
  TOSSPAYMENTS_VENDOR,
} from '../../../../../fixtures/checkout/payment-vendors';
import { CreditCardFixture } from '../../../../../fixtures/checkout/credit-cards';

describe('VendorSummary', () => {
  const renderVendorSummary = (preloadedState = {}) => renderWithProviders(<VendorSummary />, { preloadedState });

  context('결제수단이 선택되어 있지 않으면', () => {
    it('결제수단 선택 요청 문구를 볼 수 있다.', () => {
      renderVendorSummary();

      expect(screen.queryByText('결제 수단을 선택해주세요')).toBeInTheDocument();
    });
  });

  context.each([
    { code: 'kakao-pay', name: '카카오페이' },
    { code: 'toss', name: '토스' },
    { code: 'naver-pay', name: '네이버페이' },
  ])('결제수단이 선택되어 있으면', (vendor) => {
    it('결제수단 이름을 볼 수 있다.', () => {
      renderVendorSummary({
        checkoutPayment: {
          selectedVendor: vendor,
        },
      });

      expect(screen.queryByText(vendor.name)).toBeInTheDocument();
    });
  });

  context('결제수단이 휴대폰이면', () => {
    it('"휴대폰" text를 볼 수 있다', () => {
      renderVendorSummary({
        checkoutPayment: {
          selectedVendor: {
            code: 'phonebill',
            name: '휴대폰',
          },
        },
      });

      expect(screen.queryByText('휴대폰')).toBeInTheDocument();
    });
  });

  context.each([TOSSPAYMENTS_VENDOR, KURLYPAY_CERDIT_VENDOR])('선택한 결제수단이 신용카드이고', (vendor) => {
    context('신용카드사를 선택하지 않았을 때', () => {
      it('"결제 수단을 선택해주세요" 문구를 볼 수 있다.', () => {
        renderVendorSummary({
          checkoutPayment: {
            selectedVendor: vendor,
            selectedCreditCard: undefined,
          },
        });

        expect(screen.queryByText('결제 수단을 선택해주세요')).toBeInTheDocument();
      });
    });

    context.each(CreditCardFixture)('신용카드를 선택했다면', (creditCard) => {
      it(`"신용카드 (${creditCard.name})" 문구를 볼 수 있다.`, () => {
        renderVendorSummary({
          checkoutPayment: {
            selectedVendor: KURLYPAY_CERDIT_VENDOR,
            selectedCreditCard: creditCard,
          },
        });

        expect(screen.queryByText(`신용카드 (${creditCard.name})`)).toBeInTheDocument();
      });
    });
  });

  context('선택한 결제수단이 컬리페이 간편결제이고', () => {
    context('선택한 컬리페이 간편결제수단의 회사명이 없다면', () => {
      it('"컬리페이" 라는 문구를 볼 수 있다.', () => {
        renderVendorSummary({
          checkoutPayment: {
            selectedVendor: EASY_KURLYPAY_VENDOR,
            selectedKurlypayVendor: KurlypayAddVendor,
          },
        });

        expect(screen.queryByText('컬리페이')).toBeInTheDocument();
      });
    });

    context('선택한 컬리페이 간편결제수단이 있다면', () => {
      it('"컬리페이 (결제사)" 문구를 볼 수 있다.', () => {
        renderVendorSummary({
          checkoutPayment: {
            selectedVendor: EASY_KURLYPAY_VENDOR,
            selectedKurlypayVendor: KurlypayBankVendor,
          },
        });

        expect(screen.queryByText(`컬리페이 (${KurlypayBankVendor.companyName})`)).toBeInTheDocument();
      });
    });
  });
});
