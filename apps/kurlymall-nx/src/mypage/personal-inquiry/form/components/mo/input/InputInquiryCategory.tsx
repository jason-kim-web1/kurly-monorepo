import SelectWithModal from '../../../../../../shared/components/Input/SelectWithModal';
import { InquiryCategory, SubInquiryCategory } from '../../../types';

interface Props {
  title: string;
  placeholder: string;
  name: string;
  value?: InquiryCategory | SubInquiryCategory;
  onSelect(e: any): void;
  options: Array<InquiryCategory | SubInquiryCategory>;
}

export default function InputInquiryCategory({ title, placeholder, name, value, onSelect, options }: Props) {
  const onSelectCategory = (option: InquiryCategory & SubInquiryCategory) => {
    const target = {
      type: 'text',
      value: option.value,
      name,
    };

    onSelect({ target });
  };

  return (
    <SelectWithModal
      title={title}
      placeholder={placeholder}
      onSelect={onSelectCategory}
      options={options}
      value={value}
    />
  );
}
