import { useSelector } from 'react-redux';

import Members from '../components/Members';

import { AppState } from '../../../../../shared/store';

export default function MembersContainer() {
  const { members } = useSelector((state: AppState) => state.find);

  return <Members members={members} />;
}
