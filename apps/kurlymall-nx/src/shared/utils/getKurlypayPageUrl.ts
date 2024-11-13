import { KURLYPAY_PATH } from '../constant';
import { KurlypayPage } from '../hooks/useKurlypay';

interface Props {
  page: KurlypayPage;
  returnUrl: string;
  pageName: string;
  tokenQuerystring?: string;
  isGiftCardOrder: boolean;
  deviceId: string;
}

enum RegistrationType {
  BANK = 'BANK',
  CARD = 'CARD',
}

export const getKurlypayPageUrl = ({
  page,
  returnUrl,
  pageName,
  tokenQuerystring,
  isGiftCardOrder,
  deviceId,
}: Props) => {
  const baseUrl = `${window.location.origin}${KURLYPAY_PATH.kurlypayAction.uri}`;

  const params = new URLSearchParams({
    returnUrl,
    action: page,
    pageName,
    ...(isGiftCardOrder && { payMethod: RegistrationType.BANK }),
    ...(deviceId && { deviceId }),
  }).toString();

  return `${baseUrl}?${tokenQuerystring}&${params}`;
};
