import { isValidElement, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { ListPageSkeleton } from './ListPageSkeleton';
import { usePolicy } from '../../hook/usePolicy';
import type { ProductListType } from '../../types';
import { Error, ListContainer } from './styled-components';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 480px;
  margin-top: 50px;
  margin-bottom: 75px;
  padding: 100px 0;
`;

interface Props {
  code: string;
  type: ProductListType;
}

export const ProductListPolicy = ({ code, type, children }: PropsWithChildren<Props>) => {
  const pageType = type === 'categories' ? 'categories' : 'collections';
  const { isError, isLoading } = usePolicy({ code, type });

  if (!isValidElement(children)) {
    return null;
  }

  if (isError) {
    return (
      <ListContainer>
        <ErrorWrapper>
          <Error />
        </ErrorWrapper>
      </ListContainer>
    );
  }

  if (isLoading) {
    return <ListPageSkeleton pageType={pageType} />;
  }
  return children;
};
