import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { isPC } from '../../../util/window/getDevice';
import Paths from '../constant/paths';
import { getVerifySiteColor } from '../components/PageMeta/getVerifySiteColor';

export default function useSpecificPageColor() {
  const router = useRouter();
  const [isSpecificPageColor, setIsSpecificPageColor] = useState(false);

  useEffect(() => {
    if (isPC) {
      return;
    }
    if (router) {
      const removedQueryAsPath = router.asPath.split('?')[0];
      const pathKey = Paths[removedQueryAsPath] || Paths[router.pathname];
      setIsSpecificPageColor(getVerifySiteColor(pathKey));
    }
  }, [router]);

  return {
    isSpecificPageColor,
  };
}
