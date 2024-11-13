import { useAppSelector } from '../../../store';

import AddressResult from '../../../components/Address/m/AddressResult';
import useShippingAddressResult from '../../../../cart/shared/hooks/useShippingAddressResult';

export default function ResultContainer() {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const { loading, searchAddressResult, isEmptyAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const { changeAddress, saveAddress } = useShippingAddressResult();

  return (
    <AddressResult
      loading={loading}
      isGuest={isGuest}
      isEmptyAddress={isEmptyAddress}
      searchAddressResult={searchAddressResult}
      onChangeAddress={changeAddress}
      onClick={saveAddress}
    />
  );
}
