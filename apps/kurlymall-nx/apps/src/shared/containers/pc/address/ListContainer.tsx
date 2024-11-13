import { useAppSelector } from '../../../store';

import useShippingAddress from '../../../../cart/shared/hooks/useShippingAddress';

import AddressList from '../../../components/Address/pc/AddressList';

export default function ListContainer() {
  const { loading, addressList } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const { updateRecentAddress, moveAddressModifyPage, moveAddressAddPage } = useShippingAddress();

  return (
    <AddressList
      loading={loading}
      list={addressList ?? []}
      handleCreate={moveAddressAddPage}
      handleChecked={updateRecentAddress}
      handleUpdate={moveAddressModifyPage}
    />
  );
}
