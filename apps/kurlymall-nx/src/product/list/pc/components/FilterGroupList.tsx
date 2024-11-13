import styled from '@emotion/styled';

import { FilterGroup } from '../../types';
import FilterGroupItem from './FilterGroupItem';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';

const GroupList = styled.div``;

interface Props {
  filterData: FilterGroup[];
  activeFilter: UrlBasedFilter;
}

export default function FilterGroupList({ filterData, activeFilter }: Props) {
  return (
    <GroupList>
      {filterData.map((filterGroup) => (
        <FilterGroupItem key={filterGroup.key} filterGroup={filterGroup} activeFilter={activeFilter} />
      ))}
    </GroupList>
  );
}
