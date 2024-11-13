import { ReactNode, useEffect } from 'react';

import { amplitudeService } from '../../../shared/amplitude';
import { useAppSelector } from '../../../shared/store';
import { convertMainSiteToSiteName } from '../../util/mainSiteUtil';

interface Props {
  isMain: boolean;
  children: ReactNode;
}

export default function AmplitudeMainSite({ isMain, children }: Props) {
  const { site } = useAppSelector(({ main }) => main);

  useEffect(() => {
    if (!isMain) {
      return;
    }

    const siteName = convertMainSiteToSiteName(site);
    const bucket = amplitudeService.bucketInstance();
    bucket.updateBrowseSiteName(siteName);
  }, [isMain, site]);

  return <>{children}</>;
}
