import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';

import { KURLY_PURPLE_BOX_PATH } from '../../../../src/shared/constant';
import CloseButton from '../../../../src/shared/components/Button/CloseButton';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { redirectTo } from '../../../../src/shared/reducers/page';
import PersonalInfo from '../../../../src/mypage/kurly-purple-box/m/components/PersonalInfo';

export default function Personal() {
  const dispatch = useDispatch();

  const clickCloseButton = useCallback(() => {
    dispatch(
      redirectTo({
        url: KURLY_PURPLE_BOX_PATH.kurlyPurpleBox.uri,
        replace: true,
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
      <PersonalInfo />
      <UserMenu />
    </>
  );
}
