import OrderFailContainer from '../../../../src/order/checkout/shared/containers/payments/fail/OrderFailContainer';
import { getServerSidePhonebillProps } from '../../../../src/order/checkout/shared/containers/payments/process/PhonebillProcessContainer';
import { PostProcessPageProps } from '../../../../src/shared/interfaces';

export default function OrderFailPageContainer({ paymentAllResult, paymentGatewayMessage }: PostProcessPageProps) {
  return <OrderFailContainer paymentAllResult={paymentAllResult} paymentGatewayMessage={paymentGatewayMessage} />;
}

export const getServerSideProps = getServerSidePhonebillProps();
