import styled from '@emotion/styled';

import { CartIcon, CartIconOn } from '../../images';

import CartItemPanelTooltipContainer from '../../../header/components/pc/cart/CartItemPanelTooltipContainer';
import useHeaderCartIcon from '../../../order/cart/hooks/useHeaderCartIcon';

const Wrapper = styled.div`
  position: relative;
  margin-left: 20px;
`;

const Cart = styled.button`
  display: block;
  width: 36px;
  height: 36px;
  background: url(${CartIcon});
  cursor: pointer;
  :hover {
    background: url(${CartIconOn});
  }
`;

const Count = styled.span`
  position: absolute;
  right: -4px;
  top: -1px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: #5f0080;
  font-size: 9px;
  color: #fff;
  line-height: 15px;
  text-align: center;
  white-space: nowrap;
`;

interface Props {
  sticky: boolean;
}

export default function CartButtonContainer({ sticky }: Props) {
  const { moveCart, basketCount } = useHeaderCartIcon();

  return (
    <Wrapper>
      <CartItemPanelTooltipContainer isSticky={sticky}>
        <Cart onClick={moveCart}>{basketCount > 0 && <Count>{basketCount > 99 ? '99+' : basketCount}</Count>}</Cart>
      </CartItemPanelTooltipContainer>
    </Wrapper>
  );
}
