import ListContainer from '../../../src/shared/containers/pc/address/ListContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

export default function ShippingAddressListPage() {
  useScreenName(ScreenName.SIMPLE_SHIPPING_ADDRESS_LIST);

  return <ListContainer />;
}
