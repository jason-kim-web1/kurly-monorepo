import CashReceiptInfo from '../components/CashReceiptInfo';
import { Panel } from '../../../../shared/components/Panel';
import useKurlypay, { KURLYPAY_PAGES, KurlypayPage } from '../../../../shared/hooks/useKurlypay';
import { useAppSelector } from '../../../../shared/store';
import { KURLYPAY_PATH } from '../../../../shared/constant';
import { Divider } from '../../../../shared/components/Divider/Divider';

export default function CashReceiptContainer() {
  const hasRegisteredCashReceipt = useAppSelector(({ checkoutPayment }) => checkoutPayment.hasRegisteredCashReceipt);
  const { openKurlypayPage, getReturnUrl } = useKurlypay();

  const pageParams: { page: KurlypayPage; returnUrl: string } = {
    page: KURLYPAY_PAGES.cashReceipt,
    returnUrl: getReturnUrl(`${KURLYPAY_PATH.kurlypayDefaultCallback.uri}`),
  };

  return (
    <>
      <Panel
        title="현금영수증"
        css={{
          position: 'relative',
        }}
      >
        <CashReceiptInfo
          hasReceiptInfo={hasRegisteredCashReceipt}
          openCashReceipt={() => openKurlypayPage(pageParams)}
        />
      </Panel>
      <Divider />
    </>
  );
}
