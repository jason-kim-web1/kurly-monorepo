import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { isWebviewByUA } from '../../util/window/getDevice';
import appService from '../../src/shared/services/app.service';

const appLink = 'kurly://games/my-kurly-farm';
const webLink = '/games/my-kurly-farm';
const SearchRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      window.document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          setTimeout(() => {
            appService.closeWebview();
          }, 200);
        }
      });

      router.replace(appLink);
    }
  }, [router]);

  return null;
};

export default SearchRedirectPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgent = ctx.req.headers['user-agent'] ?? '';
  const isApp = isWebviewByUA(userAgent);

  if (isApp) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: webLink,
      permanent: false,
    },
  };
};
