import { useEffect, useMemo, useState } from 'react';

import { isString } from 'lodash';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../shared/store';
import { USER_MENU_PATH } from '../../../shared/constant';
import { isPC } from '../../../../util/window/getDevice';
import { loadSessionStorage } from '../../../shared/services/session.storage.service';

import { loadMemberBenefits, loadMemberLoading } from '../../../shared/reducers/member';
import { loadMyKurlyBanner, loadMyKurlyInfo } from '../mykurly.slice';
import { Grade } from '../../../shared/enums';

export function useLoadMykurlyInfo() {
  const { isReady } = useRouter();

  const dispatch = useDispatch();

  const { hasSession, isSubscribed, vipInfoName, userGrade } = useAppSelector(({ auth, member }) => ({
    hasSession: auth.hasSession,
    isSubscribed: member.subscription.isSubscribed,
    vipInfoName: member.info?.vipInfo?.name ?? '',
    userGrade: member.info?.grade ?? Grade.Normal,
  }));

  const { isMyKurlyLoaded } = useAppSelector(({ myKurly }) => ({
    isMyKurlyLoaded: myKurly.isMyKurlyLoaded,
  }));

  const [isTooltipHidden, setIsTooltipHidden] = useState(false);
  const [isMykurlyDatafetched, setMykurlyDatafetched] = useState(false);

  const memberLoading = useAppSelector(loadMemberLoading);

  /**
   * PC 마이컬리 API 호출 조건
   *
   * 1. 마이컬리 페이지 최초 진입 시 -> isMyKurlyLoaded 상태 값이 false일 때
   * 2. 이전 경로가 메인 및 상품 상세 등 마이컬리 하위 path가 아닐 경우 -> 마이컬리 페이지 최초 진입 후 마이컬리 페이지들 이동시에는 호출되지 않아야 함
   * 4. API가 다중으로 호출되지 않아야 함
   */
  const isFetchMypageApiCheck = useMemo(() => {
    if (!isReady || !hasSession || memberLoading) {
      return false;
    }

    const prevPath = loadSessionStorage('prevPath');
    return (
      (isPC && ((isString(prevPath) && !prevPath.includes(USER_MENU_PATH.mykurly.uri)) || !isMyKurlyLoaded)) || !isPC
    );
  }, [isReady, hasSession, memberLoading, isMyKurlyLoaded]);

  /**
   * loadMemberBenefits를 호출하는 훅에 memberLoading이 디펜던시로 존재할 때, memberLoading상태가 계속 변동되어 무한 루프에 걸림
   *
   * 해결 방안
   * 1. isFetchMypageApiCheck 변수가 true를 반환할 때 isMykurlyDatafetched의 값을 true로 저장 후
   * 2. isMykurlyDatafetched 변수를 통해 dispatch 처리
   */
  useEffect(() => {
    if (isFetchMypageApiCheck) {
      setMykurlyDatafetched(true);
    }
  }, [isFetchMypageApiCheck]);

  // TODO 추후 로직 개선 필요..
  useEffect(() => {
    if (isMykurlyDatafetched) {
      dispatch(loadMyKurlyBanner({ isSubscribed, vipInfoName, userGrade }));
    }
  }, [dispatch, isMykurlyDatafetched, isSubscribed, vipInfoName, userGrade]);

  useEffect(() => {
    if (isMykurlyDatafetched) {
      dispatch(loadMemberBenefits());
      dispatch(loadMyKurlyInfo());

      setIsTooltipHidden(true);
    }
  }, [dispatch, isMykurlyDatafetched]);

  return {
    isTooltipHidden,
  };
}
