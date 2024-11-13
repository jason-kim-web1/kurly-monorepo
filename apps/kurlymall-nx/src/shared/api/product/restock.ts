import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';

export const postRestockedNotification = async ({
  contentProductNo,
  dealProductNo,
}: {
  contentProductNo: number;
  dealProductNo: number;
}) => {
  try {
    const path = `/restocked-notification/v1/home/content-products/${contentProductNo}/deal-products/${dealProductNo}/notifications`;
    await httpClient.post(path);
  } catch (err) {
    const errorCode = err.response?.data.code ?? 0;

    if (errorCode === '2002') {
      throw Error('이미 재입고 알림 신청이 완료된 상품입니다.');
    }

    throw new UnknownError(err);
  }
};
