import { fetchDeliveryTrackingHtml } from '../../../../shared/api/mypage/delivery-tracking';
import { parseTrackingHtml } from '../util/parseTrackingHtml';

interface Parameters {
  invoiceNo: string;
  extraCourierCode: string;
}

export const getDeliveryTrackingHtml = async ({ invoiceNo, extraCourierCode }: Parameters) => {
  const { html } = await fetchDeliveryTrackingHtml({ invoiceNo, extraCourierCode });

  const { parsedHtml } = parseTrackingHtml(html);

  return {
    parsedHtml,
  };
};
