import httpClient from '../../configs/http-client';
import { BaseApiResponse } from '../../interfaces';
import { UnknownError } from '../../errors/UnknownError';

interface Parameters {
  invoiceNo: string;
  extraCourierCode: string;
}

export const fetchDeliveryTrackingHtml = async ({ invoiceNo, extraCourierCode }: Parameters) => {
  const endpoint = `/order-front/v1/mypage/order/tracking?invoiceNo=${invoiceNo}&extraCourierCode=${extraCourierCode}`;

  if (!invoiceNo || !extraCourierCode) {
    throw new UnknownError(new Error('송장 번호 정보가 없습니다.'));
  }

  try {
    const {
      data: { data },
    } = await httpClient.get<BaseApiResponse<string>>(endpoint);

    return { html: data };
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
