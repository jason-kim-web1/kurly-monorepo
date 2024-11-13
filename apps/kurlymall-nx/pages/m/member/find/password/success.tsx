import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';

import { useWebview, useScreenName } from '../../../../../src/shared/hooks';

import { AppState } from '../../../../../src/shared/store';

import { MailSendIcon } from '../../../../../src/shared/images';
import COLOR from '../../../../../src/shared/constant/colorset';

import { ScreenName } from '../../../../../src/shared/amplitude';
import { COMMON_PATH, getPageUrl } from '../../../../../src/shared/constant';
import { redirectTo } from '../../../../../src/shared/reducers/page';

const SuccessContent = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
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

  const dispatch = useDispatch();
  const webview = useWebview();
  const router = useRouter();
  const { passwordByEmail } = useSelector((state: AppState) => state.find);

  const handleClickClose = () => {
    dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.login) }));
  };

  useEffect(() => {
    if (router.isReady && !passwordByEmail.email) {
      window.location.assign('/');
    }
  }, [router.isReady, passwordByEmail.email]);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={handleClickClose} />
          </HeaderButtons>
          <HeaderTitle>비밀번호 찾기</HeaderTitle>
        </MobileHeader>
      )}

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
    </>
  );
}
