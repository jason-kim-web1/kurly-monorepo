import { PaymentMethod, PaymentVendorCode } from '../../../../shared/constant';
import { getPayment } from './getPayment';
import { paymentPairFixture } from '../fixtures/paymentPair.fixture';
import { PaymentVendorTextMap } from '../../../order/shared/constants/payment-summary';

describe('getPayment Test', () => {
  const paymentGatewayIdList: PaymentVendorCode[] = [
    'toss-payments',
    'phonebill',
    'kakao-pay',
    'naver-pay',
    'toss',
    'payco',
    'kurly',
    'toss-payments-subscription',
    'others',
    'paynow',
  ];

  const legacyPaymentMethod: PaymentMethod[] = [
    'bank_deposit',
    'virtual_account',
    'promotion',
    'pay_coupon',
    'pay_discount',
    'pay_gift_card',
    'others',
  ];

  const paymentMethodError: PaymentMethod = '';
  const paymentGatewayIdDisplayNameError = '';

  context('결제수단이 존재하면서', () => {
    context.each(paymentPairFixture)(
      '결제수단이 고도몰CMS 사용 값인 아닌 경우',
      ({ paymentGatewayId, paymentMethod, paymentText }) => {
        const { payment } = getPayment({ paymentMethod, paymentGatewayId, paymentGatewayIdDisplayName: paymentText });

        it(`${paymentText}을 볼 수 있다.`, () => {
          expect(payment).toBe(paymentText);
        });
      },
    );
    context.each(
      legacyPaymentMethod.map((paymentMethod) => ({
        paymentGatewayId: paymentGatewayIdList[0],
        paymentMethod,
        paymentGatewayIdDisplayName: paymentGatewayIdDisplayNameError,
      })),
    )('결제수단이 고도몰CMS 사용 값인 경우', ({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName }) => {
      const { payment } = getPayment({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName });

      it('결제수단만 볼 수 있다.', () => {
        expect(payment).toBe(PaymentVendorTextMap[paymentGatewayId]);
      });
    });
  });

  context.each(
    paymentGatewayIdList.map((paymentGatewayId) => ({
      paymentGatewayId,
      paymentMethod: paymentMethodError,
      paymentGatewayIdDisplayName: paymentGatewayIdDisplayNameError,
    })),
  )(
    '결제 api가 문제가 생겨 결제수단이 빈 공백으로 내려온 경우',
    ({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName }) => {
      const { payment } = getPayment({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName });

      it(`${PaymentVendorTextMap[paymentGatewayId]}를 볼 수 있다.`, () => {
        expect(payment).toBe(PaymentVendorTextMap[paymentGatewayId]);
      });
    },
  );
});
