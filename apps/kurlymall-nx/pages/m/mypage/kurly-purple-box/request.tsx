import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';

import { KURLY_PURPLE_BOX_PATH, getPageUrl } from '../../../../src/shared/constant';
import CloseButton from '../../../../src/shared/components/Button/CloseButton';

import RequestForm from '../../../../src/mypage/kurly-purple-box/m/components/RequestForm';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { redirectTo } from '../../../../src/shared/reducers/page';

export default function PersonalBoxRequestFormPage() {
  const dispatch = useDispatch();

  const clickCloseButton = useCallback(() => {
    dispatch(
      redirectTo({
        url: getPageUrl(KURLY_PURPLE_BOX_PATH.kurlyPurpleBox),
      }),
    );
  }, [dispatch]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={clickCloseButton} />
        </HeaderButtons>
        <HeaderTitle>개인 보냉 박스 이용 신청</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        <RequestForm />
      </AuthContainer>
      <UserMenu />
    </>
  );
}
