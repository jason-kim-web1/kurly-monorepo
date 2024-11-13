import CollapseSummary from '../../../../shared/components/Collapse/CollapseSummary';
import CollapseSummaryPlaceholder from '../../../../shared/components/Collapse/CollapseSummaryPlaceholder';

import { vendorStyles } from '../constants/vendor-styles';
import { isCreditCardPayments } from '../services';
import { useAppSelector } from '../../../../shared/store';

export default function VendorSummary() {
  const { selectedVendor, selectedCreditCard, selectedKurlypayVendor } = useAppSelector(({ checkoutPayment }) => ({
    selectedVendor: checkoutPayment.selectedVendor,
    selectedCreditCard: checkoutPayment.selectedCreditCard,
    selectedKurlypayVendor: checkoutPayment.selectedKurlypayVendor,
  }));

  if (!selectedVendor || !vendorStyles[selectedVendor.code]) {
    return <CollapseSummaryPlaceholder>결제 수단을 선택해주세요</CollapseSummaryPlaceholder>;
  }

  if (isCreditCardPayments(selectedVendor.code)) {
    if (!selectedCreditCard) {
      return <CollapseSummaryPlaceholder>결제 수단을 선택해주세요</CollapseSummaryPlaceholder>;
    }

    return <CollapseSummary text={`신용카드 (${selectedCreditCard?.name})`} />;
  }

  if (selectedVendor.code === 'kurlypay') {
    if (!selectedKurlypayVendor || !selectedKurlypayVendor.companyName) {
      return <CollapseSummary text="컬리페이" />;
    }

    return <CollapseSummary text={`컬리페이 (${selectedKurlypayVendor.companyName})`} />;
  }

  return <CollapseSummary text={vendorStyles[selectedVendor.code].name} />;
}
