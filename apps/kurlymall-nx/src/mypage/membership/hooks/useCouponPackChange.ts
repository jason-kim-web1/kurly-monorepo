import { ChangeEvent, useState } from 'react';

interface Props {
  selectedBenefitOptionId: number;
}

export const useCouponPackChange = ({ selectedBenefitOptionId }: Props) => {
  const [selected, setSelected] = useState(selectedBenefitOptionId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(event.target.value));
  };

  return {
    selected,
    handleChange,
  };
};
