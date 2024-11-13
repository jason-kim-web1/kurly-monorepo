import useCartDetail from '../../hooks/useCartDetail';
import CartLoading from '../CartLoading/CartLoading';
import CartEmpty from '../DeliveryGroupList/CartEmpty';
import DeliveryGroupContents from '../DeliveryGroupList/DeliveryGroupContents';

export default function DeliveryGroupList() {
  const { isCartEmpty, isLoading, cartDetail } = useCartDetail();

  if (isLoading || !cartDetail) {
    return <CartLoading />;
  }

  if (isCartEmpty) {
    return <CartEmpty />;
  }

  return <DeliveryGroupContents cartDetail={cartDetail} />;
}
