import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import COLOR from '../../../src/shared/constant/colorset';
import Alert from '../../../src/shared/components/Alert/Alert';

const PageError = styled.div`
  width: 1050px;
  margin: 0 auto;
  padding: 220px 0 200px;
  color: ${COLOR.kurlyGray800};
  text-align: center;
`;

export default function ShowCasePage() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      void Alert({
        text: '쇼케이스 페이지는 앱과 모바일웹에서만\n확인 하실 수 있습니다.',
        handleClickConfirmButton() {
          router.push('/main');
        },
      });
    }
  }, [router]);

  return (
    <MainSiteProvider>
      <Header />
      <PageError />
      <Footer />
    </MainSiteProvider>
  );
}
