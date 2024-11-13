import { isEmpty } from 'lodash';

import useCurrentAddress from '../../../common/hooks/useCurrentAddress';
import CurrentAddress from './CurrentAddress';
import EmptyAddress from './EmptyAddress';

export default function AddressContents() {
  const { data: currentAddress } = useCurrentAddress();

  if (!currentAddress) {
    return null;
  }

  if (isEmpty(currentAddress.address)) {
    return <EmptyAddress />;
  }

  return <CurrentAddress />;
}
