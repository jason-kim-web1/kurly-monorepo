import styled from '@emotion/styled';

import Dropdown from '../../../../../../shared/components/Input/Dropdown';
import { InquiryCategory, SubInquiryCategory } from '../../../types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 316px;
    :first-of-type {
      margin-right: 8px;
    }
  }
`;

interface Props {
  name: string;
  value?: InquiryCategory | SubInquiryCategory;
  onSelect(e: any): void;
  options: Array<InquiryCategory | SubInquiryCategory>;
  placeholder: string;
  disabled?: boolean;
}

export default function InputInquiryCategory({ name, value, onSelect, options, placeholder, disabled }: Props) {
  const handleChangeCategory = (option: InquiryCategory & SubInquiryCategory) => {
    const target = {
      type: 'text',
      value: option.value,
      name,
    };

    onSelect({ target });
  };

  return (
    <Container>
      <Dropdown
        selectedValue={value}
        options={options}
        onChange={handleChangeCategory}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Container>
  );
}
