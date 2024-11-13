import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { Delete } from '../../../../shared/icons';
import type { ActiveFilterNameWithHref, FilterGroup } from '../../types';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { getActiveFilterList } from '../../shared/util/getActiveFilterList';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 20px 18px;
  border: 1px solid ${COLOR.kurlyGray200};
  margin-bottom: 31px;
`;

const ActiveFilterItem = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveFilterText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.loversLavender};
`;

const DeleteButtonLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface Props {
  filterData: FilterGroup[];
  activeFilter: UrlBasedFilter;
}

function ActiveFilterValueContainer({ filterData, activeFilter }: Props) {
  const router = useRouter();
  const { query, pathname } = router;
  const [activeFilterList, setActiveFilterList] = useState<ActiveFilterNameWithHref[]>();

  const handleRemoveFilter = () => {
    if (activeFilterList?.length === 1) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const activeList = getActiveFilterList({
      activeFilter,
      filterData,
      query,
      pathname,
      isMobile: false,
    });

    setActiveFilterList(activeList);
  }, [activeFilter, filterData, pathname, query]);

  if (isEmpty(activeFilterList)) {
    return null;
  }

  return (
    <Wrapper>
      {activeFilterList?.map(({ name, href }, index) => {
        return (
          <ActiveFilterItem key={`${name}-${index}`}>
            <ActiveFilterText>{name}</ActiveFilterText>
            <Link href={href} prefetch={false} passHref scroll={false}>
              <DeleteButtonLink onClick={handleRemoveFilter}>
                <Delete width={20} height={20} />
              </DeleteButtonLink>
            </Link>
          </ActiveFilterItem>
        );
      })}
    </Wrapper>
  );
}

export default ActiveFilterValueContainer;
