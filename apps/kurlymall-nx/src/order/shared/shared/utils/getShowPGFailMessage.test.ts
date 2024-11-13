import { getShowPGFailMessage } from './getShowPGFailMessage';

describe('getShowPGFailMessage', () => {
  given('selectedVendorCode', () => '');
  given('paymentGatewayMessage', () => '');

  const givenGetShowPGFailMessage = () =>
    getShowPGFailMessage({
      selectedVendorCode: given.selectedVendorCode,
      paymentGatewayMessage: given.paymentGatewayMessage,
    });

  context('결제 실패 페이지에서 결제 실패 메세지를 보여줘야 하는 결제 수단인 경우', () => {
    given('selectedVendorCode', () => 'phonebill');

    context('paymentGatewayMessage 값이 있으면', () => {
      given('paymentGatewayMessage', () => 'paymentGatewayMessage');

      it('true를 반환한다.', () => {
        expect(givenGetShowPGFailMessage()).toBeTruthy();
      });
    });

    context('paymentGatewayMessage 값이 없으면', () => {
      given('paymentGatewayMessage', () => '');

      it('false를 반환한다.', () => {
        expect(givenGetShowPGFailMessage()).toBeFalsy();
      });
    });
  });

  context('결제 실패 페이지에서 결제 실패 메세지를 보여줘야 하지 않는 결제 수단인 경우', () => {
    given('selectedVendorCode', () => 'kakao-pay');

    it('false를 반환한다.', () => {
      expect(givenGetShowPGFailMessage()).toBeFalsy();
    });
  });
});
