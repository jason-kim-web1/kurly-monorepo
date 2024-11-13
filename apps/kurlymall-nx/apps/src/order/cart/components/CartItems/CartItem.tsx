import styled from '@emotion/styled';

import ItemHeader from './ItemHeader';
import ItemContents from './ItemContents';
import { CartProduct } from '../../interface/CartProduct';
import { ChangeProps, DeleteProps, ToggleProps } from '../../hooks/useCartItem';
import { DELETE_TYPE } from '../../constants/SelectionType';
import { CartDeliveryGroup } from '../../constants/CartDeliveryGroup';

const Wrapper = styled.div`
  position: relative;
`;

interface Props {
  type: CartDeliveryGroup;
  product: CartProduct;
  checked: boolean;
  onDelete: (props: DeleteProps) => Promise<void>;
  onChange: (props: ChangeProps) => Promise<void>;
  onToggle: (props: ToggleProps) => void;
}

export default function CartItem({ type, product, checked, onDelete, onChange, onToggle }: Props) {
  const handleDelete = async () => {
    await onDelete({ products: [product], selectionType: DELETE_TYPE.PRODUCT });
  };

  const handleChange = async (quantity: number) => {
    await onChange({ quantity, item: product });
  };

  const handleToggle = (checkState: boolean) => {
    onToggle({ checked: checkState, items: [product] });
  };

  return (
    <Wrapper>
      <ItemHeader checked={checked} onDelete={handleDelete} onChange={handleToggle} />
      <ItemContents type={type} onChange={handleChange} product={product} />
    </Wrapper>
  );
}
