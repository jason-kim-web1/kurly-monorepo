import { useState } from 'react';

import SelectButton from '../Button/SelectButton';
import SelectModal, { SelectOptionsProps } from '../modal/SelectModal';

interface Props {
  className?: string;
  title?: string;
  placeholder?: string;
  options: SelectOptionsProps[];
  value?: SelectOptionsProps;
  onSelect(e: SelectOptionsProps): void;
}

export default function SelectWithModal({ className, title, placeholder, options, value, onSelect }: Props) {
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
      <SelectButton className={className} value={value ? value.name : placeholder ?? ''} onClick={handleClick} />
      <SelectModal
        open={open}
        title={title}
        options={options}
        selectedOption={value}
        onSelect={handleSelect}
        onClose={handleClose}
      />
    </>
  );
}
