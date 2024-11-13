import { useAppSelector } from '../../../../shared/store';
import { ORDER_PATH, USER_MENU_PATH } from '../../../../shared/constant';
import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { isWebview } from '../../../../../util/window/getDevice';
import deepLinkUrl from '../../../../shared/constant/deepLink';

interface Props {
  returnUrl?: string;
  errorUrl?: string;
}

export default function useIssuanceKurlypayCard(callbackUrls?: Props) {
  const getDefaultCallbackUrl = () => {
    if (isWebview()) {
      return deepLinkUrl.MAINTAIN;
    }

    if (!checkBrowserEnvironment()) {
      return '';
    }

    return `${window.location.origin}${USER_MENU_PATH.home.uri}`;
  };

  const returnUrl = callbackUrls?.returnUrl ?? getDefaultCallbackUrl();
  const errorUrl = callbackUrls?.errorUrl ?? getDefaultCallbackUrl();

  const memberNo = useAppSelector(({ member }) => member.info?.memberNo);
  const handleCardFormSubmit = () => {
    const searchParams = new URLSearchParams({
      merchantMemberId: memberNo ? memberNo.toString() : '',
      returnUrl,
      errorUrl,
    });

    const targetUrl = `${window.location.origin}${ORDER_PATH.plccPopup.uri}?${searchParams.toString()}`;

    window.open(targetUrl, '_blank');
  };

  return {
    handleCardFormSubmit,
  };
}
