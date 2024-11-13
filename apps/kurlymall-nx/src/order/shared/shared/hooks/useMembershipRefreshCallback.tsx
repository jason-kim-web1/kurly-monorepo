import { useCallback, useEffect, useState } from 'react';

import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { getSubscriptionMembers } from '../../../../shared/api/membership/membership.api';

export default function useMembershipRefreshCallback() {
  const [isLoading, setLoading] = useState(false);

  const handleMessageFromChildWebView = useCallback(async () => {
    setLoading(true);
    try {
      const { isSubscribed } = await getSubscriptionMembers();
      if (isSubscribed) {
        window.location.reload();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }

    window.MEMBERSHIP_REFRESH_CALLBACK = handleMessageFromChildWebView;
    return () => {
      window.MEMBERSHIP_REFRESH_CALLBACK = () => {
        return;
      };
    };
  }, [handleMessageFromChildWebView]);

  return { isMembershipLoading: isLoading };
}
