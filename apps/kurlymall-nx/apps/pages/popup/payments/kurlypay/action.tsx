import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { ParsedUrlQuery } from 'querystring';
import { KURLYPAY_PAGES, KurlypayPage } from '../../../../src/shared/hooks/useKurlypay';
import Alert from '../../../../src/shared/components/Alert/Alert';
import { KURLYPAY_API_URL } from '../../../../src/shared/configs/config';

const BaseEndpoint = `${KURLYPAY_API_URL}/api/payment/v1/easy`;
const FormActionEndpoint: Record<KurlypayPage, string> = {
  mypage: `${BaseEndpoint}/mypage`,
  leave: `${BaseEndpoint}/leavereq`,
  registration: `${BaseEndpoint}/regreq`,
  cashReceipt: `${BaseEndpoint}/regcrct`,
  reserves: `${BaseEndpoint}/reserves`,
};

export default function KurlypayPopupAction() {
  const { isReady, query } = useRouter();
  const {
    action,
    authorizationToken = '',
    accessToken = '',
    merchantIdentifier = '',
    merchantMemberIdentifier = '',
    returnUrl = '',
    pageName = '',
    payMethod = '',
    deviceId = '',
    orderToken = '',
  } = query as ParsedUrlQuery & {
    action: KurlypayPage;
    authorizationToken?: string;
    accessToken?: string;
    merchantIdentifier?: string;
    merchantMemberIdentifier?: string;
    returnUrl?: string;
    pageName?: string;
    payMethod?: string;
    deviceId?: string;
    orderToken?: string;
  };
  const formElementRef = useRef<HTMLFormElement>(null);

  const isKurlypayPage = (page: KurlypayPage): page is KurlypayPage => Object.values(KURLYPAY_PAGES).includes(page);

  const prePageName = pageName ? `?pre_page_name=${pageName}` : pageName;

  useEffect(() => {
    const { current } = formElementRef;
    if (!current || !isReady) {
      return;
    }

    if (!action || !isKurlypayPage(action)) {
      Alert({
        text: 'popup action이 설정되어 있지 않습니다.',
      }).then(() => window.close());
      return;
    }
    current.submit();
  }, [action, isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <form ref={formElementRef} method="POST" id="kurlypayPopup" action={`${FormActionEndpoint[action]}${prePageName}`}>
      {/* TODO authorizationToken 제거 예정 (accessToken로 대체) */}
      <input type="hidden" name="authorizationToken" id="authorizationToken" value={authorizationToken} />
      <input type="hidden" name="accessToken" id="accessToken" value={accessToken} />
      <input type="hidden" name="merchantIdentifier" id="merchantIdentifier" value={merchantIdentifier} />
      <input
        type="hidden"
        name="merchantMemberIdentifier"
        id="merchantMemberIdentifier"
        value={merchantMemberIdentifier}
      />
      <input type="hidden" name="returnUrl" id="returnUrl" value={returnUrl} />
      {payMethod && <input type="hidden" name="payMethod" id="payMethod" value={payMethod} />}
      {deviceId && <input type="hidden" name="deviceId" id="deviceId" value={deviceId} />}
      {orderToken && <input type="hidden" name="orderToken" id="orderToken" value={orderToken} />}
    </form>
  );
}
