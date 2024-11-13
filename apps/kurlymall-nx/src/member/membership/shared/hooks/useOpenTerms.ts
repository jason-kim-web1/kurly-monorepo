import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getMembershipQueryData, MEMBERS_BUTTON_ID } from '../constants';
import { useAppSelector } from '../../../../shared/store';
import { loadMemberLoading } from '../../../../shared/reducers/member';

function useOpenTerms() {
  const { isReady, query } = useRouter();
  const { hasSession } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const [isLegoLoaded, setIsLegoLoaded] = useState<boolean>(false);

  const showTerms = isReady && isLegoLoaded && getMembershipQueryData(query).showTerms && hasSession && !memberLoading;

  useEffect(() => {
    if (showTerms) {
      document.getElementById(MEMBERS_BUTTON_ID)?.click();
    }
  }, [showTerms]);

  return {
    setIsLegoLoaded,
  };
}

export default useOpenTerms;
