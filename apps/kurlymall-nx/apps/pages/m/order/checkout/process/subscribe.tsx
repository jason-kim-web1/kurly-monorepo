import { getServerSideKurlyPayProps } from '../../../../../src/order/subscribe/server';
import InProgress from '../../../../../src/order/subscribe/components/InProgress';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';
import { MobileInProgressProps } from '../../../../../src/order/subscribe/interfaces';
import { useAppSelector } from '../../../../../src/shared/store';

export default function SubscribeProcessContainer({ accessToken, ...restProps }: MobileInProgressProps) {
  const { isReady } = useAppToken({ accessToken });
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  if (!isReady || !hasSession) {
    return <Loading />;
  }

  return <InProgress {...restProps} />;
}

export const getServerSideProps = getServerSideKurlyPayProps();
