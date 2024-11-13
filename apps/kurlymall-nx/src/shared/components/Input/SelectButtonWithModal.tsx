import styled from '@emotion/styled';
import { useState } from 'react';

import COLOR from '../../constant/colorset';

import SelectButton from '../Button/SelectButton';
import SelectScrollModal from '../modal/SelectScrollModal';

interface ButtonProps {
  selected: boolean;
}

const Grid = styled.div<{ singleItem: boolean }>`
  display: grid;
  row-gap: 8px;
  column-gap: 7px;
  ${(props) => ({
    gridTemplateColumns: props.singleItem ? '1fr' : '1fr 1fr',
  })}
`;

const Button = styled.button<ButtonProps>`
  display: block;
  width: 100%;
  height: 46px;
  border-radius: 3px;
  border: 1px solid ${COLOR.kurlyGray200};
  border-radius: 3px;
  font-size: 14px;
  ${(props) =>
    props.selected && {
      fontWeight: 600,
      color: COLOR.kurlyPurple,
      borderColor: COLOR.kurlyPurple,
    }}
`;

export interface SelectOptionsProps {
  name: string;
  value: string;
}

interface Props {
  id?: string;
  className?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOptionsProps[];
  value?: SelectOptionsProps;
  onSelect(e: SelectOptionsProps): void;
}

export default function SelectButtonWithModal({
  id,
  className,
  title,
  placeholder,
  disabled = false,
  options,
  value,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleSelect = (option: SelectOptionsProps) => {
    setOpen(false);
    onSelect(option);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SelectButton
        id={id}
        className={className}
        disabled={disabled}
        value={value ? value.name : placeholder ?? ''}
        onClick={handleClick}
      />
      <SelectScrollModal open={open} title={title} onClose={handleClose}>
        <Grid singleItem={options.length === 1}>
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              selected={!!(value && value.value === option.value)}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </Button>
          ))}
        </Grid>
      </SelectScrollModal>
    </>
  );
}
