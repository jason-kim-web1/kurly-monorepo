import styled from '@emotion/styled';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate } from '@tanstack/react-query';

import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import COLOR from '../../../src/shared/constant/colorset';
import PageContentContainer from '../../../src/partners/loreal/containers/PageContentContainer';
import { getWebViewInjectedAccessToken } from '../../../src/server/webview';
import { getQueryClient } from '../../../src/partners/loreal/utils/getQueryClient';
import { useWebview } from '../../../src/shared/hooks';
import appService from '../../../src/shared/services/app.service';

const Container = styled.div`
  background-color: ${COLOR.bgLightGray};
`;

const PartnersLorealPage = () => {
  const { isReady } = useRouter();
  const isWebview = useWebview();
  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (isWebview) {
      try {
        appService.changeTitle('제휴 멤버십 연동 동의');
        appService.postAppMessage({ code: 'WV1000' });
      } catch (error) {}
    }
  }, [isWebview, isReady]);
  return (
    <Container>
      {isReady && !isWebview ? (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>제휴 멤버십 연동 동의</HeaderTitle>
        </MobileHeader>
      ) : null}
      <PageContentContainer />
    </Container>
  );
};

export default PartnersLorealPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = getWebViewInjectedAccessToken(context);
  // NOTE: Access Token 이 있는 경우 웹뷰를 통한 진입으로 간주한다.
  if (accessToken) {
    return {
      redirect: {
        destination: '/m/webview/partners/loreal',
        permanent: false,
      },
    };
  }
  const queryClient = await getQueryClient();
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
