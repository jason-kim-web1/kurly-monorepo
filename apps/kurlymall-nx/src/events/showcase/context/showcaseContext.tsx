import { noop } from 'lodash';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { PropsWithChildrenOnly } from '../../../shared/interfaces';
import type { ProductType, ViewingProduct } from '../types';

interface InitialType {
  isEndProductList: boolean;
  changeViewingProduct: (productIndex: number) => (viewingProduct: ViewingProduct) => void;
  viewingProduct: ViewingProduct;
  isBrandType: boolean;
}

const initViewingProduct: ViewingProduct = {
  currentIndex: 0,
  contentNo: -1,
  name: '',
  isPurchase: false,
};

const initialState: InitialType = {
  isEndProductList: false,
  changeViewingProduct: () => noop,
  viewingProduct: initViewingProduct,
  isBrandType: false,
};

const ShowcaseContext = createContext(initialState);
const useShowcaseContext = () => useContext(ShowcaseContext);

interface ShowcaseContextProviderInterface extends PropsWithChildrenOnly {
  productList: ProductType[];
  type: string;
}

const ShowcaseContextProvider = ({ children, productList, type }: ShowcaseContextProviderInterface) => {
  const [viewingProduct, setViewingProduct] = useState<ViewingProduct>(initViewingProduct);
  const [isEndProductList, setIsEndProductList] = useState(false);
  const productListLength = productList.length;
  const isBrandType = type === 'brand';

  const changeViewingProduct = useCallback(
    (productIndex: number) =>
      ({ contentNo, name, isPurchase }: ViewingProduct) => {
        setViewingProduct({ currentIndex: productIndex, contentNo, name, isPurchase });

        if (productIndex > productListLength - 1) {
          setIsEndProductList(true);
          return;
        }

        setIsEndProductList(false);
      },
    [productListLength],
  );

  const value = useMemo(
    () => ({
      viewingProduct,
      isEndProductList,
      changeViewingProduct,
      isBrandType,
    }),
    [isEndProductList, viewingProduct, changeViewingProduct, isBrandType],
  );

  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};

export { useShowcaseContext, ShowcaseContextProvider };
