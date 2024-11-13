import { useEffect, useState } from 'react';

export const IMAGE_VALIDATION_STATUS = {
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

type Status = keyof typeof IMAGE_VALIDATION_STATUS;

/**
 * <image/> src 속성으로 주입되는 url 문자열로 정상적으로 이미지를 불러올 수 있는지 체크하고, 상태 값을 반환합니다.
 * @param url <image/> src 속성으로 들어갈 url 문자열
 * @returns {Status} 상태 값
 */
const useCheckImageURLValid = (url?: string | null): Record<'status', Status> => {
  const [status, setStatus] = useState<Status>(IMAGE_VALIDATION_STATUS.loading);

  useEffect(() => {
    if (!url) {
      setStatus(IMAGE_VALIDATION_STATUS.error);
      return;
    }

    const img = new Image();

    img.src = url;

    img.onerror = () => {
      setStatus(IMAGE_VALIDATION_STATUS.error);
    };

    img.onload = () => {
      setStatus(IMAGE_VALIDATION_STATUS.success);
    };
  }, [url]);

  return {
    status,
  };
};

export default useCheckImageURLValid;
