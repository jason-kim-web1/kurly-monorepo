import styled from '@emotion/styled';

import SlideModal from './SlideModal';

const Title = styled.div({
  height: '35px',
  padding: '0 20px',
  fontSize: '18px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
});

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button(({ selected }: ButtonProps) => ({
  width: '100%',
  height: '56px',
  padding: '0 20px',
  textAlign: 'left',
  fontSize: '16px',
  color: selected ? '#5f0080' : '#333333',
  backgroundColor: selected ? '#f7f7f7' : 'transparent',
  border: 'none',
}));

const SelectModalDescription = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export interface SelectOptionsProps {
  name: string;
  value: string;
}

interface Props {
  open: boolean;
  title?: string;
  selectedOption?: SelectOptionsProps;
  options: SelectOptionsProps[];
  onClose(): void;
  onSelect(option: SelectOptionsProps): void;
}

export default function SelectModal({ open, onClose, onSelect, selectedOption, title, options }: Props) {
  const handleClick = (option: SelectOptionsProps) => () => {
    onSelect(option);
  };

  return (
    <SlideModal open={open} onClose={onClose} disablePortal={true}>
      {title && <Title id="select-modal-title">{title}</Title>}
      <SelectModalDescription id="select-modal-description">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            selected={!!(selectedOption && selectedOption.value === option.value)}
            onClick={handleClick(option)}
          >
            {option.name}
          </Button>
        ))}
      </SelectModalDescription>
    </SlideModal>
  );
}
