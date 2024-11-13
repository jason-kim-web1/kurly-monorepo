import { useCallback, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import getRawBody from 'raw-body';

import { storeAppToken } from '../../../../../src/order/shared/shared/services/appToken.storage.service';

import { PlaceOrderResponse } from '../../../../../src/shared/interfaces';
import { PaymentsVendorCode } from '../../../../../src/order/shared/shared/interfaces/OrderVendorCode.interface';

import { setAccessToken } from '../../../../../src/shared/reducers/auth';
import { loadOrder } from '../../../../../src/order/shared/shared/reducers/payments.slice';

import InProgress from '../../../../../src/order/shared/m/components/InProgress';

interface Props {
  accessToken: string;
  selectedVendorCode: PaymentsVendorCode;
  placeOrderResponse: PlaceOrderResponse;
}

export default function WebviewProcessPage({ accessToken, selectedVendorCode, placeOrderResponse }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const checkResult = useCallback(() => {
    if (!router.isReady) {
      return;
    }

    if (accessToken) {
      storeAppToken(accessToken);
      dispatch(
        setAccessToken({
          accessToken,
          isGuest: false,
        }),
      );
    }

    dispatch(
      loadOrder({
        placeOrderResponse,
        selectedVendorCode,
        isGiftOrder: true,
      }),
    );
  }, [accessToken, dispatch, placeOrderResponse, router.isReady, selectedVendorCode]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return <InProgress />;
}

interface Context extends GetServerSideProps {
  req: {
    headers: {
      authorization: string;
    };
  };
}

export async function getServerSideProps(context: Context) {
  const { req } = context;
  const { authorization } = req.headers;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = await getRawBody(req as any, { limit: '1mb', encoding: 'UTF-8' });
    const result = JSON.parse(body);

    return {
      props: {
        accessToken: authorization?.replace('Bearer ', '') ?? '',
        selectedVendorCode: result?.selectedVendorCode ?? null,
        placeOrderResponse: result?.placeOrderResponse ?? null,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
