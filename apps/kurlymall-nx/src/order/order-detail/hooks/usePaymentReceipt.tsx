import { useCallback, useMemo } from 'react';

import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { OrderDetail } from '../interface/OrderDetail';
import { RECEIPT_TITLE, RECEIPT_TYPE, ReceiptType } from '../constants/receipt';

const openWebviewReceipt = ({ url, receiptType }: { url: string; receiptType: ReceiptType }) => {
  appService.openWebview({
    url,
    title: RECEIPT_TITLE[receiptType],
    is_modal: false,
  });
};

export const usePaymentReceipt = ({ cashUrl, creditCardUrl }: OrderDetail['receipt']) => {
  const isHideReceiptButton = useMemo(() => !creditCardUrl && !cashUrl, [cashUrl, creditCardUrl]);

  const handleClickReceiptButton = useCallback(
    (receiptType: ReceiptType) => {
      const url = receiptType === RECEIPT_TYPE.CREDIT_CART ? creditCardUrl : cashUrl;

      if (!url) return;

      if (isWebview()) {
        openWebviewReceipt({ url, receiptType });
        return;
      }

      window.open(url, '_blank');
    },
    [cashUrl, creditCardUrl],
  );

  return {
    isHideReceiptButton,
    handleClickReceiptButton,
  };
};
