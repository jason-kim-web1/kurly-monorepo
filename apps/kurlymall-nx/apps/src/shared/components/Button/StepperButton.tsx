import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

import StepperIcon from '../icons/StepperIcon';

const Count = styled.div<{ isPC: boolean }>`
  display: inline-flex;
  overflow: hidden;
  white-space: nowrap;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  text-align: center;
  ${({ isPC }) =>
    isPC
      ? `
    width: 31px;
    height: 28px;
    line-height: 28px;
  `
      : `
    width: 31px;
    height: 34px;
    line-height: 34px;
  `}
`;

const Container = styled.div<{ isPC: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #dddfe1;
  ${({ isPC }) =>
    isPC
      ? `
    width: 88px;
    border-radius: 3px;
  `
      : `
    width: 101px;
    border-radius: 4px;
  `}
`;

interface Props {
  className?: string;
  count: number;
  unit: number; // 올라가는 단위
  plusDisabled?: boolean;
  minusDisabled?: boolean;
  onChange: (count: number) => void;
  isPC?: boolean;
}

export default function StepperButton({
  className,
  count,
  unit,
  plusDisabled,
  minusDisabled = count === 1,
  onChange,
  isPC = true,
}: Props) {
  const handleClickMinus = () => {
    onChange(count - unit);
  };

  const handleClickPlus = () => {
    onChange(count + unit);
  };

  return (
    <Container className={className} isPC={isPC}>
      <StepperIcon isPC={isPC} type="minus" disabled={minusDisabled} onClick={handleClickMinus} />
      <Count className="count" isPC={isPC}>
        {count}
      </Count>
      <StepperIcon isPC={isPC} type="plus" disabled={plusDisabled} onClick={handleClickPlus} />
    </Container>
  );
}
