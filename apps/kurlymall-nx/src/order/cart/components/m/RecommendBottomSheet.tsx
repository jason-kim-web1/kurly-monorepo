import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import FullTypeBottomSheet from '../../../../shared/components/KPDS/FullTypeBottomSheet';
import useRecommendBottomSheet from '../../hooks/useRecommendBottomSheet';
import RecommendProduct from './RecommendProduct';
import BottomSheetButton from './BottomSheetButton';
import useCartDetail from '../../hooks/useCartDetail';

interface RecommendBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const Wrapper = styled.ul`
  margin-top: ${vars.spacing.$12};
`;

export default function RecommendBottomSheet({ isOpen, onClose }: RecommendBottomSheetProps) {
  const { handleClickAddToCart, title, productList, goToCheckoutOrder } = useRecommendBottomSheet();
  const { availableProducts } = useCartDetail();

  return (
    <FullTypeBottomSheet
      isOpen={isOpen}
      close={onClose}
      title={title}
      fixedBottomContent={<BottomSheetButton onClickCheckoutButton={goToCheckoutOrder} />}
      maxHeight="344px"
    >
      <Wrapper>
        {productList?.map((product) => (
          <RecommendProduct
            product={product}
            addToCart={handleClickAddToCart}
            key={`recommend-product-${product.dealProductNo}`}
            availableProducts={availableProducts}
          />
        ))}
      </Wrapper>
    </FullTypeBottomSheet>
  );
}
