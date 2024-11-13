import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import MWInProgress from '../../../../../shared/m/components/InProgress';

interface Props {
  isMobilePage?: boolean;
}

export default function PgInitContainer({ isMobilePage = false }: Props) {
  const router = useRouter();

  const { url } = router.query as ParsedUrlQuery & { url: string };

  const movePage = useCallback(() => {
    if (router.isReady) {
      router.push(url);
    }
  }, [router, url]);

  useEffect(() => {
    movePage();
  }, [movePage]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress showTitleOnly />;
}
