import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import StepperButton from './StepperButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 96px;
  height: 36px;

  padding: ${vars.spacing.$8};
  border-radius: ${vars.radius.$20};
  background-color: ${vars.color.background.$background3};
`;

const Count = styled.div`
  text-align: center;
  min-width: 36px;
  margin: 0 2px;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

interface Props {
  quantity: number;
  unit: number;
  plusDisabled?: boolean;
  minusDisabled?: boolean;
  onChangeQuantity: (changedQuantity: number) => void;
}

export default function Stepper({
  quantity,
  unit,
  onChangeQuantity,
  plusDisabled,
  minusDisabled = quantity === 1,
}: Props) {
  const handleClickPlus = () => {
    if (plusDisabled) {
      return;
    }
    onChangeQuantity(quantity + unit);
  };

  const handleClickMinus = () => {
    if (minusDisabled) {
      return;
    }
    onChangeQuantity(quantity - unit);
  };

  return (
    <Wrapper>
      <StepperButton disable={minusDisabled} type={'minus'} onClick={handleClickMinus} />
      <Count>{quantity}</Count>
      <StepperButton disable={plusDisabled} type={'plus'} onClick={handleClickPlus} />
    </Wrapper>
  );
}
