import { getPageUrl, ORDER_PATH, PAYMENT_GIFT_PATH } from '../../../../shared/constant';
import { PlaceOrderResponse } from '../../../../shared/interfaces';
import { getOrderParams } from './getOrderParams';
import { storeTossToken } from '../services/tossToken.storage.service';

jest.mock('../../../../../util/window/getDevice');
jest.mock('../services/tossToken.storage.service');

const mockGetDevice = jest.requireMock('../../../../../util/window/getDevice');

describe('getOrderParams', () => {
  const placeOrderResponse: PlaceOrderResponse = {
    groupOrderNo: '1234',
    paymentAuthParameter: {
      paymentGatewayToken: 'pgToken',
      paymentGatewayTransactionId: 'pgTransactionId',
      tossPaymentsParameter: {
        lgdRespcode: 'lgdRespcode',
      },
    },
    paymentUrlParameter: {
      nextRedirectAppUrl: null,
      nextRedirectPcUrl: '',
      nextRedirectMobileUrl: '',
      androidAppScheme: null,
      iosAppScheme: null,
    },
    kurlypayEasyPaymentUrlParameter: {
      requestUrl: 'kurlypayEasyPaymentUrl',
    },
  };

  const placeOrderHasUrlParameterResponse: PlaceOrderResponse = {
    ...placeOrderResponse,
    paymentUrlParameter: {
      nextRedirectAppUrl: null,
      nextRedirectPcUrl: 'nextRedirectPcUrl',
      nextRedirectMobileUrl: 'nextRedirectMobileUrl',
      androidAppScheme: null,
      iosAppScheme: null,
    },
  };

  beforeEach(() => {
    mockGetDevice.isPC = true;
  });

  context('commonPath', () => {
    context('주문 타입이 주문서면', () => {
      const isGiftOrder = false;

      it('ORDER_PATH를 반환한다.', () => {
        expect(getOrderParams({ placeOrderResponse, selectedVendorCode: 'kurly', isGiftOrder })).toEqual({
          url: `${getPageUrl(ORDER_PATH.success)}/kurly?groupOrderNo=${
            placeOrderResponse.groupOrderNo
          }&paymentGatewayTransactionId=${placeOrderResponse.paymentAuthParameter.paymentGatewayTransactionId}`,
        });
      });
    });

    context('주문 타입이 선물하기면', () => {
      const isGiftOrder = true;

      it('PAYMENT_GIFT_PATH를 반환한다.', () => {
        expect(getOrderParams({ placeOrderResponse, selectedVendorCode: 'kurly', isGiftOrder })).toEqual({
          url: `${getPageUrl(PAYMENT_GIFT_PATH.success)}/kurly?groupOrderNo=${
            placeOrderResponse.groupOrderNo
          }&paymentGatewayTransactionId=${placeOrderResponse.paymentAuthParameter.paymentGatewayTransactionId}`,
        });
      });
    });
  });

  context('결제 수단이 kurly(전액적립금)이면', () => {
    const selectedVendorCode = 'kurly';

    context('핀 코드 인증이 필요한 경우', () => {
      it('핀 코드 인증 url을 반환한다.', () => {
        expect(getOrderParams({ placeOrderResponse: placeOrderHasUrlParameterResponse, selectedVendorCode })).toEqual({
          url: `${placeOrderHasUrlParameterResponse.paymentUrlParameter.nextRedirectPcUrl}`,
        });
      });
    });

    context('핀 코드 인증이 필요하지 않은 경우', () => {
      it('주문 성공 url을 반환한다.', () => {
        expect(getOrderParams({ placeOrderResponse, selectedVendorCode })).toEqual({
          url: `${getPageUrl(ORDER_PATH.success)}/${selectedVendorCode}?groupOrderNo=${
            placeOrderResponse.groupOrderNo
          }&paymentGatewayTransactionId=${placeOrderResponse.paymentAuthParameter.paymentGatewayTransactionId}`,
        });
      });
    });
  });

  context('결제 수단이 toss-payments이면', () => {
    const selectedVendorCode = 'toss-payments';

    context('모든 환경에서', () => {
      it('url 및 query를 반환한다.', () => {
        expect(getOrderParams({ placeOrderResponse, selectedVendorCode })).toEqual({
          url: `${getPageUrl(ORDER_PATH.init)}/${selectedVendorCode}`,
          query: {
            groupOrderNo: placeOrderResponse.groupOrderNo,
            ...placeOrderResponse.paymentAuthParameter.tossPaymentsParameter,
            lgd_returnurl: 'http://localhost/order/checkout/process/toss-payments',
          },
        });
      });
    });
  });

  context('결제 수단이 toss이면', () => {
    const selectedVendorCode = 'toss';

    context('PC 환경일 때', () => {
      it('storeTossToken를 호출하고 url을 반환한다.', () => {
        const result = getOrderParams({ placeOrderResponse: placeOrderHasUrlParameterResponse, selectedVendorCode });

        expect(storeTossToken).toHaveBeenCalled();
        expect(result).toEqual({
          url: placeOrderHasUrlParameterResponse.paymentUrlParameter.nextRedirectPcUrl,
        });
      });
    });

    context('PC 환경이 아닐 때', () => {
      it('storeTossToken를 호출하고 url을 반환한다.', () => {
        mockGetDevice.isPC = false;
        const result = getOrderParams({ placeOrderResponse: placeOrderHasUrlParameterResponse, selectedVendorCode });

        expect(storeTossToken).toHaveBeenCalled();
        expect(result).toEqual({
          url: placeOrderHasUrlParameterResponse.paymentUrlParameter.nextRedirectMobileUrl,
        });
      });
    });
  });

  context('이외에 다른 결제 수단이면', () => {
    const selectedVendorCode = 'naver-pay';

    context('PC 환경일 때', () => {
      it('url을 반환한다.', () => {
        expect(getOrderParams({ placeOrderResponse: placeOrderHasUrlParameterResponse, selectedVendorCode })).toEqual({
          url: placeOrderHasUrlParameterResponse.paymentUrlParameter.nextRedirectPcUrl,
        });
      });
    });

    context('PC 환경이 아닐 때', () => {
      it('url을 반환한다.', () => {
        mockGetDevice.isPC = false;
        expect(getOrderParams({ placeOrderResponse: placeOrderHasUrlParameterResponse, selectedVendorCode })).toEqual({
          url: placeOrderHasUrlParameterResponse.paymentUrlParameter.nextRedirectMobileUrl,
        });
      });
    });
  });
});
