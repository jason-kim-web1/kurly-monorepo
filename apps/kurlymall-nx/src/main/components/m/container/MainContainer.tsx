import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainSectionListContainer from '../../../containers/m/MainSectionListContainer';
import PopupNoticeContainer from './PopupNoticeContainer';
import SnowEffect from '../../../../shared/components/Config/Effects/SnowEffect';
import { initializeMainSection } from '../../../../main/slice';
import { useAppSelector } from '../../../../shared/store';
import PullToRefreshNew from '../../../../shared/components/PullToRefresh/m/PullToRefreshNew';
import { PULL_TO_REFRESH_MAIN_TOP } from '../../../../shared/constant/pull-to-refresh-margin-top';

export default function MainContainer() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const dispatch = useDispatch();

  const handleRefresh = useCallback(async () => {
    dispatch(initializeMainSection());
  }, [dispatch]);

  useEffect(() => {
    if (!hasSession) {
      return;
    }
    dispatch(initializeMainSection());
  }, [dispatch, hasSession]);

  return (
    <>
      <SnowEffect />
      <PopupNoticeContainer />

      <PullToRefreshNew onRefresh={handleRefresh} marginTop={PULL_TO_REFRESH_MAIN_TOP}>
        <MainSectionListContainer />
      </PullToRefreshNew>
    </>
  );
}
