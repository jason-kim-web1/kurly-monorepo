import { AxiosError } from 'axios';

export const getErrorMessage = (
  error: AxiosError,
  defaultMessage = '일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
) => {
  const { message } = error.response?.data || {};
  return message || defaultMessage;
};
