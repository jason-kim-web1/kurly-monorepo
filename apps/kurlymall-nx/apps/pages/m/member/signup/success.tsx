import { useDispatch } from 'react-redux';

import SuccessContainer from '../../../../src/member/signup/m/containers/SuccessContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { USER_MENU_PATH } from '../../../../src/shared/constant';
import { redirectTo } from '../../../../src/shared/reducers/page';

export default function SignupSuccessPage() {
  const dispatch = useDispatch();

  const onClickLeftButton = () => {
    dispatch(
      redirectTo({
        url: USER_MENU_PATH.home.uri,
      }),
    );
  };

  return (
    <>
      <MobileNavigationBar
        title="회원가입 완료"
        leftButtonType="back"
        onClickLeftButton={onClickLeftButton}
        rightButtonTypes={['cart']}
      />

      <AuthContainer loginRequired>
        <SuccessContainer />
      </AuthContainer>

      <UserMenu />
    </>
  );
}
