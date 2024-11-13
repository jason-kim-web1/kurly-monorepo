import { useInView } from 'react-intersection-observer';

import { eq, isEmpty } from 'lodash';

import { useEffect, useMemo } from 'react';

import { ProductCollectionHeader } from './ProductCollectionHeader';
import { ProductViewCollectionProductList } from './ProductViewCollectionProductList';
import { ProductViewCollectionSkeleton } from './ProductViewCollectionSkeleton';
import useProductList from '../../list/hook/useProductList';
import { useCollection } from '../../list/collections/hook/useCollection';
import { useProductCollectionGroupAmplitudeEvents } from '../providers/ProductCollectionGroupAmplitudePropertyProvider';
import { isDefined } from '../../../shared/utils/typeGuard';

interface Props {
  code: string;
  title: string;
  subtitle: string;
}

const ProductViewCollection = ({ code, title, subtitle }: Props) => {
  const { ref, inView } = useInView();
  const { data: collectionData } = useCollection({ collectionName: code });
  const { data: productData, isLoading } = useProductList({
    section: 'collections',
    code,
    defaultSortType: collectionData?.defaultSortType ?? '',
    enabled: inView,
  });

  const { addCollectionProductsProperty } = useProductCollectionGroupAmplitudeEvents();

  const purchasableProducts = useMemo(() => {
    if (!productData?.products) return [];
    return productData.products.filter(
      ({ isPurchaseStatus, status, isSales }) =>
        isPurchaseStatus && eq(status.code, 'PURCHASABLE') && (isDefined(isSales) ? isSales : true),
    );
  }, [productData]);

  useEffect(() => {
    if (isEmpty(purchasableProducts)) return;

    addCollectionProductsProperty(
      code,
      purchasableProducts.map(({ no, name, salesPrice, discount }, index) => ({
        contentId: no,
        contentName: name,
        price: discount.price || salesPrice,
        basePrice: salesPrice,
        collectionId: code,
        itemPosition: index + 1,
      })),
    );
  }, [purchasableProducts, addCollectionProductsProperty, code]);

  if (isLoading) {
    return (
      <div ref={ref}>
        <ProductViewCollectionSkeleton />
      </div>
    );
  }

  if (isEmpty(purchasableProducts)) {
    return null;
  }

  return (
    <div ref={ref}>
      <ProductCollectionHeader code={code} title={title} subtitle={subtitle} />
      <ProductViewCollectionProductList products={purchasableProducts} collectionCode={code} />
    </div>
  );
};

export { ProductViewCollection };
