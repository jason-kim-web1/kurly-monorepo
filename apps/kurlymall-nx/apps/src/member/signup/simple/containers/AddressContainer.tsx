import { useSelector } from 'react-redux';

import { AppState } from '../../../../shared/store';

import AddressBox from '../components/AddressBox';

export default function AddressContainer() {
  const { roadAddress, addressDetail } = useSelector(({ social }: AppState) => social.signup.form.addressInfomation);
  const address = `${roadAddress} ${addressDetail}`;

  return <AddressBox address={address} />;
}
