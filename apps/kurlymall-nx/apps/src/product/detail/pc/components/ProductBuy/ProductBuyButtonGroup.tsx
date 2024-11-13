import styled from '@emotion/styled';

import CartButtonContainer from '../../containers/CartButtonContainer';
import LikeButtonContainer from '../../containers/LikeButtonContainer';
import RestockButtonContainer from '../../containers/RestockButtonContainer';

const BaseWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const FixedWidthWrapper = styled(BaseWrapper)`
  width: 428px;
  margin-bottom: 60px;
`;

const CartButtonWrapper = styled.div`
  flex-grow: 1;

  .cart-button {
    font-weight: 500;
  }
`;

type WrapperType = 'NORMAL' | 'FIXED_WIDTH';

interface Props {
  type?: WrapperType;
}

export default function ProductBuyButtonGroup({ type = 'NORMAL' }: Props) {
  const WrapperComponent = {
    NORMAL: BaseWrapper,
    FIXED_WIDTH: FixedWidthWrapper,
  }[type];

  return (
    <WrapperComponent>
      <LikeButtonContainer />
      <RestockButtonContainer />
      <CartButtonWrapper>
        <CartButtonContainer />
      </CartButtonWrapper>
    </WrapperComponent>
  );
}
