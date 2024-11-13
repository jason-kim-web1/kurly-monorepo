import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MyKurlyStyle from '../../../../src/mypage/my-kurly-style/shared/containers/MyKurlyStyle';
import { redirectTo } from '../../../../src/shared/reducers/page';
import { getPageUrl, USER_MENU_PATH } from '../../../../src/shared/constant';
import { clearRecommendProduct } from '../../../../src/mypage/my-kurly-style/slice';
import { useScreenName } from '../../../../src/shared/hooks';
import { amplitudeService, ScreenName } from '../../../../src/shared/amplitude';
import { BADGE_KEY, updateReadBadge } from '../../../../src/shared/api';
import { useAppSelector } from '../../../../src/shared/store';
import { SelectBackButton } from '../../../../src/shared/amplitude/events/mykurly-style/SelectBackButton';

export default function MyKurlyStylePage() {
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const {
    userNotification: { badge },
  } = useAppSelector(({ header }) => header);

  useScreenName(ScreenName.MY_KURLY_STYLE);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearRecommendProduct());
  }, [dispatch]);

  useEffect(() => {
    if (!hasSession || !badge.profile) {
      return;
    }

    updateReadBadge(BADGE_KEY.profile_badge);
  }, [badge.profile, hasSession]);

  const clickCloseButton = () => {
    void amplitudeService.logEvent(new SelectBackButton({ selectionType: 'back_button' }));
    dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.mykurly) }));
  };

  return (
    router.isReady && (
      <AuthContainer loginRequired>
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton onClick={clickCloseButton} />
          </HeaderButtons>
          <HeaderTitle>나의 컬리 스타일</HeaderTitle>
        </MobileHeader>
        <MyKurlyStyle />
      </AuthContainer>
    )
  );
}
