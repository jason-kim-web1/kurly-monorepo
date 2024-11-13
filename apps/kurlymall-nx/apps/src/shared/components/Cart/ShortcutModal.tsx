import { getContentsSoldOutGuideText } from '../../../product/detail/shared/utils/productDetailState';
import useProductBuy from '../../../product/detail/hooks/useProductBuy';
import CartOptionModal from '../../../product/detail/m/components/buyFooter/cart-option/CartOptionModal';
import { useSearchData } from '../../../search/contexts/SearchDataProvider';
import { useProductDetail } from '../../../product/detail/hooks/useProductDetail';
import type { ProductDetailState } from '../../../product/detail/slice';

interface Props {
  onChangeSoldOutStatus?(): void;
  isShortcutButton: boolean;
  productCode: number;
  referrerProductName?: string;
  referrerProductNo?: number;
}

type ShortcutModalContentProps = Props & {
  product: ProductDetailState;
};

const ShortcutModalContent = ({
  onChangeSoldOutStatus,
  isShortcutButton,
  product,
  referrerProductName,
  referrerProductNo,
}: ShortcutModalContentProps) => {
  const { searchKeyword } = useSearchData();
  const {
    no,
    mainImageUrl,
    shortDescription,
    isSoldOut,
    isDirectOrder,
    isPurchaseStatus,
    contentType,
    soldOutText,
    minEa,
    discountedPrice,
    directOrderType,
    dealProducts,
    name,
  } = product;
  const { buyProduct, disabledBuyButton } = useProductBuy({
    isSoldOut,
    isDirectOrder,
    isPurchaseStatus,
    isShortcutButton,
    searchKeyword,
    productDetailState: product,
    referrerProductName,
    referrerProductNo,
  });
  const contentsSoldOutGuideText = getContentsSoldOutGuideText({
    contentType,
    isSoldOut,
    soldOutText,
  });
  return (
    <CartOptionModal
      contentNo={no}
      mainImageUrl={mainImageUrl}
      name={name}
      shortDescription={shortDescription}
      dealProducts={dealProducts}
      minEa={minEa}
      isDirectOrder={isDirectOrder}
      isSoldOut={isSoldOut}
      isPurchaseStatus={isPurchaseStatus}
      contentsSoldOutGuideText={contentsSoldOutGuideText}
      isDiscountProduct={!!discountedPrice}
      directOrderType={directOrderType}
      disabledBuyButton={disabledBuyButton}
      buyProduct={buyProduct}
      onChangeSoldOutStatus={onChangeSoldOutStatus}
      contentType={contentType}
    />
  );
};

export default function ShortcutModal({
  onChangeSoldOutStatus,
  isShortcutButton,
  productCode,
  referrerProductName,
  referrerProductNo,
}: Props) {
  const { data } = useProductDetail(productCode);
  if (!data) {
    return null;
  }
  return (
    <ShortcutModalContent
      referrerProductName={referrerProductName}
      referrerProductNo={referrerProductNo}
      productCode={productCode}
      product={data}
      onChangeSoldOutStatus={onChangeSoldOutStatus}
      isShortcutButton={isShortcutButton}
    />
  );
}
