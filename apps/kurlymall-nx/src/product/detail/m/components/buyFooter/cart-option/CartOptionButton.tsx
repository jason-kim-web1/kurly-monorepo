import styled from '@emotion/styled';

import Button from '../../../../../../shared/components/Button/Button';

const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 8px 8px;

  .cart-button {
    border-radius: 6px;

    > span {
      font-weight: 600;
    }
  }
`;

interface Props {
  text: string;
  onClick(): void;
  disabled: boolean;
}

export default function CartOptionButton({ text, onClick, disabled }: Props) {
  return (
    <Container>
      <Button className="cart-button" text={text} onClick={onClick} disabled={disabled} />
    </Container>
  );
}
