import styled from '@emotion/styled';

import FormInputRow from './FormInputRow';
import usePersonalInquiryCategory from '../../../hooks/usePersonalInquiryCategory';
import InputInquiryCategory from './InputInquiryCategory';
import { PersonalInquiryFormMode } from '../../../slice';

const CategoryWrap = styled.div`
  display: flex;
`;

interface Props {
  inquiryTypeCode?: string;
  inquiryTypeSubCode?: string;
  onChange(e: any): void;
  mode: PersonalInquiryFormMode;
}

export default function InputInquiryCategoryContainer({ inquiryTypeCode, inquiryTypeSubCode, onChange, mode }: Props) {
  const { categories, inquiryCategory, inquirySubCategory, handleChangeSubCategory, handleChangeCategory } =
    usePersonalInquiryCategory({
      inquiryTypeCode,
      inquiryTypeSubCode,
      handleChange: onChange,
      mode,
    });

  return (
    <FormInputRow label="유형" required>
      <CategoryWrap>
        <InputInquiryCategory
          name="inquiryCategory"
          value={inquiryCategory}
          onSelect={handleChangeCategory}
          placeholder="문의유형을 선택해주세요"
          options={categories}
        />
        <InputInquiryCategory
          name="inquirySubCategory"
          value={inquirySubCategory}
          onSelect={handleChangeSubCategory}
          options={inquiryCategory?.childCodes ?? []}
          placeholder="상세유형을 선택해주세요"
          disabled={!inquiryCategory}
        />
      </CategoryWrap>
    </FormInputRow>
  );
}
