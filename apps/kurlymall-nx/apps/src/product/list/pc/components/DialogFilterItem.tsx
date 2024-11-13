import styled from '@emotion/styled';

import type { FilterTemplate, FilterValue } from '../../types';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import FilterContent from './FilterContent';

const FilterValueContainer = styled.li`
  display: flex;
  flex: 0 0 calc(100% / 3);
  height: 36px;
  align-items: center;
  padding-right: 22px;
  margin-bottom: 0;
  cursor: pointer;
`;

interface Props {
  activeFilter: UrlBasedFilter;
  filterGroupKey: string;
  template: FilterTemplate;
  filter: FilterValue;
  isActive: boolean;
  handleDialogFilterItem: (
    filterGroupKey: string,
    template: FilterTemplate,
    filterKey: string,
    isActive: boolean,
  ) => void;
}

export default function DialogFilterItem({
  filterGroupKey,
  template,
  filter,
  isActive,
  handleDialogFilterItem,
}: Props) {
  const { name, key, productCounts, iconUrl } = filter;

  return (
    <FilterValueContainer onClick={() => handleDialogFilterItem(filterGroupKey, template, key, isActive)}>
      <FilterContent
        template={template}
        isActive={isActive}
        name={name}
        productCounts={productCounts}
        iconUrl={iconUrl}
      />
    </FilterValueContainer>
  );
}
