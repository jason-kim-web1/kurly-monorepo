import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import { Arrow40x40C333 } from '../../../shared/images';
import COLOR from '../../constant/colorset';

const Container = styled.div`
  padding: 10px;
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding-left: 15px;
  border: 1px solid ${COLOR.borderColor};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  font-size: 12px;
  appearance: none;
  letter-spacing: -0.3px;
`;

const SelectArrow = styled.span`
  display: block;
  position: relative;
  width: 100%;
  pointer-events: none;
  &:after {
    content: '';
    position: absolute;
    right: 1px;
    bottom: 0;
    width: 40px;
    height: 40px;
    background: url(${Arrow40x40C333}) no-repeat 50% 50%;
    background-size: 40px 40px;
    pointer-events: none;
  }
`;

interface Props {
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  options?: {
    name: string;
    value: string | ReadonlyArray<string> | number;
  }[];
  value?: string | ReadonlyArray<string> | number;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectBox({
  id,
  className,
  name,
  disabled = false,
  options = [],
  value = '',
  onChange,
}: Props) {
  return (
    <Container className={className}>
      <Select id={id} name={name} value={value} disabled={disabled} onChange={onChange}>
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
      <SelectArrow />
    </Container>
  );
}
