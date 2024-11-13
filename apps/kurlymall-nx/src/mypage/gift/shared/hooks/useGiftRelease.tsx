import { isAfter } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { isProduction } from '../../../../shared/configs/config';
import { USER_MENU_PATH } from '../../../../shared/constant';
import { notifyAndRedirectTo } from '../../../../shared/reducers/page';

interface Response {
  isReleased: boolean;
}

export function useGiftRelease(): Response {
  const dispatch = useDispatch();

  const isPageOpen = isProduction() && isAfter(new Date(), new Date('2022-08-25T12:00:00+09:00'));
  const isReleased = isProduction() ? isPageOpen : true;

  useEffect(() => {
    if (!isReleased) {
      dispatch(
        notifyAndRedirectTo({
          message: '서비스 개선을 위해 선물 내역 조회 기능이 일시 중단됩니다. 고객센터로 문의해 주세요.',
          redirectUrl: USER_MENU_PATH.home.uri,
        }),
      );
    }
  }, [dispatch, isReleased]);

  return {
    isReleased,
  };
}
