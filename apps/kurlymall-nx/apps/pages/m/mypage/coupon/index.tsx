import { useRouter } from 'next/router';

import { useEffect } from 'react';

import CouponContainer from '../../../../src/mypage/coupon/shared/containers/CouponContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import { getWebviewServerSideProps } from '../../../../src/server/webview';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { isWebview } from '../../../../util/window/getDevice';
import { ScreenName } from '../../../../src/shared/amplitude';
import { useAppSelector } from '../../../../src/shared/store';
import { BADGE_KEY, updateReadBadge } from '../../../../src/shared/api';
import TopBar, { BUTTON_TYPE } from '../../../../src/shared/components/KPDS/TopBar';

interface Props {
  accessToken: string;
}

const headerTitle = '쿠폰';

export default function CouponListPage({ accessToken }: Props) {
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const {
    userNotification: { badge },
  } = useAppSelector(({ header }) => header);

  useScreenName(ScreenName.COUPON_LIST);

  const router = useRouter();
  const webview = useWebview();

  useEffect(() => {
    if (isWebview() || !hasSession || !badge.coupon) {
      return;
    }

    updateReadBadge(BADGE_KEY.coupon_badge);
  }, [badge.coupon, hasSession]);

  return (
    router.isReady && (
      <>
        <TopBar type={BUTTON_TYPE.back} IconTypes={['cart']}>
          {headerTitle}
        </TopBar>
        <AuthContainer loginRequired appToken={accessToken}>
          <CouponContainer />
        </AuthContainer>
        {!webview && <UserMenu />}
      </>
    )
  );
}

export const getServerSideProps = getWebviewServerSideProps();
