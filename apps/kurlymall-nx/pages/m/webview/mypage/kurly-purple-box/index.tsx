import type { InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';

import KurlyPurpleBoxContainer from '../../../../../src/mypage/kurly-purple-box/m/containers/KurlyPurpleBoxContainer';

import { getWebviewServerSideProps } from '../../../../../src/server/webview';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import appService from '../../../../../src/shared/services/app.service';

export default function KurlyPurpleBoxPage(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { accessToken } = props;
  useEffect(() => {
    appService.changeTitle('컬리 퍼플 박스');
  }, []);
  return (
    <AuthContainer appToken={accessToken}>
      <KurlyPurpleBoxContainer />
    </AuthContainer>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
