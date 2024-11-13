import styled from '@emotion/styled';

import { CartProduct } from '../../interface/CartProduct';
import DeleteItemButton from '../CartItems/DeleteItemButton';
import UnavailableContents from './UnavailableContents';
import { DeleteProps } from '../../hooks/useCartItem';
import { DELETE_TYPE } from '../../constants/SelectionType';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  > button {
    position: absolute;
    right: -6px;
  }
`;

interface Props {
  product: CartProduct;
  onDelete: (props: DeleteProps) => Promise<void>;
}

export default function UnavailableItem({ product, onDelete }: Props) {
  const handleDelete = async () => {
    await onDelete({ products: [product], selectionType: DELETE_TYPE.PRODUCT });
  };

  return (
    <Wrapper>
      <UnavailableContents product={product} />
      <DeleteItemButton onClick={handleDelete} />
    </Wrapper>
  );
}
