import OrderFailContainer from '../../../../../../src/order/checkout/shared/containers/payments/fail/OrderFailContainer';
import { getServerSidePhonebillProps } from '../../../../../../src/order/checkout/shared/containers/payments/process/PhonebillProcessContainer';
import { PostProcessPageProps } from '../../../../../../src/shared/interfaces';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function OrderFailPageContainer({ accessToken, paymentAllResult }: PostProcessPageProps) {
  const { isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <OrderFailContainer paymentAllResult={paymentAllResult} />;
}

export const getServerSideProps = getServerSidePhonebillProps();
