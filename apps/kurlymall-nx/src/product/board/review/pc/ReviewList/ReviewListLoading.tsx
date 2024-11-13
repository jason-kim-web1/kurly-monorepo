import Loading from '../../../../../shared/components/Loading/Loading';
import { FallbackView } from './FallbackView';

export default function ReviewListLoading() {
  return (
    <FallbackView>
      <Loading isAbsolute={true} />
    </FallbackView>
  );
}
