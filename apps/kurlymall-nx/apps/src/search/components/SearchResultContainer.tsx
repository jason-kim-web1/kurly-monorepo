import styled from '@emotion/styled';

import Keywords from './keywords/Keywords';
import { PageStatus } from '../hooks/usePageStatus';
import { useSearchData } from '../contexts/SearchDataProvider';
import SearchProductList from './search-result/SearchProductList';
import { ImpressionPolicyContextProvider } from '../../shared/context/ImpressionPolicyContext';
import DirectSearchProducts from './direct-products/DirectSearchProducts';

interface Props {
  onClickKeyword: (keyword: string) => void;
  pageStatus?: PageStatus;
  keyword: string;
  isSearching: boolean;
}

const ListContainer = styled.div`
  margin: 0 auto;
`;

export default function SearchResultContainer({ pageStatus, keyword, isSearching, onClickKeyword }: Props) {
  const { searchKeyword: sword } = useSearchData();
  const handleClickKeyword = (searchKeyword: string) => {
    onClickKeyword(searchKeyword);
  };

  if (!pageStatus) {
    return null;
  }

  return (
    <>
      {pageStatus === 'keywords' ? <Keywords isSearching={isSearching} onClickKeyword={handleClickKeyword} /> : null}
      {pageStatus === 'suggestion' ? <DirectSearchProducts keyword={keyword} /> : null}
      {pageStatus === 'listContainer' && sword ? (
        <ListContainer id="container">
          <ImpressionPolicyContextProvider>
            <SearchProductList />
          </ImpressionPolicyContextProvider>
        </ListContainer>
      ) : null}
    </>
  );
}
