import { AxiosError } from 'axios';

export const handleMypageCancelError = (err: AxiosError): Error => {
  const errorMessage = err.response?.data.message || '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.';

  throw new Error(errorMessage);
};
