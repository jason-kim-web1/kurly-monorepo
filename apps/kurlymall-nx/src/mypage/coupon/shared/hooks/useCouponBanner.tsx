import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getDaBanner } from '../../../../header/services/banner.service';
import { amplitudeService } from '../../../../shared/amplitude';
import { ImpressionCouponListBanner } from '../../../../shared/amplitude/events/mypage/ImpressionCouponListBanner';
import { SelectCouponListBanner } from '../../../../shared/amplitude/events/mypage/SelectCouponListBanner';
import { MEMBERSHIP_PATH } from '../../../../shared/constant';
import { useWebview } from '../../../../shared/hooks';
import { AdBannersResponse, initialAdBanner } from '../../../../shared/interfaces/AdBannerResponse';
import appService from '../../../../shared/services/app.service';
import { AppState, useAppSelector } from '../../../../shared/store';
import { loadMemberLoading } from '../../../../shared/reducers/member';
import { ignoreError } from '../../../../shared/utils/general';

interface Response {
  couponBanner: AdBannersResponse;
  handleBannerClick: () => void;
}

const checkMembershipLink = (link: string) => {
  return link.includes(MEMBERSHIP_PATH.membership.uri);
};

const updateWebviewSession = () => {
  appService.postAppMessage({ code: 'WV1000' });
};

declare global {
  interface Window {
    UPDATE_WEBVIEW_SESSION: () => void;
  }
}

export default function useCouponBanner(): Response {
  const { push } = useRouter();
  const isWebView = useWebview();

  const [couponBanner, setCouponBanner] = useState<AdBannersResponse>(initialAdBanner);

  const { isSubscribed } = useAppSelector(({ member }: AppState) => ({
    isSubscribed: member.subscription.isSubscribed,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  useEffect(() => {
    window.UPDATE_WEBVIEW_SESSION = updateWebviewSession;
  }, []);

  useEffect(() => {
    if (memberLoading) {
      return;
    }

    const loadCouponBanner = async () => {
      ignoreError(async () => {
        const banner = await getDaBanner('COUPON_MOBILE_KURLY_MEMBERS');

        if (!banner) {
          return;
        }

        // 배너가 멤버십 구독 안내 페이지로 연결되는 경우, 멤버십 구독 회원에게는 노출하지 않는다.
        const isMembersUrl = checkMembershipLink(banner.link);
        if (isMembersUrl && isSubscribed) {
          return;
        }

        setCouponBanner(banner);

        const { title, link: url, id: bannerId } = banner;
        amplitudeService.logEvent(new ImpressionCouponListBanner({ title, url, bannerId }));
      });
    };

    loadCouponBanner();
  }, [isSubscribed, memberLoading]);

  const handleBannerClick = () => {
    const { title, link: url, id: bannerId } = couponBanner;
    amplitudeService.logEvent(new SelectCouponListBanner({ title, url, bannerId }));

    if (isWebView) {
      const isMembersUrl = checkMembershipLink(couponBanner.link);

      if (isMembersUrl) {
        appService.postWebViewController({
          code: 'WVC1001',
          callback_function: 'UPDATE_WEBVIEW_SESSION()',
        });
      }

      push(`kurly://open?url=${couponBanner.link}`);
      return;
    }

    push(couponBanner.link);
  };

  return {
    couponBanner,
    handleBannerClick,
  };
}
