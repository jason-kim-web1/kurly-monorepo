import { isUndefined } from 'lodash';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { css } from '@emotion/react';

import useOrderList from '../hook/useOrderList';

import { EMPTY_TEXT, ERROR_TEXT } from '../constants/status';
import { Empty } from './Empty';
import Loading from './Loading';
import { isPC } from '../../../../util/window/getDevice';
import PullToRefreshNew from '../../../shared/components/PullToRefresh/m/PullToRefreshNew';
import Progress from '../../../shared/icons/kpds/progress';

import { ScrollTopButton } from './ScrollTopButton';
import GroupOrderItem from './GroupOrderItem';
import { FILTER_VISIBLE_TOP, ORDER_FILTER_HEADER } from '../constants/order-list';

const LastBlockObserver = styled.div`
  width: 100%;
  height: 1px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${vars.spacing.$8};
  margin-top: -${vars.spacing.$8};
`;

const ListContainer = styled.div`
  padding: ${isPC
    ? `${vars.spacing.$20} 0 0`
    : `${vars.spacing.$16} ${vars.spacing.$16} calc(env(safe-area-inset-bottom) + ${vars.spacing.$16})`};
`;

const Wrapper = styled.div`
  background-color: ${vars.color.background.$background2};

  ${!isPC &&
  css`
    min-height: calc(100vh - ${ORDER_FILTER_HEADER + FILTER_VISIBLE_TOP}px);
  `}
`;

interface Props {
  filterName: string;
  filterValue: string;
}

export default function GroupOrderList({ filterName, filterValue }: Props) {
  const {
    orderList,
    isLoading,
    isError,
    isLastPage,
    isEmptyOrderList,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    moveToBestProducts,
  } = useOrderList({
    month: filterValue,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      (async () => {
        await fetchNextPage();
      })();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, isLoading]);

  if (isLoading || isUndefined(orderList)) {
    return <Loading />;
  }

  if (isError) {
    return <Empty text={ERROR_TEXT} onClick={refetch} />;
  }

  if (isEmptyOrderList) {
    return <Empty text={EMPTY_TEXT} period={filterName} onClick={moveToBestProducts} />;
  }

  return (
    <Wrapper>
      <PullToRefreshNew onRefresh={refetch}>
        <ListContainer>
          {orderList.map((order) => (
            <GroupOrderItem key={order.groupOrderNo} order={order} />
          ))}
        </ListContainer>
        {isFetchingNextPage && (
          <LoadingWrapper>
            <Progress type="normal" />
          </LoadingWrapper>
        )}
      </PullToRefreshNew>
      {!isLastPage && <LastBlockObserver ref={ref} />}
      <ScrollTopButton />
    </Wrapper>
  );
}
