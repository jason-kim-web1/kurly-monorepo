import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Alarm, KurlyWebSdkError } from '@thefarmersfront/kurly-web-sdk';

import { encodeQueryString } from '../../../../shared/utils/querystring-encoder';
import useHandlePostMessage from '../hooks/useHandlePostMessage';
import { handleKurlyWebSdkError } from '../../../utils/handleKurlyWebSdkError';
import { isWebview } from '../../../../../util/window/getDevice';
import { isProduction } from '../../../../shared/configs/config';
import Bridge from '../components/Bridge';
import MyKurlyFarmPageMetaData from '../../shared/components/MyKurlyFarmPageMetaData';
import appService from '../../../../shared/services/app.service';

const host = isProduction() ? 'https://game.kurly.com' : 'https://game.stg.kurly.com';
const src = `${host}/games/terraceKurly/splash`;

const GameWrapper = styled.iframe`
  position: fixed;
  width: 100%;
  height: 100vh;
  border: 0;
  top: 0;
  left: 0;
`;

interface Props {
  memberId?: string;
  encryptMemberId?: string;
  encryptMemberNo?: string;
  encryptRecomId?: string;
  encryptKurlylogUserId?: string;
  kurlylogNickname?: string;
  kurlylogImageUrl?: string;
  subscriptionStatus?: string;
  isGuest?: boolean;
  refreshToken?: boolean;
}

export default function MyKurlyFarmContainer({
  memberId,
  encryptMemberId,
  encryptMemberNo,
  encryptRecomId,
  encryptKurlylogUserId,
  kurlylogNickname,
  kurlylogImageUrl,
  subscriptionStatus,
  isGuest,
  refreshToken,
}: Props) {
  useHandlePostMessage(memberId, encryptMemberId);
  const [queryString, setQueryString] = useState('');
  const setDefaultQueryString = useCallback(() => {
    setQueryString(
      encodeQueryString({
        timeStamp: new Date().getTime(),
        ...(encryptRecomId && { recomId: encryptRecomId }),
      }),
    );
  }, [encryptRecomId]);

  // 게임 src에 보낼 queryString을 설정합니다.
  useEffect(() => {
    if (!isGuest && refreshToken && isWebview()) {
      appService.postAppMessage({ code: 'WV1000' });
    }

    if (!encryptMemberId || !encryptMemberNo) {
      setDefaultQueryString();
      return;
    }

    const checkDeviceAlarmPermission = async () => {
      try {
        const appNoti = await Alarm.checkDeviceAlarmPermission();

        setQueryString(
          encodeQueryString({
            memberId: encryptMemberId,
            memberNo: encryptMemberNo,
            appNoti: appNoti.toString(),
            timeStamp: new Date().getTime(),
            ...(encryptRecomId && { recomId: encryptRecomId }),
            ...(encryptKurlylogUserId && { kurlylogUserId: encryptKurlylogUserId }),
            ...(kurlylogNickname && { kurlylogNickname }),
            ...(kurlylogImageUrl && { kurlylogImageUrl }),
            ...(subscriptionStatus && { subscriptionStatus }),
          }),
        );
      } catch (alarmError) {
        if (alarmError instanceof KurlyWebSdkError) {
          handleKurlyWebSdkError(alarmError);
        }

        setDefaultQueryString();
      }
    };

    checkDeviceAlarmPermission();
  }, [
    encryptMemberId,
    encryptMemberNo,
    encryptRecomId,
    isGuest,
    kurlylogImageUrl,
    kurlylogNickname,
    encryptKurlylogUserId,
    setDefaultQueryString,
    subscriptionStatus,
    refreshToken,
  ]);

  return (
    <>
      <MyKurlyFarmPageMetaData />
      {queryString &&
        (isWebview() ? <GameWrapper src={`${src}${queryString}`} /> : <Bridge queryString={queryString} />)}
    </>
  );
}
