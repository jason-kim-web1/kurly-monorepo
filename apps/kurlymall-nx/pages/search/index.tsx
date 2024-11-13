import { useRouter } from 'next/router';
import { eq } from 'lodash';
import { useDispatch } from 'react-redux';

import { useScreenName } from '../../src/shared/hooks';
import { ScreenName } from '../../src/shared/amplitude';
import { SearchDataProvider } from '../../src/search/contexts/SearchDataProvider';
import { PcSearchPageContentContainer } from '../../src/search/components/pc/SearchPageContentContainer';
import { useIsomorphicLayoutEffect } from '../../src/shared/hooks/useIsomorphicLayoutEffect';
import { redirectTo } from '../../src/shared/reducers/page';
import { MainSite } from '../../src/main/interfaces/MainSection.interface';
import { getSanitizedMainSite, getSanitizedValue } from '../../src/shared/utils/getSanitizedValues';
import { MAIN_SITE } from '../../src/main/constants';
import { computeQueryValue } from '../../src/shared/utils/computeQueryValue';
import { USER_MENU_PATH } from '../../src/shared/constant';
import { checkEmptySearchKeyword } from '../../src/search/shared/utils/checkEmptySearchKeyword';
import PageMetaData from '../../src/shared/components/PageMeta/PageMetaData';
import { DEFAULT_KEYWORDS } from '../../src/shared/constant/page-meta';
import { getSearchServerSideProps, SearchPageProps } from '../../src/search/shared/getSearchServerSideProps';

const SearchPage = ({ meta }: SearchPageProps) => {
  useScreenName(ScreenName.SEARCH);
  const dispatch = useDispatch();
  const { query, isReady } = useRouter();
  const getTargetQuery = computeQueryValue(query);
  const siteQuery = getTargetQuery('site', MAIN_SITE.MARKET) as MainSite;
  const swordQuery = getTargetQuery('sword', '') as string;
  const isEmptySearchKeyword = checkEmptySearchKeyword(swordQuery);
  const site = getSanitizedValue<MainSite>({
    value: siteQuery,
    defaultValue: MAIN_SITE.MARKET,
    fn: getSanitizedMainSite,
  });
  const emptySearchFallbackPath = eq(site, MAIN_SITE.BEAUTY) ? USER_MENU_PATH.beautyHome.uri : USER_MENU_PATH.home.uri;

  useIsomorphicLayoutEffect(() => {
    if (!isReady || !isEmptySearchKeyword) {
      return;
    }
    dispatch(
      redirectTo({
        url: emptySearchFallbackPath,
      }),
    );
  }, [isEmptySearchKeyword, isReady]);

  return (
    <SearchDataProvider>
      <PageMetaData title={meta.title} description={meta.description} url={meta.url} keyword={DEFAULT_KEYWORDS} />
      {!isReady || isEmptySearchKeyword ? null : <PcSearchPageContentContainer />}
    </SearchDataProvider>
  );
};

export const getServerSideProps = getSearchServerSideProps;

export default SearchPage;
