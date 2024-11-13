import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

import { Filter } from '../../../../shared/icons';
import { UrlBasedFilter } from '../../shared/util/parseFilterData';

const FilterButtonWrapper = styled.button`
  display: flex;
  align-items: center;
`;

const FilterButtonText = styled.span<{ hasSelectedFilter: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-right: 2px;
  color: ${({ hasSelectedFilter }) => (hasSelectedFilter ? COLOR.loversLavender : COLOR.kurlyGray800)};
`;

const FilterNumber = styled.span`
  display: block;
  padding-right: 4px;
  font-size: 12px;
  color: ${COLOR.loversLavender};
`;

const activeFilterCount = (filter: UrlBasedFilter) => {
  return Object.values<string[]>(filter).reduce((acc, cur) => acc + cur.length, 0);
};

interface Props {
  urlBasedFilter?: UrlBasedFilter;
  onClick: () => void;
}

export default function FilterButton({ urlBasedFilter, onClick }: Props) {
  return (
    <FilterButtonWrapper onClick={onClick}>
      <FilterButtonText hasSelectedFilter={!isEmpty(urlBasedFilter)}>필터</FilterButtonText>
      {!!urlBasedFilter && Object.keys(urlBasedFilter).length > 0 ? (
        <FilterNumber>{activeFilterCount(urlBasedFilter)}</FilterNumber>
      ) : (
        <Filter />
      )}
    </FilterButtonWrapper>
  );
}
