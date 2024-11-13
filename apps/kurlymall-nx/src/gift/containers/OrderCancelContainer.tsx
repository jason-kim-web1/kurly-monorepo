import { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import Alert from '../../shared/components/Alert/Alert';
import { isWebview } from '../../../util/window/getDevice';
import appService from '../../shared/services/app.service';
import { ORDER_CANCEL } from '../../shared/services/serviceCode';
import { ParsedUrlQuery } from 'querystring';
import { redirectTo } from '../../shared/reducers/page';

interface Props {
  moveCancelPage?: boolean;
  headTitleText?: string;
}

export default function OrderCancelContainer({ moveCancelPage, headTitleText = '결제 취소' }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { orderNumber } = router.query as ParsedUrlQuery & { orderNumber: string };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isWebview()) {
      appService.postGiftResult({ orderNumber, status: ORDER_CANCEL });
      return;
    }

    Alert({
      text: '결제를 취소했습니다.',
    }).then(() => {
      if (moveCancelPage) {
        dispatch(
          redirectTo({
            url: '/m/order/gift/cancel',
          }),
        );
      } else {
        router.back();
      }
    });
  }, [router, orderNumber, moveCancelPage]);

  return (
    <Head>
      <title>{headTitleText}</title>
    </Head>
  );
}
