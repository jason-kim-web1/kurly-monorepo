import { useRouter } from 'next/router';

import { getPathName, URL_TYPE } from '../utils/paymentProcess';

export const PIN_CODE_ERROR = 'NEED_PIN_INIT';

export const usePinCodeError = (isChangePayment: boolean) => {
  const { replace } = useRouter();

  const handlePinCodeError = async () => {
    const targetUrl = getPathName({
      isChangePayment,
      urlType: URL_TYPE.SUBSCRIBE,
    });

    await replace(targetUrl);
  };

  return {
    handlePinCodeError,
  };
};
