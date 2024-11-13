import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import KurlyPurpleBoxContainer from '../../../../src/mypage/kurly-purple-box/m/containers/KurlyPurpleBoxContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { USER_MENU_PATH, getPageUrl } from '../../../../src/shared/constant';
import { redirectTo } from '../../../../src/shared/reducers/page';

export default function KurlyPurpleBoxPage() {
  const dispatch = useDispatch();

  const clickBackButton = useCallback(() => {
    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.mykurly),
      }),
    );
  }, [dispatch]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton onClick={clickBackButton} />
        </HeaderButtons>
        <HeaderTitle>컬리 퍼플 박스</HeaderTitle>
        <HeaderButtons position="right">
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>
      <AuthContainer>
        <KurlyPurpleBoxContainer />
      </AuthContainer>
      <UserMenu />
    </>
  );
}
