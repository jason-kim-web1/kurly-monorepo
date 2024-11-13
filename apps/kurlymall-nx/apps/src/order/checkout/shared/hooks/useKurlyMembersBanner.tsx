import { useCallback } from 'react';

import { EasyPaymentType } from '../../../../shared/interfaces';
import { useAppSelector } from '../../../../shared/store';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';
import { MEMBERS_BANNER } from '../constants/kurly-members-banner';
import { isPC } from '../../../../../util/window/getDevice';
import { MEMBERSHIP_PATH } from '../../../../shared/constant';
import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { getMembersBannerQueryString } from '../utils/getMembersBannerQueryString';

export default function useKurlyMembersBanner() {
  const { selectedKurlypayVendor, defaultPaymentMethodId } = useAppSelector(({ checkoutPayment }) => ({
    selectedKurlypayVendor: checkoutPayment.selectedKurlypayVendor,
    defaultPaymentMethodId: checkoutPayment.defaultPaymentMethodId,
  }));

  const getSelectedPaymentMethodId = useCallback(() => {
    if (!selectedKurlypayVendor) {
      return null;
    }

    const { paymentType, paymentMethodId } = selectedKurlypayVendor;

    const isSelectedLottieOrGhostCard =
      paymentType === EasyPaymentType.ADD_KURLYPAY || paymentType === EasyPaymentType.ADD_PLCC;

    return isSelectedLottieOrGhostCard ? defaultPaymentMethodId : paymentMethodId;
  }, [defaultPaymentMethodId, selectedKurlypayVendor]);

  const getRedirectUrl = () => {
    if (!checkBrowserEnvironment) {
      return '';
    }

    const paymentMethodId = getSelectedPaymentMethodId();
    const queryString = getMembersBannerQueryString(paymentMethodId);

    return `${window.location.origin}${MEMBERSHIP_PATH.membership.uri}${queryString}`;
  };

  const { membersBanner, goToMembership } = useMembersBanner({
    bannerType: isPC ? MEMBERS_BANNER.PC_KURLY_PAY : MEMBERS_BANNER.MO_KURLY_PAY,
    redirectLink: getRedirectUrl(),
  });

  return { goToMembership, membersBanner, ...membersBanner };
}
