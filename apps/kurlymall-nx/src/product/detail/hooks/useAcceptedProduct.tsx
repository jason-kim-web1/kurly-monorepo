import { getAcceptedProduct } from '../shared/utils/productDetailState';
import { useAppSelector } from '../../../shared/store';
import { ProductProps } from '../types';

interface Props {
  product: ProductProps;
}

export default function useAcceptedProduct({ product }: Props) {
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);

  const acceptedProduct = getAcceptedProduct({
    changeATFOption: productDetailState.changeATFOption,
    product,
    productDetailState,
  });

  return { acceptedProduct };
}
