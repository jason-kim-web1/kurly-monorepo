import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import useAddressListQuery, { MYPAGE_ADDRESS_QUERY_KEY } from '../../hooks/useAddressListQuery';
import Loading from '../../../../shared/components/Loading/Loading';

import { notify } from '../../../../shared/reducers/page';
import { RETIRED_ADDRESS_ALERT_TEXT } from '../../../../shared/constant';
import AddressItemList from '../../../../shared/components/Address/AddressItemList';
import useAddressHandler from '../../hooks/useAddressHandler';

export default function ListItemContainer({ modifyAddress }: { modifyAddress: (no: number) => void }) {
  const dispatch = useDispatch();
  const { data, isLoading, isDefaultRetiredAddress } = useAddressListQuery();

  const { onUpdateRecentAddress } = useAddressHandler();

  useEffect(() => {
    if (isDefaultRetiredAddress) {
      dispatch(notify(RETIRED_ADDRESS_ALERT_TEXT));
    }
  }, [dispatch, isDefaultRetiredAddress]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul>
      {data?.map((info, index) => (
        <AddressItemList
          key={`${MYPAGE_ADDRESS_QUERY_KEY.join('')}-${index}`}
          addressItem={info}
          onChangeChecked={() => onUpdateRecentAddress(info.no, info.isCurrentDeliveryAddress)}
          onClickUpdate={() => modifyAddress(info.no)}
        />
      ))}
    </ul>
  );
}
