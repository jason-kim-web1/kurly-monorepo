import TossPaymentsProcessContainer, {
  getServerSideTossPaymentsProps,
} from '../../../../../src/order/checkout/shared/containers/payments/process/TossPaymentsProcessContainer';
import { TossPaymentsPostProcessPageProps } from '../../../../../src/shared/interfaces';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function TossPaymentsProcessPage(props: TossPaymentsPostProcessPageProps) {
  const { isReady } = useAppToken({ accessToken: props.accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <TossPaymentsProcessContainer isGiftOrder {...props} />;
}

export const getServerSideProps = getServerSideTossPaymentsProps();
