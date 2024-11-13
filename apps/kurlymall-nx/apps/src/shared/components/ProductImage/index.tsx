import { ProductImageBase, ProductImageBaseProps } from './ProductImageBase';
import { ProductImageType } from './constants';
import { ne } from '../../utils/lodash-extends';

export const ProductImage = (props: ProductImageBaseProps) => {
  const { type, isSoldOut } = props;
  const shouldRenderStickerList = ne(type, ProductImageType.MAIN_RANDOM_COLLECTION_ARTICLE_ITEM);
  return (
    <ProductImageBase {...props}>
      <ProductImageBase.Image>
        {shouldRenderStickerList ? <ProductImageBase.StickerList /> : null}
        {isSoldOut ? <ProductImageBase.SoldOut /> : null}
      </ProductImageBase.Image>
    </ProductImageBase>
  );
};
