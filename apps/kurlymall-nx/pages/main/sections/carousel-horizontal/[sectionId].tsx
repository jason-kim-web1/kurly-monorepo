import { useMemo } from 'react';
import { useRouter } from 'next/router';

import Header from '../../../../src/header/components/Header';
import Footer from '../../../../src/footer/components/Footer';
import MainSiteProvider from '../../../../src/main/components/shared/MainSiteProvider';
import CarouselHorizontalContainer from '../../../../src/main/containers/pc/CarouselHorizontalContainer';
import { getMainSiteFromQueryString } from '../../../../src/product/list/shared/util/getMainSiteFromQueryString';
import { parseQueryString } from '../../../../src/shared/utils/parseQueryString';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import { getParsedSectionId } from '../../../../src/main/util/getParsedSectionId';

export default function CarouselHorizontalList() {
  useScreenName(ScreenName.CAROUSEL_LIST);
  const { query } = useRouter();
  const { site, sectionId } = parseQueryString(query);
  const parsedSectionId = getParsedSectionId(sectionId);
  const mainSite = useMemo(() => getMainSiteFromQueryString(site), [site]);
  return (
    <MainSiteProvider site={mainSite}>
      <Header />
      <CarouselHorizontalContainer site={mainSite} sectionId={parsedSectionId} />
      <Footer />
    </MainSiteProvider>
  );
}
