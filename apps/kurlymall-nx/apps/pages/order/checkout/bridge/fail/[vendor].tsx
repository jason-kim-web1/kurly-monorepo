import { getBridgeServerSideProps } from '../../../../../src/order/checkout/shared/utils/getBridgeServerSideProps';
import { VendorCode, VendorCodes } from '../../../../../src/order/shared/shared/interfaces';
import PaymentBridge from '../../../../../src/order/checkout/shared/components/PaymentBridge';
import { ORDER_PATH } from '../../../../../src/shared/constant';

const VENDOR_PROCESS_FILTER: { query: VendorCode[]; header: VendorCode[] } = {
  query: [],
  header: [VendorCodes.PHONEBILL],
};

interface VendorBridgeServerSideProps {
  vendor: VendorCode | null;
  bodyResult?: { [key: string]: string | number };
  queryResult: string;
}

export default function FailBridgePage({ vendor, bodyResult, queryResult }: VendorBridgeServerSideProps) {
  return (
    <PaymentBridge
      vendor={vendor}
      vendorFilter={VENDOR_PROCESS_FILTER}
      url={`${ORDER_PATH.fail.uri}/${vendor}`}
      queryResult={queryResult}
      bodyResult={bodyResult}
    />
  );
}

export const getServerSideProps = getBridgeServerSideProps;
