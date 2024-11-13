import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import MobileFooter from '../../../../../src/shared/components/layouts/MobileFooter';
import Button from '../../../../../src/shared/components/Button/Button';

import { useWebview, useScreenName } from '../../../../../src/shared/hooks';

import { ErrorIconImg } from '../../../../../src/shared/images';

import { ScreenName } from '../../../../../src/shared/amplitude';
import { redirectTo } from '../../../../../src/shared/reducers/page';

const Content = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
`;

const styles = {
  message: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#666666',
    ':before': {
      content: '""',
      display: 'block',
      width: '54px',
      height: '54px',
      margin: '0 auto 20px',
      background: `url(${ErrorIconImg}) no-repeat 50% 50%`,
    },
  },
  notice: {
    paddingTop: '14px',
    fontSize: '14px',
    color: '#b5b5b5',
    lineHeight: '19px',
  },
};

export default function PasswordFailPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const webview = useWebview();
  const dispatch = useDispatch();

  const handleClickClose = () => {
    window.location.assign('/');
  };

  const handleClick = () => {
    dispatch(
      redirectTo({
        url: '/m/member/find/password',
      }),
    );
  };

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={handleClickClose} />
          </HeaderButtons>
          <HeaderTitle>비밀번호 찾기 실패</HeaderTitle>
        </MobileHeader>
      )}

      <Content>
        <p css={styles.message}>유효하지 않은 URL</p>
        <p css={styles.notice}>
          유효하지 않은 URL입니다.
          <br />
          메일함을 확인하시거나 비밀번호 찾기를 다시 시도해 주세요.
        </p>
      </Content>

      <MobileFooter>
        <Button text="다시 비밀번호 찾기" onClick={handleClick} />
      </MobileFooter>
    </>
  );
}
