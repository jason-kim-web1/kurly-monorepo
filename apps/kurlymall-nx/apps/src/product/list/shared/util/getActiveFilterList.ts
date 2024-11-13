import type { ParsedUrlQuery } from 'querystring';
import type { ActiveFilterNameWithHref, MobileActiveFilterNameWithHref, FilterGroup } from '../../types';
import type { UrlBasedFilter } from './parseFilterData';
import { getFilterHref } from './getFilterHref';

interface Props {
  activeFilter: UrlBasedFilter;
  filterData: FilterGroup[];
  query: ParsedUrlQuery;
  pathname: string;
  isMobile: boolean;
}

interface PcProps extends Omit<Props, 'isMobile'> {
  isMobile: false;
}

interface MobileProps extends Omit<Props, 'isMobile'> {
  isMobile: true;
}

export function getActiveFilterList({
  activeFilter,
  filterData,
  query,
  pathname,
  isMobile,
}: PcProps): ActiveFilterNameWithHref[];
export function getActiveFilterList({
  activeFilter,
  filterData,
  query,
  pathname,
  isMobile,
}: MobileProps): MobileActiveFilterNameWithHref[];
export function getActiveFilterList({ activeFilter, filterData, query, pathname, isMobile }: Props) {
  return Object.entries<string[]>(activeFilter).reduce<MobileActiveFilterNameWithHref[] | ActiveFilterNameWithHref[]>(
    (acc, cur) => {
      const [groupKey, value] = cur;
      const selectedFilterGroup = filterData.find((originalFilter) => originalFilter.key === groupKey);

      if (!selectedFilterGroup) {
        return acc;
      }

      const isExclusion = groupKey === 'exclusion';

      const activeFilterData = value
        .filter((key) => selectedFilterGroup?.groupByKey[key]?.name !== undefined)
        .map((key) => {
          return {
            name: `${selectedFilterGroup?.groupByKey[key]?.name}${isExclusion ? ' 제외' : ''}`,
            href: getFilterHref({
              activeFilter,
              filterGroupKey: groupKey,
              template: selectedFilterGroup.template,
              filterKey: key,
              isActive: true,
              query,
              pathname,
            }),
            ...(isMobile && {
              groupKey,
              filterKey: key,
              template: selectedFilterGroup.template,
            }),
          };
        });

      return [...acc, ...activeFilterData];
    },
    [],
  );
}
