import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import CouponContainer from '../../../src/mypage/coupon/shared/containers/CouponContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import { BADGE_KEY, updateReadBadge } from '../../../src/shared/api';
import { useAppSelector } from '../../../src/shared/store';
import { loadUserNotification } from '../../../src/header/header.slice';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';

export default function CouponListPage() {
  const dispatch = useDispatch();

  const { isReady } = useRouter();

  const { hasSession, couponBadge } = useAppSelector(({ auth, header }) => ({
    hasSession: auth.hasSession,
    couponBadge: header.userNotification.badge.coupon,
  }));

  useScreenName(ScreenName.COUPON_LIST);

  useEffect(() => {
    if (!hasSession || !couponBadge) {
      return;
    }

    updateReadBadge(BADGE_KEY.coupon_badge).then(() => {
      dispatch(loadUserNotification());
    });
  }, [dispatch, hasSession, couponBadge]);

  return (
    isReady && (
      <>
        <Header />
        <AuthContainer loginRequired fallback={<BlankFallback />}>
          <MypageLayout title="쿠폰">
            <CouponContainer />
          </MypageLayout>
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
