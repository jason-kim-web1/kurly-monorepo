import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { ParsedUrlQuery } from 'querystring';
import { PLCC_CREATE_REQUEST_URL } from '../../../../src/order/checkout/shared/constants/plcc';

export default function PlccCreatePopup() {
  const { isReady, query } = useRouter();
  const {
    merchantMemberId = '',
    returnUrl = '',
    errorUrl = '',
  } = query as ParsedUrlQuery & {
    merchantMemberId?: string | number;
  };
  const formElementRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const { current } = formElementRef;
    if (!current || !isReady) {
      return;
    }

    current.submit();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <form ref={formElementRef} method="POST" id="plccCreateForm" action={PLCC_CREATE_REQUEST_URL}>
      <input type="hidden" name="merchantMemberId" id="merchantMemberId" value={merchantMemberId} />
      <input type="hidden" name="returnUrl" id="returnUrl" value={returnUrl} />
      <input type="hidden" name="errorUrl" id="errorUrl" value={errorUrl} />
    </form>
  );
}
