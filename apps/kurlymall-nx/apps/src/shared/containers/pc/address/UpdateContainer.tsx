import { useAppSelector } from '../../../store';

import useShippingAddress from '../../../../cart/shared/hooks/useShippingAddress';

import AddressUpdate from '../../../components/Address/pc/AddressUpdate';

export default function UpdateContainer() {
  const { loading, selectedAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const { removeAddress, changeAddressDetail, updateMemberAddressDetail } = useShippingAddress();

  return (
    <AddressUpdate
      loading={loading}
      selectedAddress={selectedAddress}
      onChange={changeAddressDetail}
      onClickSave={updateMemberAddressDetail}
      onClickDelete={removeAddress}
    />
  );
}
