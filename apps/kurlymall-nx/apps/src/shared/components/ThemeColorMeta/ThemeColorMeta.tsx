import Head from 'next/head';

import { useMemo } from 'react';

import COLOR from '../../constant/colorset';

import { useAppSelector } from '../../store';
import useSpecificPageColor from '../../hooks/useSpecificPageColor';

interface Props {
  isHiddenHeader?: boolean;
  isSearchResultPage?: boolean;
}

export function ThemeColorMeta({ isHiddenHeader, isSearchResultPage }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { isSpecificPageColor } = useSpecificPageColor();

  const siteColor = useMemo(() => {
    if (isSearchResultPage || (isHiddenHeader && !isSearchResultPage)) {
      return COLOR.kurlyWhite;
    }
    return site === 'MARKET' ? COLOR.kurlyPurple : COLOR.kurlyWhite;
  }, [isHiddenHeader, isSearchResultPage, site]);

  return (
    <>
      {isSpecificPageColor && (
        <Head>
          <meta name="theme-color" content={siteColor} />
        </Head>
      )}
    </>
  );
}
