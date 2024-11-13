import { useEffect } from 'react';

import { doLogout } from '../../../src/member/logout/shared';

export default function LogoutPage() {
  useEffect(() => {
    doLogout();
  }, []);

  return null;
}
