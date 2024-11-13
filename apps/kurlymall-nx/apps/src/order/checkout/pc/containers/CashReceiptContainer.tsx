import { Title } from '../components/Title';
import InformationRow from '../../../../shared/components/layouts/InformationRow';
import CashReceiptInfo from '../components/CashReceiptInfo';
import useKurlypay, { KURLYPAY_PAGES, KurlypayPage } from '../../../../shared/hooks/useKurlypay';
import { KURLYPAY_PATH } from '../../../../shared/constant';
import { useAppSelector } from '../../../../shared/store';

export default function CashReceiptContainer() {
  const hasRegisteredCashReceipt = useAppSelector(({ checkoutPayment }) => checkoutPayment.hasRegisteredCashReceipt);
  const { openKurlypayPage, getReturnUrl } = useKurlypay();

  const pageParams: { page: KurlypayPage; returnUrl: string } = {
    page: KURLYPAY_PAGES.cashReceipt,
    returnUrl: getReturnUrl(`${KURLYPAY_PATH.kurlypayDefaultCallback.uri}`),
  };

  return (
    <>
      <Title title="현금영수증" />
      <InformationRow title="현금영수증 신청">
        <CashReceiptInfo
          hasReceiptInfo={hasRegisteredCashReceipt}
          openCashReceipt={() => openKurlypayPage(pageParams)}
        />
      </InformationRow>
    </>
  );
}
