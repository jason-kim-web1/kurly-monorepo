import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

import { notify } from '../../../shared/reducers/page';
import { useWebview } from '../../../shared/hooks';
import { fetchKurlyPass, postStopKurlyPass } from '../../../shared/api/kurly-pass/kurlyPass';

import deepLinkUrl from '../../../shared/constant/deepLink';
import { KURLY_PASS_CONTENTS_NUMBER } from '../../../shared/constant/kurlyPass';
import { getPageUrl, PRODUCT_PATH } from '../../../shared/constant';
import { KurlyPassHistoryResponse } from '../../../shared/interfaces';

import Alert from '../../../shared/components/Alert/Alert';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { useAppSelector } from '../../../shared/store';

const historyPageSize = 10;

interface Response extends KurlyPassHistoryResponse {
  loading: boolean;
  loadKurlyPassHistory: () => void;
  terminateKurlyPass: () => void;
  moveKurlyPass: () => void;
}

export default function useKurlyPass(): Response {
  const dispatch = useDispatch();
  const router = useRouter();
  const webview = useWebview();

  const { hasSession } = useAppSelector(({ auth }) => auth);

  const [loading, setLoading] = useState(true);
  const [kurlyPassData, setKurlyPassData] = useState<KurlyPassHistoryResponse>({
    list: [],
    currentKurlyPass: undefined,
    paging: {
      isFullyLoaded: false,
      pages: historyPageSize,
      currentPages: 0,
    },
  });

  const moveKurlyPass = () => {
    const productUrl = webview
      ? `${deepLinkUrl.PRODUCT}${KURLY_PASS_CONTENTS_NUMBER}`
      : `${getPageUrl(PRODUCT_PATH.detail)}/${KURLY_PASS_CONTENTS_NUMBER}`;

    router.push(productUrl);
  };

  const loadKurlyPassHistory = async () => {
    const {
      paging: { isFullyLoaded, currentPages },
    } = kurlyPassData;

    if (isFullyLoaded) {
      return;
    }

    setLoading(true);

    try {
      const pageNumber = currentPages + 1;
      const data = await fetchKurlyPass(pageNumber, historyPageSize);

      const totalList = [...kurlyPassData.list, ...data.list];

      setKurlyPassData({
        list: totalList,
        currentKurlyPass: data.currentKurlyPass,
        paging: data.paging,
      });
    } catch (e) {
      dispatch(notify(e.message));
    } finally {
      setLoading(false);
    }
  };

  const cancelKurlyPass = async () => {
    try {
      const { success } = await postStopKurlyPass();
      const text = success
        ? '컬리패스 사용해지 처리가 완료 되었습니다.'
        : '정상 처리 되지 않았습니다. 다시 시도해 주시기 바랍니다.';

      dispatch(notify(text));
    } catch (e) {
      dispatch(notify(e.message));
    }
  };

  const terminateKurlyPass = async () => {
    const { currentKurlyPass } = kurlyPassData;

    if (!currentKurlyPass) {
      return;
    }

    const date = format(new Date(currentKurlyPass.expiredDate), 'yyyy.MM.dd');

    const isConfirmed = await Alert({
      text: `컬리패스를 정말 해지하시겠습니까? 해지하시면 ${date}부터 40,000 원 이상 구매 하셔야 무료배송 혜택을 받으실 수 있습니다.`,
    });

    if (!isConfirmed) {
      return;
    }

    await cancelKurlyPass();
  };

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('컬리패스');
    }
  }, []);

  useEffect(() => {
    if (hasSession) {
      loadKurlyPassHistory();
    }
  }, [hasSession]);

  return {
    loading,
    list: kurlyPassData.list,
    currentKurlyPass: kurlyPassData.currentKurlyPass,
    paging: kurlyPassData.paging,
    moveKurlyPass,
    loadKurlyPassHistory,
    terminateKurlyPass,
  };
}
