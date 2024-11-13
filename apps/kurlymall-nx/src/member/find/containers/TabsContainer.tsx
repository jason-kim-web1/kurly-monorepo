import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../../../shared/components/Alert/Alert';

import Tabs from '../../../shared/components/layouts/Tabs';

import { AppState } from '../../../shared/store';
import { selectTab } from '../reducers/find.slice';

const tabs = ['휴대폰 인증', '이메일 인증'];

interface Props {
  hasHeader?: boolean;
}

export default function TabsContainer({ hasHeader = false }: Props) {
  const dispatch = useDispatch();
  const { selectedTab, idByPhone, passwordByPhone } = useSelector((state: AppState) => state.find);

  const handleChange = useCallback(
    async (value: string) => {
      if (
        selectedTab === '휴대폰 인증' &&
        value === '이메일 인증' &&
        (idByPhone.status === 'SENT' || passwordByPhone.status === 'SENT')
      ) {
        const { isConfirmed } = await Alert({
          text: '이메일 인증 화면으로 이동하시겠습니까? 입력하신 휴대폰 인증 정보는 초기화됩니다.',
          showCancelButton: true,
        });
        if (isConfirmed) {
          dispatch(selectTab(value));
        }
        return;
      }

      dispatch(selectTab(value));
    },
    [dispatch, idByPhone.status, passwordByPhone.status, selectedTab],
  );

  return <Tabs hasHeader={hasHeader} selectedTab={selectedTab} tabs={tabs} onChange={handleChange} />;
}
