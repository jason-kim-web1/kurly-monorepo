import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { useAppSelector } from '../store';
import { clear, redirectTo } from '../reducers/page';

import Alert from '../components/Alert/Alert';

import { getReplaceUrl, isPC, isWebview } from '../../../util/window/getDevice';

import appService from '../services/app.service';
import storePrevAndCurrentPath from './pathHandler';
import { COMMON_PATH, getPageUrl, PARTNERS_PATH, USER_MENU_PATH } from '../constant';
import deepLinkUrl from '../constant/deepLink';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function usePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    message,
    goBack,
    goError,
    isUnauthenticated,
    documentId,
    scrollId,
    reloading,
    redirection,
    title,
    styles,
    redirectUrl,
    closeWebview,
    finishAndRefresh,
    confirmButtonText,
    dismissedRedirect,
  } = useAppSelector(({ page }) => page);

  const checkValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // NOTE: [MBB] 로그인 성공 이후 새로고침 방지
  const handleInternalRoute = useCallback(
    (url: string) => {
      const { pathname } = new URL(url);
      if (pathname !== PARTNERS_PATH.loreal.uri) {
        window.location.assign(url);
        return;
      }
      router.replace(pathname);
    },
    [router],
  );

  const scrollAction = useCallback((id: string) => {
    if (!id) {
      return;
    }

    const $header = document.getElementById('header');
    const headerHeight = isPC ? $header?.clientHeight ?? 0 : 0;
    const $el = document.getElementById(id);
    const top = $el ? $el.getBoundingClientRect().top + window.pageYOffset : 0;

    // 스크롤 컨테이너 안에 있는 경우를 구분
    if (window.pageYOffset === 0 && $el) {
      $el.scrollIntoView();
    } else {
      window.scrollTo(0, top - headerHeight);
    }
  }, []);

  const reactAfterAlert = useCallback(
    (isDismissed: boolean) => {
      if (goBack) {
        router.back();
        return;
      }

      if (goError) {
        const url = isPC ? '/shop/main/error.php' : '/m2/error.php';
        router.push(url);
        return;
      }

      if (isUnauthenticated) {
        if (isWebview()) {
          window.location.href = deepLinkUrl.LOGIN;

          return;
        }

        dispatch(
          redirectTo({
            url: getPageUrl(COMMON_PATH.login),
            query: {
              internalUrl: router.asPath,
            },
          }),
        );
        return;
      }

      if (reloading) {
        router.reload();
        return;
      }

      if (redirectUrl) {
        if (!dismissedRedirect && isDismissed) {
          return;
        }

        const replaceUrl = getReplaceUrl(redirectUrl);

        window.location.replace(replaceUrl);
      }

      if (closeWebview || finishAndRefresh) {
        if (!isWebview()) {
          return;
        }

        if (closeWebview) {
          appService.closeWebview();
          return;
        }

        if (finishAndRefresh) {
          appService.finishAndRefresh();
          return;
        }
      }
    },
    [
      closeWebview,
      dismissedRedirect,
      dispatch,
      finishAndRefresh,
      goBack,
      goError,
      isUnauthenticated,
      redirectUrl,
      reloading,
      router,
    ],
  );

  useEffect(() => {
    if (!message) {
      return;
    }

    dispatch(clear());

    if (documentId || scrollId) {
      Alert({
        title,
        text: message,
        styles,
      }).then(() => {
        if (documentId) {
          window.document.getElementById(documentId)?.focus();
        }
        if (scrollId) {
          scrollAction(scrollId);
        }
      });
      return;
    }

    Alert({
      title,
      text: message,
      confirmButtonText,
      styles,
    }).then(({ isDismissed }) => {
      reactAfterAlert(isDismissed);
    });
  }, [title, message, dispatch, reactAfterAlert, confirmButtonText, styles, documentId, scrollId, scrollAction]);

  useEffect(() => {
    if (!redirection) {
      return;
    }

    dispatch(clear());

    const { url, isExternal, query, replace } = redirection;

    if (url) {
      const replaceUrl = getReplaceUrl(url);
      if (isExternal || url.startsWith('http')) {
        if (checkValidURL(url)) {
          handleInternalRoute(url);
          return;
        }
        window.location.assign(url);
        return;
      }

      if (isWebview() && replaceUrl === USER_MENU_PATH.home.uri) {
        window.location.href = deepLinkUrl.HOME;

        return;
      }

      const moveUrl = query
        ? {
            pathname: url,
            query,
          }
        : url;

      const moveReplaceUrl = query
        ? {
            pathname: replaceUrl,
            query,
          }
        : replaceUrl;

      router[replace ? 'replace' : 'push'](moveUrl, isPC ? undefined : moveReplaceUrl);
    }
  }, [redirection, dispatch, router, handleInternalRoute]);

  useIsomorphicLayoutEffect(() => {
    storePrevAndCurrentPath();
  }, [router.asPath]);
}
