import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import useLoadKakao from '../../../../shared/hooks/useLoadKakao';

import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import { USER_MENU_PATH } from '../../../../shared/constant';

import { clearLoginForm } from '../../../../shared/reducers/auth';
import { redirectTo } from '../../../../shared/reducers/page';

export function useInitLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  useLoadKakao();

  const { isGuest, hasSession } = useAppSelector(({ auth }) => auth);

  const {
    externalUrl,
    internalUrl,
    return_url: returnUrl,
  } = router.query as { externalUrl: string; internalUrl: string; return_url: string };

  const url = externalUrl || internalUrl || returnUrl || USER_MENU_PATH.home.uri;

  const replaceTo = useCallback(() => {
    const isExternal = url.startsWith('http') || !!externalUrl;
    dispatch(redirectTo({ url, isExternal, replace: true }));
  }, [dispatch, externalUrl, url]);

  useEffect(() => {
    if (!hasSession) {
      return;
    }

    if (!isGuest) {
      Alert({ text: '이미 로그인 상태 입니다.' }).then(() => {
        replaceTo();
      });
    }
  }, [hasSession, replaceTo]);

  useEffect(() => {
    const handleChangeStart = () => {
      dispatch(clearLoginForm());
    };

    router.events.on('routeChangeStart', handleChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleChangeStart);
    };
  }, [dispatch, router.events]);
}
