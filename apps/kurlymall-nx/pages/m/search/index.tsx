import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import { SearchDataProvider } from '../../../src/search/contexts/SearchDataProvider';
import { SearchPageContentContainer } from '../../../src/search/containers/SearchPageContentContainer';
import { getSearchServerSideProps, SearchPageProps } from '../../../src/search/shared/getSearchServerSideProps';
import { DEFAULT_KEYWORDS } from '../../../src/shared/constant/page-meta';
import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';

const SearchPage = ({ meta }: SearchPageProps) => {
  useScreenName(ScreenName.SEARCH);

  return (
    <SearchDataProvider>
      <PageMetaData title={meta.title} description={meta.description} url={meta.url} keyword={DEFAULT_KEYWORDS} />
      <SearchPageContentContainer />
    </SearchDataProvider>
  );
};

export const getServerSideProps = getSearchServerSideProps;

export default SearchPage;
