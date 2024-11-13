import { useMemo } from 'react';

import { OrderDetail } from '../interface/OrderDetail';
import useOrderDetailQuery from '../queries/useOrderDetailQuery';
import useCheckProductReAddMutation from '../queries/useCheckProductReAddMutation';
import { useThrottle } from '../../common/hooks/useThrottle';

const useReAddAllButton = (groupOrderNo: OrderDetail['groupOrderNo']) => {
  const { throttleWithPromise } = useThrottle();
  const { data: orderDetail } = useOrderDetailQuery(groupOrderNo);
  const isAllDefaultOrderProducts = useMemo(() => {
    return orderDetail?.deliveryGroups
      .flatMap((group) => group.dealProducts.map((product) => product.isAddBackToCart || false))
      .every((isAddBackToCart) => isAddBackToCart);
  }, [orderDetail?.deliveryGroups]);

  const { mutateAsync, isLoading: isLoadingToMutate } = useCheckProductReAddMutation({ groupOrderNo });

  const handleClick = () => throttleWithPromise(mutateAsync, 500);

  return {
    handleClick,
    isAllDefaultOrderProducts,
    isLoadingToMutate,
  };
};

export default useReAddAllButton;
