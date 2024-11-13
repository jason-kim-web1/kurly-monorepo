import { ORDER_PATH, PAYMENT_GIFT_PATH } from '../../../../shared/constant';
import { encodeQueryString } from '../../../../shared/utils/querystring-encoder';
import { COMMON_SUCCESS_CODE, NAVER_PAY_CODE, TOSS_PATMENTS_CODE } from '../constants';
import { checkPaymentGatewayResult, checkTossPaymentsResult } from './checkPaymentGatewayResult';

describe('checkPaymentGatewayResult', () => {
  given('groupOrderNo', () => '2022012312345');
  given('selectedVendorCode', () => 'naver-pay');
  given('paymentGatewayMessage', () => '');
  given('paymentGatewayResult', () => '');

  context('selectedVendorCode에 해당되는 SUCCESS CODE나 CANCEL CODE가 있는 경우', () => {
    context('paymentGatewayMessage가 취소를 반환하면', () => {
      given('paymentGatewayMessage', () => NAVER_PAY_CODE.CANCEL[0]);

      it('cancel을 반환한다.', () => {
        const result = checkPaymentGatewayResult({
          selectedVendorCode: given.selectedVendorCode,
          paymentGatewayMessage: given.paymentGatewayMessage,
        });

        expect(result).toEqual('cancel');
      });
    });

    context('paymentGatewayMessage가 취소를 반환하지 않고', () => {
      given('paymentGatewayMessage', () => undefined);

      context('paymentGatewayResult가 취소를 반환하면', () => {
        given('paymentGatewayResult', () => NAVER_PAY_CODE.CANCEL[0]);

        it('cancel을 반환한다.', () => {
          const result = checkPaymentGatewayResult({
            selectedVendorCode: given.selectedVendorCode,
            paymentGatewayMessage: given.paymentGatewayMessage,
            paymentGatewayResult: given.paymentGatewayResult,
          });

          expect(result).toEqual('cancel');
        });
      });

      context('paymentGatewayResult가 성공을 반환하면', () => {
        given('paymentGatewayResult', () => NAVER_PAY_CODE.SUCCESS[0]);

        it('success를 반환한다.', () => {
          const result = checkPaymentGatewayResult({
            selectedVendorCode: given.selectedVendorCode,
            paymentGatewayMessage: given.paymentGatewayMessage,
            paymentGatewayResult: given.paymentGatewayResult,
          });

          expect(result).toEqual('success');
        });
      });

      context('paymentGatewayResult가 성공이나 취소를 반환하지 않으면', () => {
        given('paymentGatewayResult', () => 'anotherCode');

        it('fail를 반환한다.', () => {
          const result = checkPaymentGatewayResult({
            selectedVendorCode: given.selectedVendorCode,
            paymentGatewayMessage: given.paymentGatewayMessage,
            paymentGatewayResult: given.paymentGatewayResult,
          });

          expect(result).toEqual('fail');
        });
      });
    });
  });

  context('selectedVendorCode에 해당되는 SUCCESS CODE, CANCEL CODE 둘 다 없는 경우', () => {
    given('selectedVendorCode', () => 'kakao-pay');

    context.each([
      {
        paymentGatewayMessage: 'anotherCode',
        paymentGatewayResult: 'anotherCode',
      },
      {
        paymentGatewayMessage: '',
        paymentGatewayResult: 'anotherCode',
      },
      {
        paymentGatewayMessage: 'anotherCode',
        paymentGatewayResult: '',
      },
      {
        paymentGatewayMessage: '',
        paymentGatewayResult: '',
      },
    ])(
      'paymentGatewayMessage, paymentGatewayResult 반환 여부에 상관없이',
      ({ paymentGatewayMessage, paymentGatewayResult }) => {
        given('paymentGatewayMessage', () => paymentGatewayMessage);
        given('paymentGatewayResult', () => paymentGatewayResult);

        it('success를 반환한다.', () => {
          const result = checkPaymentGatewayResult({
            selectedVendorCode: given.selectedVendorCode,
            paymentGatewayMessage: given.paymentGatewayMessage,
            paymentGatewayResult: given.paymentGatewayResult,
          });

          expect(result).toEqual('success');
        });
      },
    );
  });
});

