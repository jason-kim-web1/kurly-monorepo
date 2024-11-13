import { isNull } from 'lodash';
import { useEffect } from 'react';

import { ignoreError } from '../../../../shared/utils/general';
import { sentryCaptureError } from '../../../../shared/services';
import useBridgeProcessBridge from '../hooks/useBridgeProcessBridge';
import { VendorType } from '../../../../../pages/order/checkout/bridge/[vendor]';

interface VendorBridgeServerSideProps {
  vendor: VendorType | null;
  bodyResult?: { [key: string]: string | number };
  queryResult: string;
  vendorFilter: {
    query: string[];
    header: string[];
  };
  url: string;
}

export default function PaymentBridge({
  vendor,
  bodyResult,
  queryResult,
  vendorFilter,
  url,
}: VendorBridgeServerSideProps) {
  const { handleBodyBridge, handleQueryBridge, handleBridgeError, handleIframePaymentError } = useBridgeProcessBridge();

  useEffect(() => {
    if (isNull(vendor)) {
      handleBridgeError();
      return;
    }

    if (!window.parent.ORDER_PROCESS_QUERY || !window.parent.ORDER_PROCESS_BODY) {
      handleIframePaymentError();
      return;
    }

    if (vendorFilter.query.includes(vendor)) {
      handleQueryBridge({ queryResult, url });
      return;
    }

    if (vendorFilter.header.includes(vendor)) {
      handleBodyBridge({
        bodyResult: bodyResult ?? {},
        queryResult,
        url,
      });
      return;
    }

    handleBridgeError();
  }, [
    bodyResult,
    handleBodyBridge,
    handleBridgeError,
    handleIframePaymentError,
    handleQueryBridge,
    url,
    vendor,
    vendorFilter.header,
    vendorFilter.query,
  ]);

  // 1분간 bridge 페이지를 벗어나지 못하면 실패로 처리합니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      ignoreError(() => {
        sentryCaptureError(new Error('bridge timeout으로 인한 결제 실패'), {
          tags: { type: 'payments', vendor: vendor ?? 'unknown' },
          extra: {
            bodyResult: JSON.stringify(bodyResult) ?? '',
            queryResult,
            url,
          },
        });
      });

      handleBridgeError();
    }, 1000 * 60);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}
