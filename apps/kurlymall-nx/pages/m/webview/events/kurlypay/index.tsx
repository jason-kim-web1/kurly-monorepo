import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { useEffect } from 'react';

import { getWebViewInjectedAccessToken } from '../../../../../src/server/webview';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import appService from '../../../../../src/shared/services/app.service';
import KurlypayContainer from '../../../../../src/events/kurlypay/m/containers';

export default function PartnersLorealPage({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    appService.changeTitle('컬리페이 소개페이지');
  }, []);

  return (
    <AuthContainer appToken={accessToken}>
      <KurlypayContainer />
    </AuthContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = getWebViewInjectedAccessToken(context);
  return {
    props: {
      accessToken,
    },
  };
};
