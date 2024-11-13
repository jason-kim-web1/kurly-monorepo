import { useEffect } from 'react';

import { loadLocalStorage, storeLocalStorage } from '../../../shared/services/storage.service';

import type { ProductProps, ViewedProduct } from '../types';
import { recentProducts } from '../../../shared/constant';

export default function useRecentProducts(product: ProductProps | null) {
  useEffect(() => {
    const localRecentProducts = loadLocalStorage<ViewedProduct[]>('viewedProducts') || [];

    if (!product) {
      return;
    }

    const nowTime = new Date().getTime();

    const recentProduct = {
      no: String(product.no),
      thumb: product.productVerticalSmallUrl,
      time: String(nowTime),
    };

    const newRecentProducts = localRecentProducts.filter((it) => it.no !== recentProduct.no);

    if (newRecentProducts.length >= recentProducts.LIMIT) {
      newRecentProducts.pop();
    }

    storeLocalStorage<ViewedProduct[]>('viewedProducts', [recentProduct, ...newRecentProducts]);
  }, [product]);
}
