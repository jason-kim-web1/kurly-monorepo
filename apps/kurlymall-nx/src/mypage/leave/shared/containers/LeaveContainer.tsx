import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import LeaveFormContainer from '../../containers/pc/LeaveFormContainer';
import MobileLeaveForm from '../../containers/m/LeaveFormContainer';
import { clear } from '../../reducers/leave.slice';

export default function LeaveContainer() {
  const router = useRouter();
  const dispatch = useDispatch();

  const LeaveComponent = isPC ? LeaveFormContainer : MobileLeaveForm;

  useEffect(() => {
    const handleChangeStart = () => {
      dispatch(clear());
    };

    router.events.on('routeChangeStart', handleChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleChangeStart);
    };
  }, [dispatch, router.events]);

  return <>{router.isReady && <LeaveComponent />}</>;
}
