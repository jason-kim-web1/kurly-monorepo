import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { BADGE_KEY, updateReadBadge } from '../../../shared/api';

import { MenuTitleTextMap, myPageKurlypayMenu } from '../../menu-section/constants';
import { amplitudeService } from '../../../shared/amplitude';
import {
  SelectFriendInvitationButton,
  SelectMyKurlyBulkOrder,
  SelectMyKurlyCouponList,
  SelectMyKurlyFrequentlyQna,
  SelectMyKurlyOrderHistory,
  SelectMyKurlyPersonalInquiryHistory,
  SelectMyKurlyPointHistory,
  SelectMyKurlyProductInquiryHistory,
  SelectMyKurlyPurpleBox,
  SelectMyKurlyReviewHistory,
  SelectMyKurlyServiceCenter,
} from '../../../shared/amplitude/events/mypage';
import { SelectMyKurlyStyle } from '../../../shared/amplitude/events/mykurly-style';
import { SelectMyKurlyFrequentlyPurchaseProductList } from '../../../shared/amplitude/events/favorite';
import { SelectMyKurlyPickList } from '../../../shared/amplitude/events';
import { SelectMembership } from '../../../shared/amplitude/events/membership';
import { flushNaverCpsCookies } from '../../../shared/utils/cookie';
import { redirectTo } from '../../../shared/reducers/page';
import useKurlypay from '../../../shared/hooks/useKurlypay';
import { tryParseUrl } from '../../../shared/utils/url';
import Alert from '../../../shared/components/Alert/Alert';
import { SelectMyKurlyKurlyCash } from '../../../shared/amplitude/events/mypage/SelectMyKurlyKurlyCash';

export function useMenuAmplitude() {
  const dispatch = useDispatch();

  const { authKurlypay } = useKurlypay();

  const handleClickLink = useCallback(
    async (title: string, link: string, isKurlyPayFailure?: boolean) => {
      switch (title) {
        case MenuTitleTextMap.emoney:
          amplitudeService.logEvent(new SelectMyKurlyPointHistory());
          break;
        case MenuTitleTextMap.kurlycash:
          amplitudeService.logEvent(new SelectMyKurlyKurlyCash());
          break;
        case MenuTitleTextMap.coupon:
          amplitudeService.logEvent(new SelectMyKurlyCouponList());
          break;
        case MenuTitleTextMap.invite:
          await updateReadBadge(BADGE_KEY.friends_invite_badge);
          amplitudeService.logEvent(new SelectFriendInvitationButton());
          break;
        case MenuTitleTextMap.myKurlyStyle:
          amplitudeService.logEvent(new SelectMyKurlyStyle());
          break;
        case MenuTitleTextMap.favorite:
          amplitudeService.logEvent(new SelectMyKurlyFrequentlyPurchaseProductList());
          break;
        case MenuTitleTextMap.pick:
          amplitudeService.logEvent(new SelectMyKurlyPickList());
          break;
        case MenuTitleTextMap.review:
          amplitudeService.logEvent(new SelectMyKurlyReviewHistory());
          break;
        case MenuTitleTextMap.purplebox:
          amplitudeService.logEvent(new SelectMyKurlyPurpleBox());
          break;
        case MenuTitleTextMap.qna:
          amplitudeService.logEvent(new SelectMyKurlyProductInquiryHistory());
          break;
        case MenuTitleTextMap.inquiry:
          amplitudeService.logEvent(new SelectMyKurlyPersonalInquiryHistory());
          break;
        case MenuTitleTextMap.bulkOrder:
          amplitudeService.logEvent(new SelectMyKurlyBulkOrder());
          break;
        case MenuTitleTextMap.faq:
          amplitudeService.logEvent(new SelectMyKurlyFrequentlyQna());
          break;
        case MenuTitleTextMap.serviceCenter:
          amplitudeService.logEvent(new SelectMyKurlyServiceCenter());
          break;
        case MenuTitleTextMap.myMembership:
          amplitudeService.logEvent(new SelectMembership({ selection_type: 'my_kurly_menu' }));
          break;
        case MenuTitleTextMap.order:
          amplitudeService.logEvent(new SelectMyKurlyOrderHistory());
          break;
        case MenuTitleTextMap.logout:
          flushNaverCpsCookies();
          break;
        default:
          break;
      }

      if (myPageKurlypayMenu(title)) {
        if (isKurlyPayFailure) {
          Alert({ text: '결제 수단 컬리 페이는 현재 점검중입니다.\n잠시 후 다시 시도해 주세요.' });
          return false;
        }

        const url = tryParseUrl(link);

        if (url && /kurlypay\.co\.kr$/.test(url.hostname)) {
          authKurlypay().then(({ accessToken, errorCode }) => {
            if (accessToken) {
              url.searchParams.set('accessToken', accessToken);
            }
            if (errorCode) {
              url.searchParams.set('errorCode', errorCode);
            }

            setTimeout(() => {
              window.open(url.href, '_blank');
            }, 0);
          });
          return;
        }
        Alert({ text: '적립금 또는 컬리캐시 내역으로 이동할 수 없습니다.\n다시 시도 해주세요.' });
        return false;
      }

      if (link.includes('php')) {
        window.location.assign(link);
        return false;
      }

      if (link.includes('docs')) {
        window.open(link);
        return false;
      }

      dispatch(redirectTo({ url: link }));
    },
    [authKurlypay, dispatch],
  );

  return {
    handleClickLink,
  };
}
