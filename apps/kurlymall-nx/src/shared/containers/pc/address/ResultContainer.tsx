import { useAppSelector } from '../../../store';

import AddressResult from '../../../components/Address/pc/AddressResult';
import useShippingAddressResult from '../../../../cart/shared/hooks/useShippingAddressResult';

export default function ResultContainer() {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const { loading, searchAddressResult, isEmptyAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const { changeAddress, researchAddress, saveAddress } = useShippingAddressResult();

  return (
    <AddressResult
      loading={loading}
      isGuest={isGuest}
      isEmptyAddress={isEmptyAddress}
      searchAddressResult={searchAddressResult}
      onChangeAddress={changeAddress}
      onClickAddress={researchAddress}
      onClick={saveAddress}
    />
  );
}
