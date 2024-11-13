import styled from '@emotion/styled';

import Button from '../../../../../../shared/components/Button/Button';
import { Restock20x20, RestockDisabled20x20 } from '../../../../../../shared/images';

const CartOptionRestockButtonWrapper = styled.div`
  .cart-option-restock-button {
    padding: 0 4px;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      > img {
        margin-right: 2px;
      }
    }
  }
`;

interface Props {
  disabled: boolean;
  onClickRestockButton(): void;
}

export default function CartOptionRestockButton({ disabled, onClickRestockButton }: Props) {
  return (
    <CartOptionRestockButtonWrapper>
      <Button
        className="cart-option-restock-button"
        text="재입고 알림"
        theme="secondary"
        width={101}
        height={36}
        radius={4}
        icon={disabled ? RestockDisabled20x20 : Restock20x20}
        disabled={disabled}
        onClick={onClickRestockButton}
      />
    </CartOptionRestockButtonWrapper>
  );
}
