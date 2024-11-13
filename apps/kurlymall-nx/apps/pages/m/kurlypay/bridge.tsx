import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppLinkFallback } from '../../../src/shared/hooks/useAppLinkFallback';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSideProps } from '../../../src/server/webview';
import KurlypayBridge from '../../../src/kurlypay/components/KurlypayBridge';

export default function Bridge({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [uriScheme, setUriScheme] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      // TODO - kurlypay 딥링크 지원 앱 일정비율 배포 완료시 기본값 변경 필요
      const command = router.query.command === 'kurlypay' ? 'kurlypay' : 'open';
      setUriScheme(`kurly://${command}?url=${encodeURIComponent(location.href)}`);
    }
  }, [router.isReady, router.query.command]);

  useAppLinkFallback(uriScheme);

  return (
    <>
      <Head>
        <title>컬리페이로 이동중입니다</title>
      </Head>
      <AuthContainer appToken={accessToken} preventFetchingMemberData>
        <KurlypayBridge />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
