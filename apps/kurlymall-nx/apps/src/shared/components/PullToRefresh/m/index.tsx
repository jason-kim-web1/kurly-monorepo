import PullToRefresh from 'react-simple-pull-to-refresh';

import styled from '@emotion/styled';

import PullToRefreshLoading from '../../Loading/PullToRefreshLoading';
import { isPC } from '../../../../../util/window/getDevice';

const LoadingWrapper = styled.div`
  padding-top: 10px;
`;

const Wrapper = styled(PullToRefresh)<{ marginTop: number }>`
  overflow: visible !important;
  margin-top: ${({ marginTop }) => (marginTop > 0 ? `${marginTop}px` : 0)};

  :before {
    content: '';
    display: block;
    height: 0;
    transition: height 0.4s cubic-bezier(0, 1, 1, 0);
  }

  &.ptr--pull-down-treshold-breached {
    :before {
      height: 100px;
      transition: height 0.5s;
    }
    .ptr__pull-down {
      width: 100%;
      opacity: 1;
      transition: unset;
    }
  }

  // 아이콘 영역
  .ptr__pull-down {
    pointer-events: none;
    transition: opacity 0.5s cubic-bezier(0, 1, 0, 1);
    > div {
      display: block !important;
    }
  }
  // 컨텐츠 영역
  > .ptr__children {
    overflow: visible !important;
  }
`;

export function PullToRefreshWrapper({
  children,
  marginTop = 0,
  onRefresh,
}: {
  children: JSX.Element;
  marginTop?: number;
  onRefresh: () => Promise<void>;
}) {
  if (isPC) {
    return <>{children}</>;
  }

  const refreshAnimation = () => {
    return (
      <LoadingWrapper>
        <PullToRefreshLoading />
      </LoadingWrapper>
    );
  };

  return (
    <Wrapper
      onRefresh={onRefresh}
      pullDownThreshold={70}
      maxPullDownDistance={70}
      pullingContent={''}
      refreshingContent={refreshAnimation()}
      marginTop={marginTop}
    >
      {children}
    </Wrapper>
  );
}
