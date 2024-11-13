import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AppState } from '../../shared/store';
import { isMobileDevice, isWebview } from '../../../util/window/getDevice';
import Alert from '../../shared/components/Alert/Alert';
import PcAdultVerification from './components/PcAdultVerification';
import MoAdultVerification from './components/MoAdultVerification';
import getVerificationUrl from './services/getVerificationUrl';
import { loadAdultVerificationData } from './services/adult-verificaiton-data-storage';
import { redirectTo } from '../../shared/reducers/page';
import { USER_MENU_PATH } from '../../shared/constant';

export interface VerificationData {
  refererUrl: string;
  goodsNo: number;
}

export type AdultVerificationResult = 'success' | 'fail' | undefined;

const HASH_ID = '#NoticeScroll';

const getVerificationData = (): VerificationData | null => {
  const data = loadAdultVerificationData();

  if (!data) {
    return null;
  }

  return {
    refererUrl: data.referrer_url,
    goodsNo: data.goodsno,
  } as VerificationData;
};

export default function AdultVerificationContainer() {
  const [authRequesting, setAuthRequesting] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const { accessToken } = useSelector(({ auth }: AppState) => auth);
  const [agreeCheck, setAgreeCheck] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { result } = router.query as { result: AdultVerificationResult };

  useEffect(() => {
    if (isWebview()) {
      setVerificationData({
        refererUrl: '',
        goodsNo: 0,
      });
      return;
    }
    // 웹의 경우 session storage 에 VerificationReturnData 가 없으면 잘못된 접근
    const data = getVerificationData();

    if (!data) {
      Alert({
        text: '잘못된 접근입니다.',
      }).then(() => {
        // 잘못된 접근일 경우 메인으로 보냄.
        // 성인인증 완료하여 상품 페이지로 이동한 뒤, 확인 클릭하여 뒤로가기 하면 서드파티 페이지로 이동함
        dispatch(redirectTo({ url: USER_MENU_PATH.home.uri }));
      });
      return;
    }

    setVerificationData(data);
  }, [dispatch]);

  const moveToVerificationUrl = async () => {
    setAuthRequesting(true);
    try {
      const url = await getVerificationUrl(accessToken);
      await router.push(url);
    } catch (err) {
      await Alert({ text: '서비스 장애로 이용이 불가합니다 \n 잠시 후 다시 시도해 주세요.' });
    } finally {
      setAuthRequesting(false);
    }
  };

  const AdultVerification = isMobileDevice ? MoAdultVerification : PcAdultVerification;

  const handleChangeAgreeCheck = useCallback(() => {
    setAgreeCheck(() => !agreeCheck);
  }, [agreeCheck]);

  const handleClickAgreeView = useCallback(() => {
    setAgreeTerms(() => !agreeTerms);

    const currentRoute = router.asPath;
    const shouldAddHash = !currentRoute.includes(HASH_ID);
    const newRoute = shouldAddHash ? currentRoute + HASH_ID : currentRoute.replace(HASH_ID, '');
    router.push(newRoute, undefined, { shallow: true });
  }, [agreeTerms]);

  if (!accessToken || !verificationData) {
    return null;
  }

  return (
    <AdultVerification
      verificationData={verificationData}
      result={result}
      handleClickAuth={moveToVerificationUrl}
      authRequesting={authRequesting}
      agreeCheck={agreeCheck}
      agreeTerms={agreeTerms}
      handleChangeAgree={handleChangeAgreeCheck}
      handleClickAgree={handleClickAgreeView}
    />
  );
}
