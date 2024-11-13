import { useCallback, useMemo } from 'react';

import { VendorCode, VendorCodes, VendorCodeWithDeleted } from '../interfaces';

interface NaverPayButtonProps {
  disableVendor?: VendorCodeWithDeleted[];
  onClickPaymentVendor: (vendor: VendorCode) => void;
}

export const useNaverPayButton = ({ disableVendor, onClickPaymentVendor }: NaverPayButtonProps) => {
  const handleClickNaverPayButton = useCallback(() => {
    onClickPaymentVendor(VendorCodes.NAVER_PAY);
  }, [onClickPaymentVendor]);

  const isDisabled = useMemo(() => disableVendor?.includes(VendorCodes.NAVER_PAY), [disableVendor]);

  return { handleClickNaverPayButton, isDisabled };
};
