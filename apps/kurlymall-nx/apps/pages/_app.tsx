import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { eq, isUndefined } from 'lodash';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import type { AppProps } from 'next/app';

import { isShownAlert, closeAlert as closeKPDSAlert } from '@thefarmersfront/kpds-react';

import Loading from '../src/shared/components/Loading/Loading';

import store, { AppState, useAppSelector } from '../src/shared/store';
import { loadSession } from '../src/shared/reducers/auth';

import { usePage } from '../src/shared/hooks';

import { closeAlert, isShown } from '../src/shared/components/Alert/Alert';
import GoogleAnalyticsScripts from '../src/shared/components/GoogleAnalyticsScripts';
import GlobalPageMetaData from '../src/shared/components/PageMeta/GlobalPageMetaData';

import '../styles/globals.css';
import '../styles/kurly_date_picker.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import '@thefarmersfront/kpds-css/dist/style.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'core-js/stable';
import 'intersection-observer';

/**
 * react swiper import eslint 이슈
 * https://github.com/import-js/eslint-plugin-import/issues/2266
 */
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/scrollbar';

import { isPC, isWebview } from '../util/window/getDevice';

import registerMockServiceWorker from '../src/shared/mocks';
import { useMember } from '../src/shared/hooks/useMember';
import { selectAppTemplate } from '../src/shared/utils/select-app-template';

import { NEXT_PUBLIC_MOCK_ENABLED } from '../src/shared/configs/config';
import { amplitudeService } from '../src/shared/amplitude';
import { useNotification } from '../src/shared/hooks/useNotification';
import { ThemeColorMeta } from '../src/shared/components/ThemeColorMeta/ThemeColorMeta';

import { PreviousRoutePathProvider } from '../src/shared/context/PreviousRoutePathContext';
import ClarityScript from '../src/shared/components/Clarity';
import useSentry from '../src/shared/hooks/useSentry';
import KPDSThemeProvider from '../src/shared/components/KPDSThemeProvider';
import { MoWebConfigContextProvider } from '../src/shared/context/MoWebConfigContext';
import { GlobalErrorBoundary } from '../src/shared/components/ErrorBoundary';
import CustomGrowthBookProvider from '../src/shared/growthbook/CustomGrowthBookProvider';
import { ignoreError } from '../src/shared/utils/general';
import Pixel from '../src/shared/pixel/PixelService';

if (NEXT_PUBLIC_MOCK_ENABLED) {
  registerMockServiceWorker();
}

const GlobalStyles = dynamic(() => import('../src/shared/components/Head/GlobalStyles'), { ssr: false });
const BranchContainer = dynamic(() => import('../src/shared/containers/BranchContainer'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading } = useAppSelector(({ page }) => ({ isLoading: page.isLoading }));
  const { uid, isGuest, hasSession } = useAppSelector(({ auth }) => ({
    uid: auth.uid,
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
  }));
  const info = useAppSelector(({ member }) => member.info);
  const currentAddress = useAppSelector(({ shippingAddress }) => shippingAddress.currentAddress);

  useMember();
  usePage();
  useNotification();
  useSentry();

  const handleChangeRoute = () => {
    // Facebook Pixel Event
    ignoreError(() => Pixel.setPageView());

    // Alert
    if (isShown() || isShownAlert()) {
      closeAlert();
      closeKPDSAlert();
    }
  };

  useEffect(() => {
    ignoreError(() => Pixel.setPageView());

    router.events.on('routeChangeStart', handleChangeRoute);

    return () => {
      router.events.on('routeChangeStart', handleChangeRoute);
    };
  }, [router.events]);

  useEffect(() => {
    if (hasSession) {
      amplitudeService.setUserProperties({ is_guest: isGuest });
      if (isGuest) {
        amplitudeService.setUserId(undefined);
      } else if (uid) {
        amplitudeService.setUserId(uid);
      }
    }

    if (info?.memberNo && info?.gradeName) {
      amplitudeService.setUserProperties({ cust_no: info?.memberNo, membership_level: info?.gradeName });
    }

    if (currentAddress?.address && currentAddress?.clusterCenterCode) {
      amplitudeService.setUserProperties({ center_code: currentAddress.clusterCenterCode });
    }
  }, [
    currentAddress?.address,
    currentAddress?.clusterCenterCode,
    hasSession,
    info?.memberNo,
    isGuest,
    info?.gradeName,
    uid,
  ]);

  useEffect(() => {
    if (!isWebview()) {
      dispatch(loadSession());
    }
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      {uid && <GoogleAnalyticsScripts uid={uid} />}
      <ClarityScript />
      <BranchContainer />
      <ThemeColorMeta />

      <GlobalErrorBoundary>
        <KPDSThemeProvider>
          <Component {...pageProps} />
        </KPDSThemeProvider>
      </GlobalErrorBoundary>
    </>
  );
}

function UsePageOnlyApp({ Component, pageProps }: AppProps) {
  const { isLoading } = useSelector(({ page }: AppState) => page);

  usePage();

  return (
    <>
      {isLoading && <Loading />}
      <Component {...pageProps} />
    </>
  );
}

export default function App(props: AppProps) {
  if (typeof window === 'object') {
    const ieCheckAgent = window.navigator.userAgent.toLowerCase();
    if (
      (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) ||
      ieCheckAgent.indexOf('msie') !== -1
    ) {
      // ie11 이하 페이지 이동
      window.location.href = '/shop/event/browserUpdate.php';
    }
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry(failureCount, error) {
              if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;

                if (isUndefined(response)) {
                  return false;
                }

                if (response.status === 400 || response.status === 404) {
                  return false;
                }
              }

              return failureCount < 2;
            },
          },
        },
      }),
  );
  const { pathname } = useRouter();
  const selectTemplate = useCallback(() => {
    const appTemplate = selectAppTemplate(pathname);

    if (eq(appTemplate, 'app_props_component_only')) {
      return <props.Component {...props.pageProps} />;
    }

    if (eq(appTemplate, 'use_page_only')) {
      return <UsePageOnlyApp {...props} />;
    }

    if (!isPC && !isWebview()) {
      return (
        <MoWebConfigContextProvider>
          <MyApp {...props} />
        </MoWebConfigContextProvider>
      );
    }

    return <MyApp {...props} />;
  }, [pathname, props]);

  useEffect(() => {
    if (
      NEXT_PUBLIC_MOCK_ENABLED ||
      selectAppTemplate(pathname) === 'app_props_component_only' ||
      selectAppTemplate(pathname) === 'use_page_only'
    ) {
      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('Service Worker registration successful with scope: ', registration.scope))
        .catch((err) => console.log('Service Worker registration failed: ', err));
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', registerServiceWorker);
    }

    return () => window.removeEventListener('load', registerServiceWorker);
  }, [pathname]);

  return (
    <>
      <GlobalPageMetaData />
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={props.pageProps.dehydratedState}>
          <Provider store={store}>
            <PreviousRoutePathProvider>
              <CustomGrowthBookProvider>{selectTemplate()}</CustomGrowthBookProvider>
            </PreviousRoutePathProvider>
          </Provider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
