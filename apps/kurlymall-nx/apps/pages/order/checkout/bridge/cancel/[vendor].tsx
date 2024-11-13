import { getBridgeServerSideProps } from '../../../../../src/order/checkout/shared/utils/getBridgeServerSideProps';
import { ORDER_PATH } from '../../../../../src/shared/constant';
import { VendorCode, VendorCodes } from '../../../../../src/order/shared/shared/interfaces';
import PaymentBridge from '../../../../../src/order/checkout/shared/components/PaymentBridge';

const VENDOR_PROCESS_FILTER: { query: VendorCode[]; header: VendorCode[] } = {
  query: [VendorCodes.KAKAOPAY, VendorCodes.PHONEBILL, VendorCodes.TOSS_PAYMENTS, VendorCodes.TOSS],
  header: [],
};

interface VendorBridgeServerSideProps {
  vendor: VendorCode | null;
  bodyResult?: { [key: string]: string | number };
  queryResult: string;
}

export default function CancelBridgePage({ vendor, bodyResult, queryResult }: VendorBridgeServerSideProps) {
  return (
    <PaymentBridge
      vendor={vendor}
      vendorFilter={VENDOR_PROCESS_FILTER}
      url={`${ORDER_PATH.cancel.uri}/${vendor}`}
      queryResult={queryResult}
      bodyResult={bodyResult}
    />
  );
}

export const getServerSideProps = getBridgeServerSideProps;
