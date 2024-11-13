/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { parse } from 'qs';

import getRawBody from 'raw-body';

import { ParsedUrlQuery } from 'querystring';

import { TossPaymentsPostProcessPageProps } from '../../../../../../shared/interfaces';

import { checkTossPaymentsResult } from '../../../../../shared/shared/utils/checkPaymentGatewayResult';
import { getWebViewInjectedAccessToken } from '../../../../../../server/webview';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';

export default function TossPaymentsProcessContainer({
  paymentGatewayResult,
  tossPaymentsParameter,
  isGiftOrder = false,
  isJoinOrder,
}: TossPaymentsPostProcessPageProps) {
  const { query } = useRouter();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder });

  const { orderNumber: groupOrderNo } = query as ParsedUrlQuery & {
    orderNumber: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    checkTossPaymentsResult({
      groupOrderNo,
      selectedVendorCode: 'toss-payments',
      paymentGatewayResult,
      tossPaymentsParameter,
      isGiftOrder,
      isJoinOrder,
    });
  }, [paymentReady, groupOrderNo, paymentGatewayResult, tossPaymentsParameter, isGiftOrder, isJoinOrder]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return <></>;
}

export function getServerSideTossPaymentsProps() {
  return async (context: GetServerSidePropsContext) => {
    const accessToken = getWebViewInjectedAccessToken(context);
    const { req } = context;
    try {
      const body = await getRawBody(req as any, { limit: '1mb', encoding: 'UTF-8' });
      const result: any = parse(body.toString());

      return {
        props: {
          accessToken,
          paymentGatewayResult: result.LGD_RESPCODE ?? '',
          tossPaymentsParameter: {
            authType: result.LGD_AUTHTYPE ?? '',
            pointUse: result.LGD_RES_CARDPOINTYN ?? '',
            installment: result.LGD_INSTALL ?? '',
            noInt: result.LGD_NOINT ?? '',
            cardCode: result.KVP_CARDCODE ?? '',
            sessionKey: result.KVP_SESSIONKEY ?? '',
            encData: result.KVP_ENCDATA ?? '',
            pan: result.LGD_PAN ?? '',
            eci: result.VBV_ECI ?? '',
            cavv: result.VBV_CAVV ?? '',
            xid: result.VBV_XID ?? '',
            joinCode: result.VBV_JOINCODE ?? '',
          },
        },
      };
    } catch (err) {
      return { props: { accessToken } };
    }
  };
}
