import { useCallback, useEffect, useState } from 'react';

import { forEach, snakeCase } from 'lodash';

import { useRouter } from 'next/router';
import Script from 'next/script';

import { TossPaymentsConfig } from '../../../../../shared/shared/constants';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import MWInProgress from '../../../../../shared/m/components/InProgress';
import { ParsedUrlQuery } from 'querystring';
import orderResult from '../../../../../shared/shared/utils/orderResult';
import { useAppSelector } from '../../../../../../shared/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

interface Props {
  isMobilePage?: boolean;
}

export default function TossPaymentsInitContainer({ isMobilePage = false }: Props) {
  const { query, isReady } = useRouter();
  const accessToken = useAppSelector(({ auth }) => auth.accessToken);

  const [scriptOnLoad, setScriptOnLoad] = useState(false);

  const routerQuery = query as ParsedUrlQuery & {
    cstPlatform: string;
    groupOrderNo: string;
  };

  const handleOnLoad = () => {
    setScriptOnLoad(true);
  };

  const movePage = useCallback(() => {
    if (!accessToken || !isReady) {
      return;
    }

    const form = document.getElementById('LGD_PAYINFO');

    if ((scriptOnLoad || window.openXpay) && form) {
      const { LGD_VERSION, LGD_WINDOW_TYPE_MW, LGD_WINDOW_TYPE_PC, LGD_WINDOW_VERSION } = TossPaymentsConfig;
      const data = {
        lgdWindowType: '',
        lgdWindowVersion: '',
        lgdVersion: '',
        ...routerQuery,
      };

      try {
        forEach(data, (value, key) => {
          const element = document.createElement('input');
          element.name = snakeCase(key).toUpperCase();
          element.hidden = true;
          if (element.name === 'LGD_VERSION') {
            element.value = LGD_VERSION;
          } else if (element.name === 'LGD_WINDOW_TYPE') {
            element.value = isMobilePage ? LGD_WINDOW_TYPE_MW : LGD_WINDOW_TYPE_PC;
          } else if (element.name === 'LGD_WINDOW_VERSION') {
            element.value = LGD_WINDOW_VERSION;
          } else {
            element.value = value as string;
          }
          form.appendChild(element);
        });

        window.openXpay(document.getElementById('LGD_PAYINFO'), data.cstPlatform, isMobilePage ? 'submit' : 'iframe');
      } catch (e) {
        const { paymentsScriptLoadingFail } = orderResult();

        paymentsScriptLoadingFail({ showAlert: true, groupOrderNo: data.groupOrderNo });
      }
    }
  }, [accessToken, isReady, scriptOnLoad, routerQuery, isMobilePage]);

  useEffect(() => {
    movePage();
  }, [movePage]);

  return (
    <>
      <Script src="https://xpayvvip.tosspayments.com/xpay/js/xpay_crossplatform.js" onLoad={() => handleOnLoad()} />
      {isMobilePage ? <MWInProgress /> : <PCInProgress />}
      <form method="post" name="LGD_PAYINFO" id="LGD_PAYINFO" action="" acceptCharset="euc-kr" />
    </>
  );
}
