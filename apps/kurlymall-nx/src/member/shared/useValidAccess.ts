import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { useAppSelector } from '../../shared/store';
import { loadMemberLoading } from '../../shared/reducers/member';
import useVIPLevel from './useVIPLevel';
import { VipLevelArray, VipLevelType } from './constants';
import Alert from '../../shared/components/Alert/Alert';
import { redirectTo } from '../../shared/reducers/page';
import { USER_MENU_PATH } from '../../shared/constant';

function useValidAccess({ conditionProperty }: { conditionProperty: 'members' | 'vip' }) {
  const dispatch = useDispatch();

  const { hasSession, isGuest, vipInfoName, isSubscribed } = useAppSelector(({ member, auth }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
    vipInfoName: member.info?.vipInfo?.name,
    isSubscribed: member.subscription?.isSubscribed,
  }));

  const { isReady } = useRouter();

  const { vipLevel } = useVIPLevel();

  const memberLoading = useAppSelector(loadMemberLoading);

  const isReadyToCheck = useMemo(() => {
    if (!isReady || !hasSession || isGuest || memberLoading) {
      return false;
    }

    return true;
  }, [isReady, hasSession, isGuest, memberLoading]);

  useEffect(() => {
    if (!isReadyToCheck) {
      return;
    }

    let invalidAccess = false;
    let invalidMessage = '해당 페이지를 확인할 수 없습니다.';
    if (conditionProperty === 'members') {
      invalidAccess = !isSubscribed;
    } else if (conditionProperty === 'vip') {
      const invalidUrl = vipLevel && !VipLevelArray.includes(vipLevel);
      const invalidUser = !vipInfoName || (!!vipInfoName && vipLevel !== (vipInfoName.toLowerCase() as VipLevelType));

      invalidAccess = invalidUrl || invalidUser;

      if (invalidUser) {
        invalidMessage = '전용관 대상 회원만 접근할 수 있는 페이지입니다.';
      }
    }

    if (invalidAccess) {
      Alert({
        text: invalidMessage,
      }).then(() => {
        dispatch(redirectTo({ url: USER_MENU_PATH.home.uri, replace: true }));
      });
    }
  }, [isReadyToCheck, conditionProperty, vipLevel, vipInfoName, isSubscribed, dispatch]);
}

export default useValidAccess;
