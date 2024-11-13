import PhonebillProcessContainer, {
  getServerSidePhonebillProps,
} from '../../../../../src/order/checkout/shared/containers/payments/process/PhonebillProcessContainer';
import { PostProcessPageProps } from '../../../../../src/shared/interfaces';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import Loading from '../../../../../src/shared/components/Loading/Loading';

export default function PhonebillProcessPage(props: PostProcessPageProps) {
  const { isReady } = useAppToken({ accessToken: props.accessToken });

  if (!isReady) {
    return <Loading />;
  }

  return <PhonebillProcessContainer isMobilePage {...props} />;
}

export const getServerSideProps = getServerSidePhonebillProps();
