import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { useAppLinkFallback } from '../../../src/shared/hooks/useAppLinkFallback';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSideProps } from '../../../src/server/webview';
import AppLinkBridge from '../../../src/open/components/AppLinkBridge';
import AppInstallButtons from '../../../src/open/components/AppInstallButtons';
import { useAppLinkBridge } from '../../../src/shared/hooks/useAppLinkBridge';

export default function Open({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { uriScheme, bridgePageOn, bridgePageTitle } = useAppLinkBridge();
  useAppLinkFallback(uriScheme);

  return (
    <>
      <Head>
        <title>컬리로 이동하는 중입니다</title>
      </Head>
      {bridgePageOn && uriScheme ? (
        <AppInstallButtons title={bridgePageTitle} uriScheme={uriScheme} />
      ) : (
        <AuthContainer appToken={accessToken} preventFetchingMemberData>
          <AppLinkBridge />
        </AuthContainer>
      )}
    </>
  );
}
export const getServerSideProps = getWebviewServerSideProps();
