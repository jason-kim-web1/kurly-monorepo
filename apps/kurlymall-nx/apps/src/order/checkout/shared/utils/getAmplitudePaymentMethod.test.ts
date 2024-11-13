import { KurlypayPlccLottieVendor } from '../../../../../fixtures';
import {
  KAKAOPAY_VENDOR,
  KURLYPAY_CERDIT_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
} from '../../../../../fixtures/checkout/payment-vendors';
import { EasyPaymentCompanyId, KurlypayType, EasyPaymentType, KurlypayVendor } from '../../../../shared/interfaces';
import { AmplitudePaymentMethods, PaymentVendor } from '../../../shared/shared/interfaces';
import { getAmplitudePaymentMethod } from './getAmplitudePaymentMethod';

describe('getAmplitudePaymentMethod 테스트', () => {
  context('isUseAllPoint가 true 이고', () => {
    const isUseAllPoint = true;
    const selectedVendor: PaymentVendor = KAKAOPAY_VENDOR;
    context('isUseOnlyFreePoint가 true, isUseOnlyPaidPoint가 false이면', () => {
      const isUseOnlyFreePoint = true;
      const isUseOnlyPaidPoint = false;
      it('적립금 문자열을 리턴한다.', () => {
        const result = getAmplitudePaymentMethod(
          selectedVendor,
          isUseAllPoint,
          undefined,
          undefined,
          undefined,
          isUseOnlyFreePoint,
          isUseOnlyPaidPoint,
        );
        expect(result).toBe('적립금');
      });
    });
    context('isUseOnlyFreePoint가 false, isUseOnlyPaidPoint가 true이면', () => {
      const isUseOnlyFreePoint = false;
      const isUseOnlyPaidPoint = true;
      it('컬리캐시 문자열을 리턴한다.', () => {
        const result = getAmplitudePaymentMethod(
          selectedVendor,
          isUseAllPoint,
          undefined,
          undefined,
          undefined,
          isUseOnlyFreePoint,
          isUseOnlyPaidPoint,
        );
        expect(result).toBe('컬리캐시');
      });
    });
    context('isUseOnlyFreePoint, isUseOnlyPaidPoint가 false이면', () => {
      const isUseOnlyFreePoint = false;
      const isUseOnlyPaidPoint = false;
      it('적립금*컬리캐시 전액사용 문자열을 리턴한다.', () => {
        const result = getAmplitudePaymentMethod(
          selectedVendor,
          isUseAllPoint,
          undefined,
          undefined,
          undefined,
          isUseOnlyFreePoint,
          isUseOnlyPaidPoint,
        );
        expect(result).toBe(AmplitudePaymentMethods.kurly);
      });
    });
  });

  context('isUseAllPoint가 false 이고', () => {
    const isUseAllPoint = false;

    context.each`
    selectedVendor | text
      ${KAKAOPAY_VENDOR} | ${'카카오페이'}
      ${NAVERPAY_VENDOR} | ${'네이버페이'}
      ${TOSSPAYMENTS_VENDOR} | ${'신용카드'}
      ${KURLYPAY_CERDIT_VENDOR} | ${'신용카드'}
    `('selectedVendor가 $text 이면', ({ selectedVendor, text }: { selectedVendor: PaymentVendor; text: string }) => {
      it(`${text} 를 리턴한다.`, () => {
        const result = getAmplitudePaymentMethod(selectedVendor, isUseAllPoint);

        expect(result).toBe(AmplitudePaymentMethods[selectedVendor.code]);
      });
    });

    context('selectedVendor가 컬리페이이고', () => {
      const selectedVendor: PaymentVendor = {
        code: 'kurlypay',
        name: '컬리카드',
        hasEvent: true,
        isSimplePay: false,
      };

      context.each`kurlyPayPaymentType | selectedKurlypayVendor
      ${'add-plcc'} | ${KurlypayPlccLottieVendor}
      ${'add-kurlypay'} | ${{
        paymentMethodId: 'add-kurlypay-card',
        paymentType: 'add-kurlypay',
        companyId: null,
        companyName: '',
        maskingNo: '',
        cardType: null,
        installments: [],
        imageUrl: '',
      }}`(
        'selectedKurlypayVendor의 paymentType이 $kurlyPayPaymentType과 일치하면',
        ({ selectedKurlypayVendor }: { selectedKurlypayVendor: KurlypayVendor }) => {
          it("'null' 문자열 값을 리턴한다.", () => {
            const result = getAmplitudePaymentMethod(
              selectedVendor,
              isUseAllPoint,
              undefined,
              undefined,
              selectedKurlypayVendor,
            );
            expect(result).toBe('null');
          });
        },
      );

      context(`kurlypayPaymentType이 \'bank\'이면`, () => {
        const kurlypayPaymentType = EasyPaymentType.BANK;
        it("'kurlypay-account' 문자열 값을 리턴한다.", () => {
          const result = getAmplitudePaymentMethod(selectedVendor, isUseAllPoint, kurlypayPaymentType);
          expect(result).toBe(KurlypayType.ACCOUNT);
        });
      });

      context("kurlypayCreditCard이 'P1'이면", () => {
        const kurlypayCreditCard: EasyPaymentCompanyId = 'P1';

        it("'kurlypay-plcc' 문자열 값을 리턴한다.", () => {
          const result = getAmplitudePaymentMethod(selectedVendor, isUseAllPoint, undefined, kurlypayCreditCard);
          expect(result).toBe(KurlypayType.PLCC);
        });
      });

      context("kurlypayCreditCard이 'P1'이 아니면", () => {
        const kurlypayCreditCard: EasyPaymentCompanyId = '31';

        it("'kurlypay-card' 문자열 값을 리턴한다.", () => {
          const result = getAmplitudePaymentMethod(selectedVendor, isUseAllPoint, undefined, kurlypayCreditCard);
          expect(result).toBe(KurlypayType.CARD);
        });
      });
    });
  });
});
