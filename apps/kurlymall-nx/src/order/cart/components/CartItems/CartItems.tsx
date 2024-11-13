import { CartProduct } from '../../interface/CartProduct';
import CartItem from './CartItem';
import useCartItem from '../../hooks/useCartItem';
import { CartDeliveryGroup } from '../../constants/CartDeliveryGroup';

interface Props {
  type: CartDeliveryGroup;
  products: CartProduct[];
}

export default function CartItems({ type, products }: Props) {
  const { isChecked, onDelete, onChange, onToggle } = useCartItem();

  return (
    <>
      {products.map((product) => (
        <CartItem
          key={product.dealProductNo}
          type={type}
          product={product}
          checked={isChecked(product)}
          onDelete={onDelete}
          onChange={onChange}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}
