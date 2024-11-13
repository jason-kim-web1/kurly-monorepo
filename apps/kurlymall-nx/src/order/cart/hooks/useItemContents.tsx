import { getDetailUrl } from '../utils/getDetailUrl';
import { CartProduct } from '../interface/CartProduct';
import { CART_DELIVERY_GROUP, CartDeliveryGroup } from '../constants/CartDeliveryGroup';

export default function useItemContents({
  type,
  product: { contentsProductNo, dealProductName, contentsProductName },
}: {
  type: CartDeliveryGroup;
  product: CartProduct;
}) {
  const subTitle = contentsProductName === dealProductName ? '' : contentsProductName;

  const detailUrl = getDetailUrl(contentsProductNo);

  const isShowStorageTag = type === CART_DELIVERY_GROUP.KURLY;

  return {
    subTitle,
    detailUrl,
    isShowStorageTag,
  };
}
