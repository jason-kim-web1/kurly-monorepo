import { PostProcessPageProps } from '../../../../../src/shared/interfaces';
import KurlySuccessContainer from '../../../../order/checkout/success/kurly';

export default function KurlySuccessPage(props: PostProcessPageProps) {
  return <KurlySuccessContainer isMobilePage isGiftOrder {...props} />;
}