describe('checkTossPaymentsResult', () => {
  given('groupOrderNo', () => '2022012312345');
  given('selectedVendorCode', () => 'toss-payments');
  given('paymentGatewayResult', () => '');
  given('tossPaymentsParameter', () => {});

  beforeEach(() => {
    Object.defineProperty(parent, 'location', {
      value: {
        href: '',
      },
    });
  });

  context('isGiftOrder가 true면', () => {
    it('선물하기 페이지로 이동한다.', () => {
      checkTossPaymentsResult({
        groupOrderNo: given.groupOrderNo,
        selectedVendorCode: given.selectedVendorCode,
        paymentGatewayResult: given.paymentGatewayResult,
        tossPaymentsParameter: given.tossPaymentsParameter,
        isGiftOrder: true,
      });

      expect(parent.location.href).toEqual(
        `${PAYMENT_GIFT_PATH.fail.uri}/${given.selectedVendorCode}?orderNumber=${given.groupOrderNo}`,
      );
    });
  });

  context('isGiftOrder가 false면', () => {
    it('주문서 페이지로 이동한다.', () => {
      checkTossPaymentsResult({
        groupOrderNo: given.groupOrderNo,
        selectedVendorCode: given.selectedVendorCode,
        paymentGatewayResult: given.paymentGatewayResult,
        tossPaymentsParameter: given.tossPaymentsParameter,
        isGiftOrder: false,
      });

      expect(parent.location.href).toEqual(
        `${ORDER_PATH.fail.uri}/${given.selectedVendorCode}?orderNumber=${given.groupOrderNo}`,
      );
    });
  });

  context('paymentGatewayResult가 취소를 반환하면', () => {
    given('paymentGatewayResult', () => TOSS_PATMENTS_CODE.CANCEL[0]);

    it('취소 페이지로 이동한다.', () => {
      checkTossPaymentsResult({
        groupOrderNo: given.groupOrderNo,
        selectedVendorCode: given.selectedVendorCode,
        paymentGatewayResult: given.paymentGatewayResult,
        tossPaymentsParameter: given.tossPaymentsParameter,
      });

      expect(parent.location.href).toEqual(
        `${ORDER_PATH.cancel.uri}/${given.selectedVendorCode}?orderNumber=${given.groupOrderNo}`,
      );
    });
  });

  context('paymentGatewayResult가 성공을 반환하면', () => {
    given('paymentGatewayResult', () => COMMON_SUCCESS_CODE[0]);

    it('성공 페이지로 이동한다.', () => {
      checkTossPaymentsResult({
        groupOrderNo: given.groupOrderNo,
        selectedVendorCode: given.selectedVendorCode,
        paymentGatewayResult: given.paymentGatewayResult,
        tossPaymentsParameter: given.tossPaymentsParameter,
      });

      expect(parent.location.href).toEqual(
        `${ORDER_PATH.success.uri}/${given.selectedVendorCode}${encodeQueryString({
          ...given.tossPaymentsParameter,
          groupOrderNo: given.groupOrderNo,
        })}`,
      );
    });
  });

  context('paymentGatewayResult가 성공이나 취소를 반환하지 않으면', () => {
    given('paymentGatewayResult', () => 'anotherCode');

    it('실패 페이지로 이동한다.', () => {
      checkTossPaymentsResult({
        groupOrderNo: given.groupOrderNo,
        selectedVendorCode: given.selectedVendorCode,
        paymentGatewayResult: given.paymentGatewayResult,
        tossPaymentsParameter: given.tossPaymentsParameter,
      });

      expect(parent.location.href).toEqual(
        `${ORDER_PATH.fail.uri}/${given.selectedVendorCode}${encodeQueryString({ orderNumber: given.groupOrderNo })}`,
      );
    });
  });
});
