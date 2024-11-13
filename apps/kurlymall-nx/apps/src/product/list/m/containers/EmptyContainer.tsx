import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import { ExclamationMark, Reset } from '../../../../shared/icons';

import type { PageType } from '../../types';

import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { emptyResultText } from '../../../../search/shared/constants';
import { redirectTo } from '../../../../shared/reducers/page';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
`;

const EmptyProduct = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  line-height: 21px;
  text-align: center;
`;

const EmptyText = styled.div`
  margin-top: 18px;
  white-space: pre-wrap;
`;

const ResetContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const ResetButton = styled.button`
  height: 44px;
  width: 138px;
  margin-top: 24px;
  border-radius: 22px;
  background-color: ${COLOR.kurlyPurple};
`;

const ResetText = styled.span`
  color: ${COLOR.kurlyWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-left: 6px;
`;

interface Props {
  section: PageType;
  activeFilter?: UrlBasedFilter;
}

export default function EmptyContainer({ section, activeFilter }: Props) {
  const router = useRouter();
  const { query, pathname } = router;

  const dispatch = useDispatch();

  const resetFilter = useCallback(() => {
    dispatch(
      redirectTo({
        url: pathname,
        query: {
          ...query,
          filters: null,
        },
        replace: true,
      }),
    );
  }, [pathname, query, dispatch]);

  const checkResultEmptyStatus = useMemo(() => {
    if (!isEmpty(activeFilter)) {
      return 'noneActiveFilter';
    }
    if (section === 'search') {
      return 'errorSearchResult';
    }
    return 'default';
  }, [activeFilter, section]);

  return (
    <Wrapper>
      {section === 'search' ? (
        <EmptyProduct>
          <ExclamationMark width={48} height={48} />
          <EmptyText>{emptyResultText[checkResultEmptyStatus]}</EmptyText>
        </EmptyProduct>
      ) : (
        <EmptyProduct>
          <ExclamationMark width={48} height={48} />
          <EmptyText>{emptyResultText[checkResultEmptyStatus]}</EmptyText>
        </EmptyProduct>
      )}
      {!isEmpty(activeFilter) ? (
        <ResetContainer>
          <ResetButton onClick={resetFilter}>
            <Reset width={14} height={14} stroke={COLOR.kurlyWhite} />
            <ResetText>필터 초기화</ResetText>
          </ResetButton>
        </ResetContainer>
      ) : null}
    </Wrapper>
  );
}
