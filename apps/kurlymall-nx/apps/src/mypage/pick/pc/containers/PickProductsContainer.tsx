import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useAppSelector } from '../../../../shared/store';
import usePickListQuery from '../../hooks/usePickListQuery';
import ProductEmpty from '../../m/components/ProductEmpty';
import PickList from '../../m/components/PickList';
import Repeat from '../../../../shared/components/Repeat';
import ProductItemPending from '../../m/components/ProductItemPending';

export default function PickProductsContainer() {
  const { isReady } = useRouter();

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const currentAddress = useAppSelector(({ shippingAddress }) => shippingAddress.currentAddress);

  const { pickList, pickListSize, isPickListEmpty, isError, isLoading, refetch } = usePickListQuery();

  const [address, setAddress] = useState(currentAddress?.address);

  const renderPickList = () => {
    if (isError) {
      return <ProductEmpty isError={isError} />;
    }

    if (!isLoading && isPickListEmpty) {
      return <ProductEmpty />;
    }

    if (!isLoading) {
      return <PickList products={pickList} count={pickListSize} />;
    }

    return (
      <Repeat count={10}>
        <ProductItemPending />
      </Repeat>
    );
  };

  useEffect(() => {
    if (isReady && hasSession) {
      refetch();
    }
  }, [hasSession, isReady, refetch]);

  useEffect(() => {
    if (address !== currentAddress?.address) {
      refetch().then(() => setAddress(currentAddress?.address));
    }
  }, [address, currentAddress?.address, refetch]);

  return renderPickList();
}
