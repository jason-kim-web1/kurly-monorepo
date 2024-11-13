import { createContext, useContext, PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { eq, get, isEmpty } from 'lodash';

import type { StickerList as StickerListType } from '../../../product/types';
import { isPC } from '../../../../util/window/getDevice';
import type { ProductImageMetaData } from './types';
import { Platform, ProductImageType, ProductImageMetaDataDictionary } from './constants';
import { Sticker } from './components/Sticker';
import { SoldOut } from './components/SoldOut';
import { Image } from './components/Image';

const getProductImageMetaData = (platform: Platform, type: ProductImageType): ProductImageMetaData => {
  const metaData = get(get(ProductImageMetaDataDictionary, type), platform);
  const isDesktop = eq(type, Platform.DESKTOP);
  if (!metaData) {
    return isDesktop
      ? ProductImageMetaDataDictionary[ProductImageType.PRODUCT_LIST_ITEM][Platform.DESKTOP]
      : ProductImageMetaDataDictionary[ProductImageType.PRODUCT_LIST_ITEM][Platform.MOBILE];
  }
  return metaData;
};

export interface ProductImageBaseState {
  alt?: string;
  src: string;
  type: ProductImageType;
  stickerList?: StickerListType;
  isSoldOut?: boolean;
  soldOutTitle?: string;
  soldOutMessage?: string;
  platform: Platform;
  imageMetaData: ProductImageMetaData;
}

const ProductImageBaseContext = createContext<ProductImageBaseState | null>(null);

export const useProductImageBase = () => {
  const context = useContext(ProductImageBaseContext);
  if (!context) {
    throw new Error('useProductImageBase 하위에서만 사용 가능합니다.');
  }
  return context;
};

export type ProductImageBaseProps = PropsWithChildren<Omit<ProductImageBaseState, 'platform' | 'imageMetaData'>>;

const rootStyle = css`
  overflow: hidden;
  border-radius: 4px;
`;

const ProductImageBase = ({
  src,
  type,
  stickerList,
  isSoldOut = false,
  soldOutTitle,
  soldOutMessage,
  children,
  alt,
}: ProductImageBaseProps) => {
  const platform = isPC ? Platform.DESKTOP : Platform.MOBILE;
  const isProductDetail = eq(type, ProductImageType.PRODUCT_DETAIL);
  const getBorderRadiusStyle = () => {
    if (!isProductDetail) {
      return {};
    }
    if (isPC) {
      return { borderRadius: '6px' };
    }
    return { borderRadius: '0px' };
  };
  return (
    <ProductImageBaseContext.Provider
      value={{
        src,
        type,
        stickerList,
        isSoldOut,
        platform,
        imageMetaData: getProductImageMetaData(platform, type),
        soldOutTitle,
        soldOutMessage,
        alt: alt || '',
      }}
    >
      <div css={rootStyle} style={getBorderRadiusStyle()}>
        {children}
      </div>
    </ProductImageBaseContext.Provider>
  );
};

const StickerList = () => {
  const { stickerList } = useProductImageBase();
  if (!stickerList || isEmpty(stickerList)) {
    return null;
  }
  return (
    <>
      {stickerList.map((sticker, i) => (
        <Sticker key={i} sticker={sticker} />
      ))}
    </>
  );
};

ProductImageBase.Image = Image;
ProductImageBase.SoldOut = SoldOut;
ProductImageBase.StickerList = StickerList;

export { ProductImageBase, Image, SoldOut, StickerList };
