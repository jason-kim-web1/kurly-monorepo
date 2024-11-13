import OrderFailContainer from '../../../../../src/order/checkout/shared/containers/payments/fail/OrderFailContainer';
import { getServerSidePhonebillProps } from '../../../../../src/order/checkout/shared/containers/payments/process/PhonebillProcessContainer';
import { PostProcessPageProps } from '../../../../../src/shared/interfaces';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function OrderFailPage({ accessToken, paymentGatewayMessage, paymentAllResult }: PostProcessPageProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return (
    <OrderFailContainer isGiftOrder paymentGatewayMessage={paymentGatewayMessage} paymentAllResult={paymentAllResult} />
  );
}

export const getServerSideProps = getServerSidePhonebillProps();
