import { useEffect, useState } from 'react';

import ProductListCart from '../../../shared/icons/ProductListCart';
import { RecommendProductButtonProps } from '../components/m/RecommendProductButton';

export default function useRecommendProductButton({
  product,
  addToCart,
  availableProducts,
}: RecommendProductButtonProps) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const hasProduct = !!availableProducts.find(
      (availableProduct) => availableProduct.dealProductNo === product.dealProductNo,
    );
    setIsInCart(hasProduct);
  }, [availableProducts, product]);

  const handleClickAddToCart = async () => {
    await addToCart(product);
    setIsInCart(true);
  };

  const buttonValue = isInCart ? (
    '담기완료'
  ) : (
    <>
      <ProductListCart width={20} height={20} />
      담기
    </>
  );

  return {
    isInCart,
    handleClickAddToCart,
    buttonValue,
  };
}
