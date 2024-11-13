import useToggle from '../../checkout/shared/hooks/useToggle';
import { DealProducts } from '../../common/interface/DealProduct';

export const MAX_PREVIEW_ITEMS = 3;

export function useOrderItemContent({ dealProducts }: { dealProducts: DealProducts }) {
  const { isOpen, toggle } = useToggle();

  const totalQuantity = dealProducts.length;
  const buttonText = `총 ${totalQuantity}건 주문 ${isOpen ? '접기' : '펼쳐보기'}`;
  const isShowPreviewItems = totalQuantity > MAX_PREVIEW_ITEMS;
  const orderItems = isShowPreviewItems ? dealProducts.slice(0, MAX_PREVIEW_ITEMS) : dealProducts;
  const moreItems = dealProducts.slice(MAX_PREVIEW_ITEMS, totalQuantity);

  return {
    isOpen,
    toggle,
    totalQuantity,
    isShowPreviewItems,
    buttonText,
    orderItems,
    moreItems,
  };
}
