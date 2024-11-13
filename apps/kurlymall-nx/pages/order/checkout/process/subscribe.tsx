import { InProgressProps } from '../../../../src/order/subscribe/interfaces';
import { getServerSideKurlyPayProps } from '../../../../src/order/subscribe/server';
import InProgress from '../../../../src/order/subscribe/components/InProgress';
import { useAppSelector } from '../../../../src/shared/store';

export default function SubscribeProcessContainer(paymentResult: InProgressProps) {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  if (!hasSession) {
    return null;
  }

  return <InProgress {...paymentResult} />;
}

export const getServerSideProps = getServerSideKurlyPayProps();
