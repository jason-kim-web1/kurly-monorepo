import { ChangeEvent, ReactNode } from 'react';
import { RadioGroupBase } from '@/internal/RadioGroupBase';

type Props = {
  children: ReactNode;
  name: string;
  selected?: unknown;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
};

export const RadioGroup = ({ children, name, selected, onChange }: Props) => {
  return (
    <RadioGroupBase name={name} selected={selected} onChange={onChange}>
      {children}
    </RadioGroupBase>
  );
};
