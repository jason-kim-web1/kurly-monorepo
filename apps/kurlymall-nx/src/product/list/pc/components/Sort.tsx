import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import { addComma } from '../../../../shared/services';
import { getDefaultPerPage } from '../../shared/util/getDefaultPerPage';

import { PageType, ProductAvailableSort } from '../../types';
import RecommendView from './RecommendView';

const ListAbility = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-bottom: 20px;
  line-height: 20px;
`;

const TotalPagingCount = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
`;

const SortList = styled.ul`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const SortItem = styled.li`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-left: 8px;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};

  &:first-of-type {
    &:before {
      display: none;
    }
  }

  &:before {
    content: '';
    display: flex;
    width: 1px;
    height: 10px;
    margin-right: 8px;
    background-color: ${COLOR.kurlyGray250};
  }
`;

const SortLink = styled.a<{ isCurrent: boolean }>`
  letter-spacing: -0.3px;
  ${({ isCurrent }) => (isCurrent ? `font-weight: 500; color: ${COLOR.kurlyGray800};` : '')}
  cursor: ${({ isCurrent }) => (isCurrent ? 'default' : 'pointer')};
`;

interface Props {
  totalProductsCount: number;
  defaultSortType: string;
  availableSort: ProductAvailableSort[];
  section: PageType;
  onSortingEvent: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeSortEvent: ({ type, name }: { type: string; name: string }) => void;
}

export default function Sort({
  totalProductsCount,
  defaultSortType,
  availableSort,
  section,
  onSortingEvent,
  onChangeSortEvent,
}: Props) {
  const router = useRouter();
  const { query } = router;
  const sortType = query?.sorted_type ?? defaultSortType;

  const defaultPerPage = getDefaultPerPage(section);

  const onChangeSort = (sort: ProductAvailableSort, event: MouseEvent) => {
    const { type, name } = sort;

    if (sortType === type) {
      event.preventDefault();
      return;
    }

    onSortingEvent(true);
    onChangeSortEvent({ type, name });
    window.scrollTo(0, 0);
  };

  return (
    <ListAbility>
      <TotalPagingCount>{`총 ${addComma(totalProductsCount)}건`}</TotalPagingCount>
      <SortList>
        {availableSort.map((it) => (
          <SortItem key={it.type}>
            <Link
              href={{
                pathname: router.pathname,
                query: {
                  ...query,
                  page: '1',
                  per_page: query.per_page || defaultPerPage.toString(),
                  sorted_type: it.type,
                },
              }}
              passHref
            >
              <SortLink isCurrent={it.type === sortType} onClick={(event) => onChangeSort(it, event)}>
                {it.name}
              </SortLink>
            </Link>
            {it.name === '추천순' ? <RecommendView section={section} /> : null}
          </SortItem>
        ))}
      </SortList>
    </ListAbility>
  );
}
