import { ElementType, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import TableLink from './Link';
import TableContents from './Contents';
import TableExpandLink from './ExpandLink';
import TableExpandView from './ExpandView';
import COLOR from '../../../../../shared/constant/colorset';
import Loading from '../../../../../shared/components/Loading/Loading';

interface TableListProps {
  isError?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
  LoadingElement?: ElementType;
  EmptyElement?: ElementType;
}

const Contents = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ContentsWrapper = styled.li`
  border-bottom: 1px solid ${COLOR.bg};
  > * {
    display: flex;
    flex: 1;
  }
`;

const TableInfoContents = styled.div`
  width: 100%;
  display: flex;
  height: 450px;
  justify-content: center;
  align-items: center;
  color: ${COLOR.kurlyGray800};
  text-align: center;
`;

const ListMain = ({
  children,
  isError,
  isLoading,
  isEmpty,
  LoadingElement,
  EmptyElement,
}: PropsWithChildren<TableListProps>) => {
  if (isError) {
    return <TableInfoContents>일시적인 오류로 정보를 불러올 수 없습니다</TableInfoContents>;
  }

  if (isLoading) {
    if (LoadingElement) {
      return <LoadingElement />;
    }
    return <Loading />;
  }

  if (isEmpty) {
    if (EmptyElement) {
      return <EmptyElement />;
    }
    return <TableInfoContents>데이터가 존재하지 않습니다.</TableInfoContents>;
  }

  return <Contents>{children}</Contents>;
};

export const List = Object.assign(ListMain, {
  Link: TableLink,
  Contents: TableContents,
  ContentsWrapper,
  ExpandLink: TableExpandLink,
  ExpandView: TableExpandView,
});
