import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MypageLayout from '../../../src/mypage/common/Layout';
import MyKurlyStyle from '../../../src/mypage/my-kurly-style/shared/containers/MyKurlyStyle';
import { clearRecommendProduct } from '../../../src/mypage/my-kurly-style/slice';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import { BADGE_KEY, updateReadBadge } from '../../../src/shared/api';
import { useAppSelector } from '../../../src/shared/store';

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

  return (
    router.isReady && (
      <>
        <Header />
        <AuthContainer loginRequired>
          <MypageLayout
            title="나의 컬리 스타일"
            description="나만의 취향이 담긴 프로필을 만들어 다양한 상품을 추천 받아보세요!"
          >
            <MyKurlyStyle />
          </MypageLayout>
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
