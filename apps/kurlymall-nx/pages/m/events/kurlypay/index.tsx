import { GetServerSideProps } from 'next';

import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import { getWebViewInjectedAccessToken } from '../../../../src/server/webview';
import KurlypayContainer from '../../../../src/events/kurlypay/m/containers';

export default function KurlyPayEventPage() {
  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>컬리페이 소개페이지</HeaderTitle>
        <HeaderButtons position="right">
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>
      <KurlypayContainer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = getWebViewInjectedAccessToken(context);
  // NOTE: Access Token 이 있는 경우 웹뷰를 통한 진입으로 간주한다.
  if (accessToken) {
    return {
      redirect: {
        destination: '/m/webview/events/kurlypay',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
