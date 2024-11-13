import { Experiment, GrowthBook, GrowthBookProvider, Result } from '@growthbook/growthbook-react';
import { ReactNode, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { isPC, isWebview } from '../../../util/window/getDevice';
import { GROWTHBOOK_API_HOST, GROWTHBOOK_CLIENT_KEY, isProduction } from '../configs/config';
import { SetUpExperimentEnv } from '../amplitude/events/SetUpExperimentEnv';
import { amplitudeService } from '../amplitude';
import { useAppSelector } from '../store';

const onExperimentViewed = (experiment: Experiment<any>, result: Result<any>) => {
  const experimentId = experiment.key;
  const variationId = result.key;

  console.log('Viewed Experiment', {
    experimentId,
    variationId,
  });

  amplitudeService.logEvent(
    new SetUpExperimentEnv({
      experimentId,
      variationId,
    }),
  );
};

// GrowthBook 인스턴스 생성
const gb =
  !isWebview() && !isPC
    ? new GrowthBook({
        apiHost: GROWTHBOOK_API_HOST,
        clientKey: GROWTHBOOK_CLIENT_KEY,
        // 개발할 때를 위한 디버깅 유무
        enableDevMode: !isProduction(),
        // GrowthBook에서 적용된 Feature Flagging의 실시간 적용 유무
        subscribeToChanges: !isProduction(),
        // A/B Testing을 샤용할 때 필수 함수
        // 유저가 실험군 기능을 사용했을 때마다 호출됨
        trackingCallback: onExperimentViewed,
      })
    : undefined;

type CustomGrowthBookProviderProps = {
  children?: ReactNode;
};

function CustomGrowthBookProvider({ children }: CustomGrowthBookProviderProps) {
  const { isReady, events } = useRouter();

  const { uid, isGuest, hasSession, memberNo, gradeName, address, clusterCenterCode } = useAppSelector(
    ({ auth, member, shippingAddress }) => ({
      uid: auth.uid,
      isGuest: auth.isGuest,
      hasSession: auth.hasSession,
      memberNo: member.info?.memberNo,
      gradeName: member.info?.gradeName,
      address: shippingAddress?.currentAddress?.address,
      clusterCenterCode: shippingAddress?.currentAddress?.clusterCenterCode,
    }),
  );

  const isUseToGrowthBook = useMemo(() => {
    if (isReady) {
      return isWebview() || isPC;
    }
    return false;
  }, [isReady]);

  useEffect(() => {
    // GrowthBook 초기화
    gb?.loadFeatures({ timeout: 2000 });
  }, []);

  useEffect(() => {
    const handleChangeRoute = () => {
      // URL이 바뀔 때마다 GrowthBook에 업데이트하여 이벤트 가져오도록 함
      gb?.setURL(window.location.href);
    };

    events.on('routeChangeStart', handleChangeRoute);

    return () => {
      events.on('routeChangeStart', handleChangeRoute);
    };
  }, [isUseToGrowthBook, events]);

  useEffect(() => {
    if (!gb) {
      return;
    }

    // Attributes 갱신 초기화
    let attributes: Record<string, string | number | boolean | undefined> = {
      device_id: amplitudeService.getDeviceId(),
    };

    if (hasSession) {
      attributes = { ...attributes, is_guest: isGuest };

      if (isGuest) {
        attributes = { ...attributes, id: undefined };
      } else if (uid) {
        attributes = { ...attributes, id: uid };
      }
    }

    if (memberNo && gradeName) {
      attributes = { ...attributes, cust_no: memberNo, membership_level: gradeName };
    }

    if (address && clusterCenterCode) {
      attributes = { ...attributes, center_code: clusterCenterCode };
    }

    gb?.setAttributes(attributes);

    // 개발할 때 디버깅을 위한 로그
    if (!isProduction()) {
      console.group('Attributes 갱신 초기화');
      console.log(attributes);
      console.groupEnd();
    }
  }, [address, clusterCenterCode, hasSession, memberNo, isGuest, gradeName, uid]);

  if (!gb) {
    return <>{children}</>;
  }

  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>;
}

export default CustomGrowthBookProvider;
