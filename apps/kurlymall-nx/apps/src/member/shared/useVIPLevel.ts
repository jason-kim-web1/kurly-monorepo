import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { VipLevels, VipLevelType } from '../shared/constants';

const useVIPLevel = () => {
  const { query } = useRouter();
  const vipLevel = query.vipLevel as VipLevelType;

  const { isVIP, isVVIP, headerTitle } = useMemo(() => {
    return {
      isVVIP: vipLevel === VipLevels.VVIP,
      isVIP: vipLevel === VipLevels.VIP,
      headerTitle: `${vipLevel?.toUpperCase() || ''} 전용관`,
    };
  }, [vipLevel]);

  return {
    isVVIP,
    isVIP,
    vipLevel,
    headerTitle,
  };
};

export default useVIPLevel;
