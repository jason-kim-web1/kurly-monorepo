import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { dehydrate } from '@tanstack/react-query';

import { useEffect } from 'react';

import PageContentContainer from '../../../../src/partners/loreal/containers/PageContentContainer';

import { getWebViewInjectedAccessToken } from '../../../../src/server/webview';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { getQueryClient } from '../../../../src/partners/loreal/utils/getQueryClient';
import appService from '../../../../src/shared/services/app.service';
import { isWebview } from '../../../../util/window/getDevice';

const PartnersLorealPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { accessToken } = props;

  useEffect(() => {
    appService.changeTitle('제휴 멤버십 연동 동의');
  }, []);

  useEffect(() => {
    if (!isWebview()) {
      return;
    }
    if (!accessToken) {
      appService.postAppMessage({ code: 'WV1000' });
    }
  }, [accessToken]);

  return (
    <AuthContainer appToken={accessToken}>
      <PageContentContainer />
    </AuthContainer>
  );
};

export default PartnersLorealPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = getWebViewInjectedAccessToken(context);
  const queryClient = await getQueryClient();
  return {
    props: {
      accessToken,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
