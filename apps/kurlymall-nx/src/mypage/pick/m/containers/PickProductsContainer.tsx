import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAppSelector } from '../../../../shared/store';
import usePickListQuery from '../../hooks/usePickListQuery';
import Repeat from '../../../../shared/components/Repeat';
import ProductItemPending from '../../m/components/ProductItemPending';
import PickList from '../components/PickList';
import ProductEmpty from '../components/ProductEmpty';

export default function PickProductsContainer() {
  const { isReady } = useRouter();

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const { pickList, pickListSize, isPickListEmpty, isLoading, isError, refetch } = usePickListQuery();

  const renderPickList = () => {
    if (isError) {
      return <ProductEmpty isPC={false} isError={isError} />;
    }

    if (!isLoading && isPickListEmpty) {
      return <ProductEmpty isPC={false} />;
    }

    if (!isLoading) {
      return <PickList isPC={false} products={pickList} count={pickListSize} />;
    }

    return (
      <Repeat count={10}>
        <ProductItemPending isPC={false} />
      </Repeat>
    );
  };

  useEffect(() => {
    if (isReady && hasSession) {
      refetch();
    }
  }, [hasSession, isReady, refetch]);

  return renderPickList();
}
