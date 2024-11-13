import COLOR from '../../../../../shared/constant/colorset';
import { PaymentEvents, PaymentVendor, VendorCode, VendorCodes, VendorCodeWithDeleted } from '../../interfaces';
import PaymentMethodCategoryButton from '../PaymentMethodCategoryButton';
import NaverPay from '../../../../../shared/icons/NaverPay';
import { useNaverPayButton } from '../../hooks/useNaverPayButton';
const NAVER_PAY_TEST_ID = 'naver-pay-button';

interface NaverPayProps {
  selectedVendor?: PaymentVendor;
  event: PaymentEvents;
  disableVendor?: VendorCodeWithDeleted[];
  onClickPaymentVendor: (vendor: VendorCode) => void;
}

export const NaverPayButton = ({ selectedVendor, event, ...restProps }: NaverPayProps) => {
  const { isDisabled, handleClickNaverPayButton } = useNaverPayButton(restProps);

  return (
    <PaymentMethodCategoryButton
      testId={NAVER_PAY_TEST_ID}
      color={isDisabled ? COLOR.kurlyWhite : COLOR.naverBg}
      active={selectedVendor?.code === VendorCodes.NAVER_PAY}
      hasEvent={!!event[VendorCodes.NAVER_PAY]}
      onClick={handleClickNaverPayButton}
      disabled={isDisabled}
    >
      <NaverPay fill={isDisabled ? COLOR.lightGray : COLOR.kurlyBlack} />
    </PaymentMethodCategoryButton>
  );
};
