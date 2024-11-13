import type { FilterGroup } from '../../types';
import type { UrlBasedFilter } from './parseFilterData';

interface Props {
  activeFilter: UrlBasedFilter;
  filterData: FilterGroup[];
}

export default function getValidatedFiltersAndUrlFilters({ activeFilter, filterData }: Props) {
  const validatedFilters = Object.entries(activeFilter)
    .map(([key, value]) => {
      const selectedFilterGroup = filterData.find((filterGroup) => filterGroup.key === key);

      if (!selectedFilterGroup) {
        return;
      }

      const validatedFilterValue = value.filter((urlFilterValue) =>
        selectedFilterGroup.keyList.includes(urlFilterValue),
      );

      if (validatedFilterValue.length <= 0) {
        return;
      }

      return `${key}:${validatedFilterValue.join(',')}`;
    })
    .filter(Boolean);

  const urlFilters = Object.entries(activeFilter).map((filter) => filter.join(':'));

  return { validatedFilters, urlFilters };
}
