import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { isPC, isWebview } from '../../../../util/window/getDevice';
import { redirectTo } from '../../../shared/reducers/page';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { MEMBER_BENEFIT_PATH, MYPAGE_PATH, USER_MENU_PATH } from '../../../shared/constant';
import Confirm from '../../../shared/components/Alert/Confirm';

export default function useLoversClose(loading?: boolean) {
  const dispatch = useDispatch();

  const handleClickCancelButton = useCallback(() => {
    if (isWebview()) {
      dispatch(
        redirectTo({
          url: deepLinkUrl.MYKURLY,
        }),
      );
      return;
    }

    dispatch(
      redirectTo({
        url: isPC ? MYPAGE_PATH.orderList.uri : USER_MENU_PATH.mykurly.uri,
      }),
    );
  }, [dispatch]);

  const handleClickCheckButton = useCallback(() => {
    dispatch(
      redirectTo({
        url: MEMBER_BENEFIT_PATH.vip.uri,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      Confirm({
        text: '7월부터 러버스 등급 제도가 새롭게 개편될 예정입니다.\n신규 회원제도를 확인하시겠습니까?',
        leftButtonText: '취소',
        rightButtonText: '확인하러 가기',
        showRightButton: true,
        onClickLeftButton: handleClickCancelButton,
        onClickRightButton: handleClickCheckButton,
        allowOutsideClick: false,
      });
    }
  }, [loading, handleClickCancelButton, handleClickCheckButton]);

  return {
    handleClickCancelButton,
    handleClickCheckButton,
  };
}
