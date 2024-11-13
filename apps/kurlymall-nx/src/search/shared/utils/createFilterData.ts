import { sentryCaptureError } from '../../../shared/services';
import type { FilterValue } from '../types';
import type { FilterSectionItem } from '../../features/Section/factory';

const aggregateFilter = (aggregationKey: string, filterValues: Map<string, string[]>, valueKey: string) => {
  if (filterValues.has(aggregationKey)) {
    const aggregatedValues = filterValues.get(aggregationKey);

    if (aggregatedValues) {
      return filterValues.set(aggregationKey, [...aggregatedValues, valueKey]);
    }

    return filterValues;
  }

  return filterValues.set(aggregationKey, [valueKey]);
};

const createGroupByInitialCharacter = (filterSectionItem: FilterSectionItem) =>
  filterSectionItem.values.reduce((filterValues: Map<string, string[]>, values) => {
    const { name, value: initialCharacter, key } = values;

    filterValues = aggregateFilter('전체', filterValues, key);

    if (initialCharacter >= 'A' && initialCharacter <= 'Z') {
      sentryCaptureError(`브랜드 필터 ${name}의 value 값이 대문자로 저장되어 있습니다.`);
    }

    if (initialCharacter.toLowerCase() >= 'a' && initialCharacter.toLowerCase() <= 'z') {
      return aggregateFilter('A-Z', filterValues, key);
    }

    if (initialCharacter === '') {
      return aggregateFilter('ETC', filterValues, key);
    }

    return aggregateFilter(initialCharacter, filterValues, key);
  }, new Map());

export const createFilterData = (filterSectionItem: FilterSectionItem) => {
  return {
    ...filterSectionItem,
    groupByKey: filterSectionItem.values.reduce((filterValues: { [key: string]: FilterValue }, item) => {
      const { key, name, value, productCounts, iconUrl } = item;
      filterValues = {
        ...filterValues,
        [key]: {
          key,
          name,
          value,
          productCounts,
          iconUrl,
        },
      };
      return filterValues;
    }, {}),
    groupByInitialCharacter: createGroupByInitialCharacter(filterSectionItem),
    keyList: filterSectionItem.values.map(({ key }) => key),
    sortedKeyList: [...filterSectionItem.values]
      .sort((a, b) => {
        if (a.productCounts > b.productCounts) {
          return -1;
        }
        if (a.productCounts < b.productCounts) {
          return 1;
        }
        return 0;
      })
      .map(({ key }) => key),
  };
};
