import styled from '@emotion/styled';
import type { QueryStatus } from '@tanstack/react-query';
import { get } from 'lodash';
import { useRef } from 'react';

import FilterContainer from '../../../product/list/pc/containers/FilterContainer';
import { initializeScroll } from '../../../product/list/pc/util/initializeScroll';
import { useSearchData } from '../../contexts/SearchDataProvider';
import type { NormalizedFilterGroup } from '../../shared/types';
import { DisplayMessage } from './DisplayMessage';
import SectionList from './SectionList';
import {
  isKeywordConvertInfoSectionViewModel,
  SortSectionViewModel,
  UnSpecifiedSectionList,
} from '../../features/Section/factory';
import { NormalSearchResultViewModel } from '../../service/search.service';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import { ImpressionPolicyContextProvider } from '../../../shared/context/ImpressionPolicyContext';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 1050px;
  margin-top: 50px;
  margin-bottom: 75px;
`;

interface Props {
  searchData?: NormalSearchResultViewModel;
  fetchStatus: QueryStatus;
  isFetchingProducts: boolean;
  filterData?: NormalizedFilterGroup[];
  topSections?: UnSpecifiedSectionList;
  listSections?: UnSpecifiedSectionList;
  sortSection?: SortSectionViewModel;
  totalProductsCount: number;
  availableSortType: string;
  hasConvertedKeyword: boolean;
}

export default function SearchList({
  searchData,
  fetchStatus,
  isFetchingProducts,
  filterData,
  topSections,
  listSections,
  sortSection,
  totalProductsCount,
  availableSortType,
  hasConvertedKeyword,
}: Props) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { searchKeyword, filters } = useSearchData();
  const shouldRenderTopSections = topSections && isNotEmpty(topSections);

  const scrollToTop = () => {
    initializeScroll({ refObject: headerRef });
  };

  return (
    <>
      {shouldRenderTopSections ? (
        <>
          {!hasConvertedKeyword ? <DisplayMessage searchKeyword={searchKeyword} headerRef={headerRef} /> : null}
          {topSections?.map((section) => {
            if (!isKeywordConvertInfoSectionViewModel(section)) {
              return null;
            }
            const { _id } = section;
            return (
              <DisplayMessage
                key={_id}
                displayMessage={{
                  type: get(section, 'data.type'),
                  header: {
                    keyword: get(section, 'data.headerKeyword', ''),
                    description: get(section, 'data.headerDescription', ''),
                  },
                  footer: {
                    keyword: get(section, 'data.footerKeyword', ''),
                    description: get(section, 'data.footerDescription', ''),
                  },
                }}
                searchKeyword={searchKeyword}
                headerRef={headerRef}
              />
            );
          })}
        </>
      ) : (
        <DisplayMessage searchKeyword={searchKeyword} headerRef={headerRef} />
      )}
      <Wrapper>
        <FilterContainer filterData={filterData} filterLoading={false} activeFilter={filters} />
        <ImpressionPolicyContextProvider>
          <SectionList
            code={searchKeyword}
            activeFilter={filters}
            defaultSortType={availableSortType}
            availableSort={sortSection?.data.items}
            filterData={filterData}
            topSections={topSections}
            listSections={listSections}
            meta={searchData?.meta}
            totalProductsCount={totalProductsCount}
            productListQueryStatus={fetchStatus}
            isFetchingProducts={isFetchingProducts}
            scrollToTop={scrollToTop}
          />
        </ImpressionPolicyContextProvider>
      </Wrapper>
    </>
  );
}
