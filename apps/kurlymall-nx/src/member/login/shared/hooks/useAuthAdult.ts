import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ParsedUrlQuery } from 'querystring';

const useAuthAdult = () => {
  const router = useRouter();

  const { authAdult } = router.query as ParsedUrlQuery & { authAdult: string };
  const isAdultLogin = useMemo(() => authAdult === 'true' || authAdult === '1', [authAdult]);

  return {
    isAdultLogin,
  };
};

export default useAuthAdult;
