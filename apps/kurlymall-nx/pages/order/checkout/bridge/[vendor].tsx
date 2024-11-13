import { useRouter } from 'next/router';

import { getBridgeServerSideProps } from '../../../../src/order/checkout/shared/utils/getBridgeServerSideProps';
import { MEMBERS_NAME, ORDER_PATH } from '../../../../src/shared/constant';
import PaymentBridge from '../../../../src/order/checkout/shared/components/PaymentBridge';
import { VendorCode, VendorCodes } from '../../../../src/order/shared/shared/interfaces';

export type VendorType = typeof MEMBERS_NAME | VendorCode;

const VENDOR_PROCESS_FILTER: { query: VendorCode[]; header: VendorType[] } = {
  query: [VendorCodes.KAKAOPAY, VendorCodes.KURLYPAY, VendorCodes.KURLYPAY_CREDIT, VendorCodes.TOSS, VendorCodes.PAYCO],
  header: [VendorCodes.PHONEBILL, MEMBERS_NAME],
};

interface VendorBridgeServerSideProps {
  vendor: VendorCode | null;
  bodyResult?: { [key: string]: string | number };
  queryResult: string;
}

export default function VendorBridgePage({ vendor, bodyResult, queryResult }: VendorBridgeServerSideProps) {
  const { pathname } = useRouter();
  const vendorCode = pathname.includes(MEMBERS_NAME) ? MEMBERS_NAME : vendor;

  return (
    <PaymentBridge
      vendor={vendorCode}
      vendorFilter={VENDOR_PROCESS_FILTER}
      url={`${ORDER_PATH.process.uri}/${vendor}`}
      bodyResult={bodyResult}
      queryResult={queryResult}
    />
  );
}

export const getServerSideProps = getBridgeServerSideProps;
