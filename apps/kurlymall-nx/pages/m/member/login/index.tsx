import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import LoginMobileForm from '../../../../src/member/login/m/components/LoginMobileForm';
import { useInitLogin } from '../../../../src/member/login/shared/hooks/useInitLogin';
import AppLink from '../../../../src/member/login/m/components/AppLink';
import { USER_MENU_PATH } from '../../../../src/shared/constant';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { redirectTo } from '../../../../src/shared/reducers/page';

const FormWrapper = styled.div`
  width: 100%;
  padding: 40px 20px;
`;

export default function LoginPage() {
  const dispatch = useDispatch();

  useScreenName(ScreenName.LOGIN);
  useInitLogin();

  const handleCloseButton = () => {
    dispatch(redirectTo({ url: USER_MENU_PATH.home.uri, isExternal: false }));
  };

  return (
    <>
      <MobileNavigationBar title="로그인" leftButtonType="close" onClickLeftButton={handleCloseButton} />
      <FormWrapper>
        <LoginMobileForm />
        <AppLink />
      </FormWrapper>
    </>
  );
}
