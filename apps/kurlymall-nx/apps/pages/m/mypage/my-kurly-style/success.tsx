import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import SaveSuccessful from '../../../../src/mypage/my-kurly-style/shared/containers/SaveSuccessful';
import CloseButton from '../../../../src/shared/components/Button/CloseButton';
import { redirectTo } from '../../../../src/shared/reducers/page';
import { getPageUrl, USER_MENU_PATH } from '../../../../src/shared/constant';
import { useScreenName } from '../../../../src/shared/hooks';
import { amplitudeService, ScreenName } from '../../../../src/shared/amplitude';
import { SubmitProfileSuccess } from '../../../../src/shared/amplitude/events/mykurly-style';

export default function MyKurlyStyleSuccessPage() {
  useScreenName(ScreenName.PROFILE_SETTING_SUCCESS);

  const router = useRouter();

  const dispatch = useDispatch();

  const clickCloseButton = () => {
    dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.mykurly) }));
  };

  useEffect(() => {
    void amplitudeService.logEvent(new SubmitProfileSuccess());
  }, []);

  return (
    router.isReady && (
      <AuthContainer loginRequired>
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={clickCloseButton} />
          </HeaderButtons>
          <HeaderTitle>나의 컬리 스타일</HeaderTitle>
        </MobileHeader>
        <SaveSuccessful />
      </AuthContainer>
    )
  );
}
