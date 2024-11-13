import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import DeliveryTracker from '../../../src/mypage/order/shared/components/delivary-tracking/DeliveryTracker';

export default function DeliveryTracingPage() {
  const { query } = useRouter();

  const { invoiceNo, extraCourierCode } = query as ParsedUrlQuery & { invoiceNo: string; extraCourierCode: string };

  return <DeliveryTracker invoiceNo={invoiceNo} extraCourierCode={extraCourierCode} />;
}
