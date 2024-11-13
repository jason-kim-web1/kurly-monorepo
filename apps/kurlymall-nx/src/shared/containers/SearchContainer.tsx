import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { ADDRESS_PATH, getPageUrl } from '../constant';
import useShippingAddress from '../../cart/shared/hooks/useShippingAddress';

import Address from '../components/Address/Address';
import { redirectTo } from '../reducers/page';
import { DeliveryProps } from '../interfaces/ShippingAddress';

export default function SearchContainer() {
  const { updateSearchAddress } = useShippingAddress();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (result: DeliveryProps) => {
    await updateSearchAddress(result);

    dispatch(
      redirectTo({
        url: getPageUrl(ADDRESS_PATH.result),
        query: router.query,
      }),
    );
  };

  return <Address onSubmit={onSubmit} />;
}
