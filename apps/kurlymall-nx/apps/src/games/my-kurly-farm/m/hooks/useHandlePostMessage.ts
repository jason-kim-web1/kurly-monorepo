import { Alarm, KurlyWebSdkError } from '@thefarmersfront/kurly-web-sdk';
import { isBoolean } from 'lodash';

import { useEffect } from 'react';

import Alert from '../../../../shared/components/Alert/Alert';
import { isWebview } from '../../../../../util/window/getDevice';
import {
  KAKAO_SHARE_KEY,
  KURLY_PRODUCTION_URL_LIST,
  RESOURCE_URL,
  isProduction,
} from '../../../../shared/configs/config';
import appService from '../../../../shared/services/app.service';
import { GAME_PATH } from '../../../../shared/constant';
import { encodeQueryString } from '../../../../shared/utils/querystring-encoder';
import { handleKurlyWebSdkError } from '../../../utils/handleKurlyWebSdkError';
import useLoadKakao from '../../../../shared/hooks/useLoadKakao';
import { amplitudeService } from '../../../../shared/amplitude';
import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';

const targetOrigin = isProduction() ? 'https://game.kurly.com' : '*';

const handleStartGame = (e: MessageEvent) => {
  (e.source as WindowProxy)?.postMessage(
    {
      source: 'startGameCallback',
    },
    targetOrigin,
  );
};

const handleSetNotification = async (e: MessageEvent) => {
  if (!isBoolean(e.data.payload.gameNoti)) {
    return;
  }

  try {
    // 앱 수신 동의 설정 시도가 없는 경우 undefined를 보냅니다.
    let appNoti;

    // 게임 수신 동의를 켜는 경우에만 앱 수신 동의 설정을 시도합니다.
    if (e.data.payload.gameNoti) {
      appNoti = (await Alarm.setDeviceAlarmPermissionOn()).success;
    }

    (e.source as WindowProxy)?.postMessage(
      {
        source: 'setNotification',
        payload: {
          appNoti,
        },
      },
      targetOrigin,
    );
  } catch (alarmError) {
    if (alarmError instanceof KurlyWebSdkError) {
      handleKurlyWebSdkError(alarmError);
    }

    (e.source as WindowProxy)?.postMessage(
      {
        source: 'setNotification',
        payload: {
          marketNoti: undefined,
        },
      },
      targetOrigin,
    );
  }
};

const handleAddAlarm = async (e: MessageEvent) => {
  try {
    await Alarm.addAlarm(e.data.payload);
  } catch (alarmError) {
    if (alarmError instanceof KurlyWebSdkError) {
      handleKurlyWebSdkError(alarmError);
    }
  }
};

const handleDeleteAlarm = async (e: MessageEvent) => {
  try {
    const { alarmId, isScheduled } = e.data.payload;

    await Alarm.deleteAlarm(alarmId, isScheduled);
  } catch (alarmError) {
    if (alarmError instanceof KurlyWebSdkError) {
      handleKurlyWebSdkError(alarmError);
    }
  }
};

const handleCloseGame = () => {
  if (!isWebview()) {
    Alert({ text: '컬리 앱에서 이용할 수 있습니다.' });
    return;
  }

  appService.closeWebview();
};

const handleKakaoShare = async (memberId: string, encryptMemberId: string) => {
  const kakao = window.Kakao;

  if (!isWebview()) {
    Alert({ text: '컬리 앱에서 이용할 수 있습니다.' });
    return;
  }

  if (!kakao) {
    Alert({ text: '현재 카카오톡 공유하기를 사용할 수 없습니다.' });
    return;
  }

  if (!kakao.isInitialized()) {
    kakao.init(KAKAO_SHARE_KEY);
  }

  const url = `${window.location.origin}${GAME_PATH.myKurlyFarm.uri}${encodeQueryString({ recomId: encryptMemberId })}`;

  kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '초대장💌 내가 키운 커피, 바나나 무료로 받기',
      description: `${memberId}님이 초대장을 보냈어요. 마이컬리팜이 처음이라면, 웰컴선물 받으며 시작해요!`,
      imageUrl: `${RESOURCE_URL}/games/my-kurly-farm/images/kakao-share-v3.jpg`,
      imageWidth: 400,
      imageHeight: 400,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '지금 웰컴선물 받기 >',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
    installTalk: true,
  });
};

const handleLogEvent = (e: MessageEvent) => {
  amplitudeService.logEvent(new AmplitudeEvent(e.data.payload.name, e.data.payload.properties));
};

/**
 * 게임과 통신하게 될 postMessage 인터페이스를 설정합니다.
 * @param accessToken JWT accessToken
 */
export default function useHandlePostMessage(memberId?: string, encryptMemberId?: string) {
  useLoadKakao();

  useEffect(() => {
    const handleParentAction = (e: MessageEvent) => {
      if (isProduction() && !KURLY_PRODUCTION_URL_LIST.includes(e.origin)) {
        return;
      }

      if (e.data.source === 'startGame') {
        handleStartGame(e);
      }

      if (e.data.source === 'setNotification') {
        handleSetNotification(e);
      }

      if (e.data.source === 'addAlarm') {
        handleAddAlarm(e);
      }

      if (e.data.source === 'deleteAlarm') {
        handleDeleteAlarm(e);
      }

      if (e.data.source === 'closeGame') {
        handleCloseGame();
      }

      if (e.data.source === 'kakaoShare' && memberId && encryptMemberId) {
        handleKakaoShare(memberId, encryptMemberId);
      }

      if (e.data.source === 'logEvent' && e.data.payload.platform === 'amplitude') {
        handleLogEvent(e);
      }
    };

    window.addEventListener('message', handleParentAction);

    return () => window.removeEventListener('message', handleParentAction);
  }, [memberId, encryptMemberId]);
}
