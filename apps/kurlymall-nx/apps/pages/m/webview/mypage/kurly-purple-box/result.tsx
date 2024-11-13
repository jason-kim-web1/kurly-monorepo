import { useEffect } from 'react';

import { InferGetStaticPropsType } from 'next';

import ResultForm from '../../../../../src/mypage/kurly-purple-box/m/components/ResultForm';

import { useCompleteRequest } from '../../../../../src/mypage/kurly-purple-box/shared/hooks/usePersonalBoxQuery';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import appService from '../../../../../src/shared/services/app.service';
import { getWebviewServerSideProps } from '../../../../../src/server/webview';

export default function PersonalBoxRequestFormPage(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { accessToken } = props;
  const { data: completeRequest } = useCompleteRequest();

  useEffect(() => {
    appService.changeTitle(completeRequest ? '신청완료' : '개인 보냉 박스');
  }, [completeRequest]);
  return (
    <AuthContainer loginRequired appToken={accessToken}>
      <ResultForm />
    </AuthContainer>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
