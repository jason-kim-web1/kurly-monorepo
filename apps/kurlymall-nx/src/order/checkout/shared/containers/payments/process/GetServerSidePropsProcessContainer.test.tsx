import { GetServerSidePropsContext } from 'next';

import getRawBody from 'raw-body';

import { getServerSideTossPaymentsProps } from './TossPaymentsProcessContainer';
import { getServerSidePhonebillProps } from './PhonebillProcessContainer';

jest.mock('raw-body');

const getServerSidePropsContext = {
  req: {
    headers: {
      authorization: 'Bearer Token',
    },
  },
} as GetServerSidePropsContext;

describe('getServerSideTossPaymentsProps', () => {
  context('정상적으로 데이터를 받았다면', () => {
    it('데이터를 가공하여 반환한다', async () => {
      (getRawBody as jest.Mock).mockImplementation(() => 'LGD_RESPMSG=message&LGD_RESPCODE=0000');

      const value = await getServerSideTossPaymentsProps()(getServerSidePropsContext);

      expect(value).toStrictEqual({
        props: {
          accessToken: 'Token',
          paymentGatewayResult: '0000',
          tossPaymentsParameter: {
            authType: '',
            pointUse: '',
            installment: '',
            noInt: '',
            cardCode: '',
            sessionKey: '',
            encData: '',
            pan: '',
            eci: '',
            cavv: '',
            xid: '',
            joinCode: '',
          },
        },
      });
    });
  });

  context('데이터가 빈 값이면', () => {
    it('오브젝트 값에 빈 문자열을 넣어 반환한다.', async () => {
      (getRawBody as jest.Mock).mockImplementation(() => '');

      const value = await getServerSideTossPaymentsProps()(getServerSidePropsContext);

      expect(value).toStrictEqual({
        props: {
          accessToken: 'Token',
          paymentGatewayResult: '',
          tossPaymentsParameter: {
            authType: '',
            pointUse: '',
            installment: '',
            noInt: '',
            cardCode: '',
            sessionKey: '',
            encData: '',
            pan: '',
            eci: '',
            cavv: '',
            xid: '',
            joinCode: '',
          },
        },
      });
    });
  });

  context('정상적으로 데이터를 받지 못했다면', () => {
    it('빈 오브젝트를 반환한다.', async () => {
      (getRawBody as jest.Mock).mockImplementation(() => undefined);

      const value = await getServerSideTossPaymentsProps()(getServerSidePropsContext);

      expect(value).toStrictEqual({
        props: { accessToken: 'Token' },
      });
    });
  });
});

describe('getServerSidePhonebillProps', () => {
  context('정상적으로 데이터를 받았다면', () => {
    it('데이터를 가공하여 반환한다', async () => {
      (getRawBody as jest.Mock).mockImplementation(
        () => 'code=0000&payToken=pay_token&transactionId=tid&pgAuthNo=mc_user_key',
      );

      const value = await getServerSidePhonebillProps()(getServerSidePropsContext);

      expect(value).toStrictEqual({
        props: {
          accessToken: 'Token',
          paymentAllResult: '{"code":"0000","payToken":"pay_token","transactionId":"tid","pgAuthNo":"mc_user_key"}',
          paymentGatewayAuthNo: 'mc_user_key',
          paymentGatewayMessage: '',
          paymentGatewayResult: '0000',
          paymentGatewayToken: 'pay_token',
          paymentGatewayTransactionId: 'tid',
        },
      });
    });
  });

  context('데이터가 빈 값이면', () => {
    it('오브젝트 값에 빈 값을 넣어 반환한다.', async () => {
      (getRawBody as jest.Mock).mockImplementation(() => '');

      const value = await getServerSidePhonebillProps()(getServerSidePropsContext);

      expect(value).toStrictEqual({
        props: {
          accessToken: 'Token',
          paymentAllResult: '{}',
          paymentGatewayAuthNo: '',
          paymentGatewayMessage: '',
          paymentGatewayResult: '',
          paymentGatewayToken: '',
          paymentGatewayTransactionId: '',
        },
      });
    });
  });

  context('정상적으로 데이터를 받지 못했다면', () => {
    it('빈 오브젝트를 반환한다.', async () => {
      (getRawBody as jest.Mock).mockImplementation(() => undefined);

      const value = await getServerSidePhonebillProps()(getServerSidePropsContext);

      expect(value).toStrictEqual({
        props: {
          accessToken: 'Token',
        },
      });
    });
  });
});
