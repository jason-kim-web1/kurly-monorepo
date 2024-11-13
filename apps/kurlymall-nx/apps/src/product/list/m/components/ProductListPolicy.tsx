import { isValidElement, PropsWithChildren } from 'react';

import Loading from '../../../../shared/components/Loading/Loading';
import { usePolicy } from '../../hook/usePolicy';
import type { ProductListType } from '../../types';
import { Error, ListContainer } from './styled-components';

interface Props {
  code: string;
  type: ProductListType;
}

export const ProductListPolicy = ({ code, type, children }: PropsWithChildren<Props>) => {
  const { isError, isLoading } = usePolicy({ code, type });

  if (!isValidElement(children)) {
    return null;
  }

  if (isError) {
    return (
      <ListContainer>
        <Error />
      </ListContainer>
    );
  }

  if (isLoading) {
    return <Loading />;
  }
  return children;
};
