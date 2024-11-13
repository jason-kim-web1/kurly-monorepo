import { useRouter } from 'next/router';

import CallbackPopupContainer from '../../../../../src/shared/containers/CallbackPopupContainer';
import { CALLBACK_FUNCTION_NAMES } from '../../../../../src/shared/constant/callbackFunction';

export default function KurlypayCallbackPage() {
  const { back } = useRouter();

  return (
    <CallbackPopupContainer callbackFunction={CALLBACK_FUNCTION_NAMES.checkoutRefresh} status="success" lastly={back} />
  );
}
