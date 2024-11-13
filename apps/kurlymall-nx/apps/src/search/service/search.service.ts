import { CancelToken } from 'axios';
import { chain, head, isEmpty, range, size } from 'lodash';

import { fetchKeywords, KeywordsResponseData } from '../../shared/api/search/keywords';
import { fetchDirectSearchOfKeyword } from '../../shared/api/search/recommendResult';
import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { SearchParam, RecommendProduct, CountSearchProductParam } from '../shared/types';
import { fetchFilteredSearchProductsCount, fetchNormalSearch } from '../../shared/api/search/searchData';
import { SECTION_TYPE } from '../shared/constants';
import type { NormalSearchResultMeta } from '../types';
import { isDefined, isNotNull } from '../../shared/utils/lodash-extends';
import { SectionViewModelFactory, UnSpecifiedSection, UnSpecifiedSectionList } from '../features/Section/factory';

const getKeywords = async (site: MainSite, cancelToken?: CancelToken): Promise<KeywordsResponseData> => {
  const data = await fetchKeywords(site, cancelToken);
  return data;
};

const getNewProduct = (newProducts: RecommendProduct[]) => {
  if (isEmpty(newProducts)) {
    return undefined;
  }
  return head(newProducts);
};

const getSuggestedKeywords = async (keyword: string, site: MainSite, cancelToken?: CancelToken) => {
  const { autoCompleteKeywords, newProducts, products } = await fetchDirectSearchOfKeyword(keyword, site, cancelToken);
  const newProduct = getNewProduct(newProducts);
  return { autoCompleteKeywords, newProduct, products };
};

const getSearchProductsCount = async (param: CountSearchProductParam): Promise<number> => {
  const data = await fetchFilteredSearchProductsCount(param);
  return data.count;
};

type SectionMeta = {
  position: number;
  type: string;
};

const parseSection = (section: UnSpecifiedSection, meta: SectionMeta): UnSpecifiedSection | null => {
  try {
    return SectionViewModelFactory.getSection(section, meta);
  } catch (error) {
    return null;
  }
};

const isValid = <T>(arg: T | null | undefined): arg is T => isNotNull(arg) && isDefined(arg);

const parseSectionList = (sectionList: UnSpecifiedSectionList, sectionType: string): UnSpecifiedSectionList =>
  chain(range(size(sectionList)))
    .map((index) =>
      parseSection(sectionList[index], {
        position: index + 1,
        type: sectionType,
      }),
    )
    .filter(isValid)
    .value();

type NormalSearchResultViewModel = {
  meta: NormalSearchResultMeta;
  topSections: UnSpecifiedSectionList;
  listSections: UnSpecifiedSectionList;
  filterSections: UnSpecifiedSectionList;
  sortSections: UnSpecifiedSectionList;
};

const getNormalSearchResult = async (param: SearchParam): Promise<NormalSearchResultViewModel> => {
  const data = await fetchNormalSearch(param);
  const {
    data: { meta, listSections, topSections, filterSections, sortSections },
  } = data;
  return {
    meta,
    sortSections: parseSectionList(sortSections, SECTION_TYPE.SORT),
    filterSections: parseSectionList(filterSections, SECTION_TYPE.FILTER),
    topSections: parseSectionList(topSections, SECTION_TYPE.TOP),
    listSections: parseSectionList(listSections, SECTION_TYPE.LIST),
  };
};

export { getKeywords, getSuggestedKeywords, getSearchProductsCount, getNormalSearchResult };
export type { NormalSearchResultViewModel };
