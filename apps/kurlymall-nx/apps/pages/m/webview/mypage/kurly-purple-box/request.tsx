import { useEffect } from 'react';

import { InferGetStaticPropsType } from 'next';

import RequestForm from '../../../../../src/mypage/kurly-purple-box/m/components/RequestForm';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import appService from '../../../../../src/shared/services/app.service';
import { getWebviewServerSideProps } from '../../../../../src/server/webview';

export default function PersonalBoxRequestFormPage(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { accessToken } = props;
  useEffect(() => {
    appService.changeTitle('개인 보냉 박스 이용 신청');
  }, []);
  return (
    <AuthContainer loginRequired appToken={accessToken}>
      <RequestForm />
    </AuthContainer>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
