import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { ParsedUrlQuery } from 'querystring';

import { completeOrder } from '../../../../../shared/shared/reducers/payments.slice';

import openNewWindow from '../../../../../../shared/utils/open-new-window';
import orderResult from '../../../../../shared/shared/utils/orderResult';

import { getPageUrl, ORDER_PATH } from '../../../../../../shared/constant';
import { isProduction, KURLY_PRODUCTION_URL_LIST } from '../../../../../../shared/configs/config';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import { useAppSelector } from '../../../../../../shared/store';

export default function PopUpInitContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState<Window>();
  const refCloseAction = useRef(true);
  const { isGiftOrder } = useAppSelector(({ checkout }) => checkout);

  const { groupOrderNo, selectedVendorCode, ...query } = router.query as ParsedUrlQuery & {
    groupOrderNo: string;
    selectedVendorCode: string;
    [key: string]: string | number;
  };

  const openPopup = useCallback(() => {
    if (router.isReady && !popup) {
      const content = openNewWindow({
        name: selectedVendorCode,
        onClose: () => {
          if (refCloseAction.current) {
            orderResult().paymentsCancel({ groupOrderNo, isGiftOrder });
          }
        },
        onBlockPopup: () => {
          getPageUrl(ORDER_PATH.order);
        },
        onCloseUseInterval: true,
        url: `/order/${isGiftOrder ? 'gift' : 'checkout'}/init/${selectedVendorCode}`,
        query,
        option: {
          width: 400,
          height: 700,
        },
      });

      if (content) {
        setPopup(content);
      }
    }
  }, [groupOrderNo, isGiftOrder, popup, query, router.isReady, selectedVendorCode]);

  useEffect(() => {
    openPopup();
  }, [openPopup]);

  useEffect(() => {
    const receiveMessage = (message: MessageEvent) => {
      if (isProduction() && !KURLY_PRODUCTION_URL_LIST.includes(message.origin)) {
        return;
      }

      if (message.data.source === 'close-payments-gateway') {
        refCloseAction.current = false;
        popup?.close();

        const params = {
          ...message.data.props,
          isGiftOrder,
        };

        dispatch(completeOrder(params));
      }
    };

    window.addEventListener('message', receiveMessage, false);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [dispatch, isGiftOrder, popup]);

  useEffect(() => {
    const handleChangeStart = () => {
      refCloseAction.current = false;
      popup?.close();
    };

    router.events.on('routeChangeStart', handleChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleChangeStart);
    };
  }, [popup, router.events]);

  return <PCInProgress />;
}
