import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import Footer from '../../../../src/footer/components/Footer';
import Header from '../../../../src/header/components/Header';

import { AppState } from '../../../../src/shared/store';

import { MailSendIcon } from '../../../../src/shared/images';
import COLOR from '../../../../src/shared/constant/colorset';

import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import { redirectTo } from '../../../../src/shared/reducers/page';
import { COMMON_PATH, getPageUrl } from '../../../../src/shared/constant';

const Content = styled.div`
  min-width: 1050px;
  padding: 50px 0;
  background-color: white;
`;

const ContentArea = styled.div`
  max-width: 400px;
  padding: 60px 30px;
  margin: auto;
  position: relative;
  background-color: white;
`;

const SuccessContent = styled.div`
  text-align: center;
`;

const styles = {
  message: {
    fontWeight: 500,
    fontSize: '17px',
    lineHeight: '24px',
    ':before': {
      content: '""',
      display: 'block',
      width: '54px',
      height: '54px',
      margin: '0 auto 20px',
      background: `url(${MailSendIcon}) no-repeat 50% 50%`,
    },
  },
  mail: {
    fontWeight: 700,
    color: `${COLOR.kurlyPurple}`,
    wordBreak: 'break-all' as const,
  },
  notice: {
    paddingTop: '14px',
    fontSize: '14px',
    color: `${COLOR.kurlyGray450}`,
    lineHeight: '19px',
  },
};

export default function EmailSendSuccessPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const router = useRouter();
  const dispatch = useDispatch();

  const { passwordByEmail } = useSelector((state: AppState) => state.find);

  useEffect(() => {
    if (router.isReady && !passwordByEmail.email) {
      dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.login) }));
    }
  }, [router.isReady, passwordByEmail.email, dispatch]);

  return (
    <>
      <Header />
      <Content>
        <ContentArea>
          <SuccessContent>
            <p css={styles.message}>
              <span css={styles.mail}>{passwordByEmail.email}</span>
              으로
              <br />
              비밀번호 재설정 메일이 발송되었어요.
            </p>
            <p css={styles.notice}>
              5분 후에도 메일이 오지 않는다면
              <br />
              스팸함을 확인해 주세요.
            </p>
          </SuccessContent>
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
