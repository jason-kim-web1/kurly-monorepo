import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { startsWith } from 'lodash';

import Alert from '../src/shared/components/Alert/Alert';

import { isPC } from '../util/window/getDevice';

export default function NotFoundPage() {
  const router = useRouter();

  const isGiftPath = useMemo(() => startsWith(router.asPath, '/gift'), [router.asPath]);

  useEffect(() => {
    const path = isPC ? '/shop/main/error.php' : '/m2/error.php';
    if (isPC && isGiftPath) {
      Alert({
        text: '모바일 기기에서 확인할 수 있습니다.',
      }).then(() => {
        window.location.assign('/');
      });
      return;
    }
    window.location.assign(path);
  }, [isGiftPath]);

  return null;
}
