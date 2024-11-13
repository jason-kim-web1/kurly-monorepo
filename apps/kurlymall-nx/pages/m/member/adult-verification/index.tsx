import { useEffect } from 'react';

import { GetServerSideProps } from 'next';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import AdultVerificationContainer from '../../../../src/member/adult-verification/AdultVerificationContainer';

import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';

interface Props {
  appToken: string;
}

export default function AdultVerificationPage({ appToken }: Props) {
  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('성인인증');
    }
  }, []);

  return (
    <AuthContainer loginRequired appToken={appToken}>
      <AdultVerificationContainer />
    </AuthContainer>
  );
}

interface Context extends GetServerSideProps {
  req: {
    headers: {
      authorization: string;
    };
  };
}

export async function getServerSideProps(context: Context) {
  const { req } = context;

  const { authorization } = req.headers;

  const props = {
    appToken: authorization?.replace('Bearer ', '') ?? '',
  };

  return {
    props,
  };
}
