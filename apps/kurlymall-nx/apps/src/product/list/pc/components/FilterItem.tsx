import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import Link from 'next/link';

import type { FilterTemplate, FilterValue } from '../../types';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import FilterContent from './FilterContent';
import { getFilterHref } from '../../shared/util/getFilterHref';

const FilterValueContainer = styled.li`
  list-style: none;
  margin-bottom: 18px;

  :first-of-type {
    display: inline-block;
    margin-top: 9px;
  }

  :last-of-type {
    margin-bottom: 21px;
  }
`;

const FilterContentContainer = styled.a();

interface Props {
  activeFilter: UrlBasedFilter;
  filterGroupKey: string;
  template: FilterTemplate;
  filter: FilterValue;
  isActive: boolean;
}

export default function FilterItem({ activeFilter, filterGroupKey, template, filter, isActive }: Props) {
  const { query, pathname } = useRouter();
  const { name, key, productCounts, iconUrl } = filter;

  const href = getFilterHref({
    activeFilter,
    filterGroupKey,
    template,
    filterKey: key,
    isActive,
    query,
    pathname,
  });

  return (
    <FilterValueContainer>
      <Link href={href} prefetch={false} scroll={false} passHref>
        <FilterContentContainer>
          <FilterContent
            template={template}
            isActive={isActive}
            name={name}
            productCounts={productCounts}
            iconUrl={iconUrl}
          />
        </FilterContentContainer>
      </Link>
    </FilterValueContainer>
  );
}
