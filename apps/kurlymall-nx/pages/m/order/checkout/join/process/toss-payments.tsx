import TossPaymentsProcessContainer, {
  getServerSideTossPaymentsProps,
} from '../../../../../../src/order/checkout/shared/containers/payments/process/TossPaymentsProcessContainer';
import { TossPaymentsPostProcessPageProps } from '../../../../../../src/shared/interfaces';
import Loading from '../../../../../../src/shared/components/Loading/Loading';
import { useAppToken } from '../../../../../../src/shared/hooks/useAppToken';

export default function TossPaymentsProcessPage(props: TossPaymentsPostProcessPageProps) {
  const { isReady } = useAppToken({ accessToken: props.accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossPaymentsProcessContainer isJoinOrder {...props} />;
}

export const getServerSideProps = getServerSideTossPaymentsProps();
