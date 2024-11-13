import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { ParsedUrlQuery } from 'querystring';
import { isWebview } from '../../../../util/window/getDevice';

import appService from '../../../../src/shared/services/app.service';
import { useWebview } from '../../../../src/shared/hooks';
import { MYPAGE_PATH } from '../../../../src/shared/constant';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import DeliveryTracker from '../../../../src/mypage/order/shared/components/delivary-tracking/DeliveryTracker';

export default function DeliveryTracingPage() {
  const { query } = useRouter();
  const webview = useWebview();

  const { invoiceNo, extraCourierCode } = query as ParsedUrlQuery & { invoiceNo: string; extraCourierCode: string };

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle(MYPAGE_PATH.deliveryTracking.name);
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>{MYPAGE_PATH.deliveryTracking.name}</HeaderTitle>
        </MobileHeader>
      )}
      <DeliveryTracker invoiceNo={invoiceNo} extraCourierCode={extraCourierCode} />
    </>
  );
}
