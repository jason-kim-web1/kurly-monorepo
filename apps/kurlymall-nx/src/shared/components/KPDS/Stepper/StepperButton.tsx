import { MouseEvent } from 'react';

import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import PlusStepperIcon from '../../icons/order/cart/PlusStepperIcon';
import MinusStepperIcon from '../../icons/order/cart/MinusStepperIcon';

const Button = styled.button<{ width?: number; height?: number; disable?: boolean }>`
  width: ${({ width = 20 }) => width}px;
  height: ${({ height = 20 }) => height}px;
  background-color: transparent;
  border: none;
  cursor: ${({ disable }) => (disable ? 'unset' : 'pointer')};
`;

interface Props {
  type: 'plus' | 'minus';
  width?: number;
  height?: number;
  disable?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function StepperButton({ type, disable = false, onClick, ...props }: Props) {
  const fill = disable ? vars.color.$gray400 : vars.color.$black;

  return (
    <Button data-testid={`stepper-button-${type}`} onClick={onClick} disable={disable} {...props}>
      {type === 'plus' ? <PlusStepperIcon fill={fill} {...props} /> : <MinusStepperIcon fill={fill} {...props} />}
    </Button>
  );
}
