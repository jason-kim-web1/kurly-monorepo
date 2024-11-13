import { useEffect } from 'react';

import { InferGetStaticPropsType } from 'next';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import appService from '../../../../../src/shared/services/app.service';
import { getWebviewServerSideProps } from '../../../../../src/server/webview';
import WebviewGuidelineDetail from '../../../../../src/mypage/kurly-purple-box/m/components/WebviewGuidelineDetail';

export default function PersonalBoxRequestFormPage(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { accessToken } = props;
  useEffect(() => {
    appService.changeTitle('개인 보냉 박스 이용 안내');
  }, []);
  return (
    <AuthContainer loginRequired appToken={accessToken}>
      <WebviewGuidelineDetail />
    </AuthContainer>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
