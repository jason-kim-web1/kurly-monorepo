import { useMemo } from 'react';
import { useRouter } from 'next/router';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import UserMenu from '../../../../../src/shared/components/layouts/UserMenu';
import MainSiteProvider from '../../../../../src/main/components/shared/MainSiteProvider';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import MainSubPageTitle from '../../../../../src/main/components/shared/MainSubPageTitle';
import { parseQueryString } from '../../../../../src/shared/utils/parseQueryString';
import { getMainSiteFromQueryString } from '../../../../../src/product/list/shared/util/getMainSiteFromQueryString';
import CarouselHorizontalContainer from '../../../../../src/main/containers/m/CarouselHorizontalContainer';
import { useScreenName } from '../../../../../src/shared/hooks';
import { ScreenName } from '../../../../../src/shared/amplitude';
import { useCarouselHorizontalBanner } from '../../../../../src/main/hooks/sections/useCarouselHorizontalBanner';
import { getParsedSectionId } from '../../../../../src/main/util/getParsedSectionId';

export default function CarouselHorizontalList() {
  useScreenName(ScreenName.CAROUSEL_LIST);
  const { query } = useRouter();
  const { site, sectionId } = parseQueryString(query);
  const mainSite = useMemo(() => getMainSiteFromQueryString(site), [site]);
  const parsedSectionId = getParsedSectionId(sectionId);
  const { title, isLoading, isError } = useCarouselHorizontalBanner({ site: mainSite, sectionId: parsedSectionId });
  return (
    <MainSiteProvider site={mainSite}>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>
          <MainSubPageTitle
            isLoading={isLoading}
            isError={isError}
            title={title}
            width={180}
            height={20}
            isPC={false}
          />
        </HeaderTitle>
      </MobileHeader>
      <CarouselHorizontalContainer site={mainSite} sectionId={Number(sectionId)} />
      <UserMenu />
    </MainSiteProvider>
  );
}
