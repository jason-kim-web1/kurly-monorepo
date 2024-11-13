/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { parse } from 'qs';

import getRawBody from 'raw-body';

import { GetServerSidePropsContext } from 'next';

import { ParsedUrlQuery } from 'querystring';

import { PostProcessPageProps } from '../../../../../../shared/interfaces';
import { completeOrder } from '../../../../../shared/shared/reducers/payments.slice';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import MWInProgress from '../../../../../shared/m/components/InProgress';
import { getWebViewInjectedAccessToken } from '../../../../../../server/webview';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';

interface Props extends PostProcessPageProps {
  isMobilePage?: boolean;
  isJoinOrder?: boolean;
}

export default function PhonebillProcessContainer({
  isMobilePage = false,
  isJoinOrder,
  paymentAllResult,
  paymentGatewayResult,
  paymentGatewayMessage,
  paymentGatewayAuthNo,
  paymentGatewayToken,
  paymentGatewayTransactionId,
}: Props) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isJoinOrder });

  const { orderNumber: groupOrderNo } = query as ParsedUrlQuery & {
    orderNumber: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      completeOrder({
        groupOrderNo,
        selectedVendorCode: 'phonebill',
        paymentAllResult,
        paymentGatewayResult,
        paymentGatewayMessage,
        paymentGatewayAuthNo,
        paymentGatewayToken,
        paymentGatewayTransactionId,
        isJoinOrder,
      }),
    );
  }, [
    paymentReady,
    dispatch,
    groupOrderNo,
    paymentAllResult,
    paymentGatewayResult,
    paymentGatewayMessage,
    paymentGatewayAuthNo,
    paymentGatewayToken,
    paymentGatewayTransactionId,
    isJoinOrder,
  ]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress />;
}

export function getServerSidePhonebillProps() {
  return async (context: GetServerSidePropsContext) => {
    const accessToken = getWebViewInjectedAccessToken(context);
    const { req } = context;

    try {
      const body = await getRawBody(req as any, { limit: '1mb', encoding: 'UTF-8' });
      const result: any = parse(body.toString());

      return {
        props: {
          accessToken,
          paymentAllResult: JSON.stringify(result) ?? '',
          paymentGatewayResult: result.code ?? '',
          paymentGatewayMessage: result.message ?? '',
          paymentGatewayToken: result.payToken ?? '',
          paymentGatewayTransactionId: result.transactionId ?? '',
          paymentGatewayAuthNo: result.pgAuthNo ?? '',
        },
      };
    } catch (err) {
      return { props: { accessToken } };
    }
  };
}
