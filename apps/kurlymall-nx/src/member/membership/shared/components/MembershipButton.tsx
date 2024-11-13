import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { isBefore, parseISO } from 'date-fns';
import { head } from 'lodash';

import { COMMON_PATH, MEMBERSHIP_PATH, MYPAGE_PATH, ORDER_PATH } from '../../../../shared/constant';
import Button from '../../../../shared/components/Button/Button';
import { useAppSelector } from '../../../../shared/store';
import { amplitudeService } from '../../../../shared/amplitude';
import {
  SelectMembershipInfo,
  SelectMembershipSubscribe,
  SelectMembershipSubscribeConfirm,
} from '../../../../shared/amplitude/events/membership';
import { redirectTo } from '../../../../shared/reducers/page';
import { useWebview } from '../../../../shared/hooks';
import Alert from '../../../../shared/components/Alert/Alert';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { useMembersInfo } from '../hooks/useMembersInfo';
import { loadMemberLoading } from '../../../../shared/reducers/member';
import { getMembershipQueryData, MEMBERS_BUTTON_ID } from '../constants';
import { TooltipButtonWrap, TooltipLayerWrap, TooltipLayer } from '../../../../mypage/membership/shared/styled';

const AUTO_CLOSE_TIME = 10000;

type MembershipButtonProps = {
  showTermsPopup: () => Promise<void>;
  isPC: boolean;
};

export default function MembershipButton({ showTermsPopup, isPC }: MembershipButtonProps) {
  const isWebView = useWebview();

  const dispatch = useDispatch();
  const { asPath, query } = useRouter();

  const { isGuest, isSubscribed, hasSession, freeTicket } = useAppSelector(({ auth, member }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
    isSubscribed: member.subscription.isSubscribed,
    freeTicket: member.subscription.freeTicket,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const { isLoading, subscribedButtonText, unSubscribedButtonText, tooltipButtonText } = useMembersInfo();

  const goToMembershipPage = useCallback(() => {
    amplitudeService.logEvent(new SelectMembershipInfo());

    dispatch(redirectTo({ url: MYPAGE_PATH.myMembership.uri }));
  }, [dispatch]);

  const showSubscriptionTerms = useCallback(async () => {
    amplitudeService.logEvent(new SelectMembershipSubscribe());

    await showTermsPopup();
  }, [showTermsPopup]);

  const goToPaySubscription = useCallback(() => {
    amplitudeService.logEvent(new SelectMembershipSubscribeConfirm());

    dispatch(redirectTo({ url: ORDER_PATH.subscribe.uri }));
  }, [dispatch]);

  const handleOnClick = async () => {
    if (isSubscribed) {
      goToMembershipPage();
      return;
    }

    if (isGuest) {
      await Alert({ text: '로그인 이후에 컬리멤버스 구독이 가능합니다.' });

      if (isWebView) {
        location.href = deepLinkUrl.LOGIN;
        return;
      }

      dispatch(
        redirectTo({
          url: COMMON_PATH.login.uri,
          query: {
            internalUrl: head(asPath.split('?')) || MEMBERSHIP_PATH.membership.uri,
          },
        }),
      );

      return;
    }

    if (getMembershipQueryData(query).showTerms) {
      showSubscriptionTerms();
      return;
    }

    goToPaySubscription();
  };

  const buttonExtraProps = {
    id: MEMBERS_BUTTON_ID,
    height: 54,
    radius: 8,
    isSubmitLoading: !hasSession || (!isGuest && memberLoading) || isLoading,
    text: isSubscribed ? subscribedButtonText : unSubscribedButtonText,
    onClick: handleOnClick,
  };

  const isNotExpired = isBefore(new Date(), parseISO(freeTicket?.expiredAt ?? ''));

  return (
    <TooltipButtonWrap>
      {hasSession && !memberLoading && !isSubscribed && isNotExpired ? (
        <TooltipLayerWrap>
          <TooltipLayer className="tooltip" autoCloseTime={AUTO_CLOSE_TIME}>
            {tooltipButtonText}
          </TooltipLayer>
        </TooltipLayerWrap>
      ) : null}
      {isPC ? (
        <Button theme="primary" width={424} {...buttonExtraProps} />
      ) : (
        <Button theme="primary" {...buttonExtraProps} />
      )}
    </TooltipButtonWrap>
  );
}
