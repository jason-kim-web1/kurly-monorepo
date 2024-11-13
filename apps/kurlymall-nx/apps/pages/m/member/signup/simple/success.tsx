import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useScreenName } from '../../../../../src/shared/hooks';
import { ScreenName } from '../../../../../src/shared/amplitude';
import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../../src/shared/containers/m/CartButtonContainer';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import SimpleSignupSuccessContainer from '../../../../../src/member/signup/simple/containers/SimpleSignupSuccessContainer';
import { USER_MENU_PATH, getPageUrl } from '../../../../../src/shared/constant';
import { redirectTo } from '../../../../../src/shared/reducers/page';
import useSuccessSignup from '../../../../../src/member/signup/hook/useSuccessSignup';

export default function SimpleSignupSuccessPage() {
  useScreenName(ScreenName.SIGN_UP);
  useSuccessSignup();

  const dispatch = useDispatch();
  const handleClickBack = useCallback(() => {
    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.home),
      }),
    );
  }, [dispatch]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton onClick={handleClickBack} />
        </HeaderButtons>
        <HeaderTitle>회원가입 완료</HeaderTitle>
        <HeaderButtons position="right">
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>

      <AuthContainer loginRequired>
        <SimpleSignupSuccessContainer />
      </AuthContainer>
    </>
  );
}
