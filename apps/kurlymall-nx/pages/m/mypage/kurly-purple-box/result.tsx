import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';

import { KURLY_PURPLE_BOX_PATH, getPageUrl } from '../../../../src/shared/constant';
import CloseButton from '../../../../src/shared/components/Button/CloseButton';

import ResultForm from '../../../../src/mypage/kurly-purple-box/m/components/ResultForm';

import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { useCompleteRequest } from '../../../../src/mypage/kurly-purple-box/shared/hooks/usePersonalBoxQuery';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { redirectTo } from '../../../../src/shared/reducers/page';

export default function PersonalBoxRequestFormPage() {
  const dispatch = useDispatch();

  const { data: completeRequest } = useCompleteRequest();
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
        <HeaderTitle>{completeRequest ? '신청완료' : '개인 보냉 박스'}</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        <ResultForm />
      </AuthContainer>
      <UserMenu />
    </>
  );
}
