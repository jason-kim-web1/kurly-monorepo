import styled from '@emotion/styled';

import InputInquiryCategory from './InputInquiryCategory';
import InputRowHeader from './InputRowHeader';
import InputRowItem from './InputRowItem';
import { PersonalInquiryFormMode } from '../../../slice';
import usePersonalInquiryCategory from '../../../hooks/usePersonalInquiryCategory';

const Gap = styled.div({
  height: '0.625rem',
});

interface Props {
  inquiryTypeCode?: string;
  inquiryTypeSubCode?: string;
  handleChange(e: any): void;
  mode: PersonalInquiryFormMode;
}

export default function InputInquiryCategoryContainer({
  inquiryTypeCode,
  inquiryTypeSubCode,
  handleChange,
  mode,
}: Props) {
  const { categories, inquiryCategory, inquirySubCategory, handleChangeSubCategory, handleChangeCategory } =
    usePersonalInquiryCategory({
      inquiryTypeCode,
      inquiryTypeSubCode,
      handleChange,
      mode,
    });

  const Header = <InputRowHeader label="문의 유형" required />;

  return (
    <InputRowItem header={Header}>
      <InputInquiryCategory
        title="문의 유형 선택"
        placeholder="유형을 선택해주세요"
        name="inquiryCategory"
        value={inquiryCategory}
        onSelect={handleChangeCategory}
        options={categories}
      />

      {inquiryCategory && (
        <>
          <Gap />
          <InputInquiryCategory
            title="상세 유형 선택"
            placeholder="상세 유형을 선택해주세요"
            name="inquirySubCategory"
            value={inquirySubCategory}
            onSelect={handleChangeSubCategory}
            options={inquiryCategory.childCodes}
          />
        </>
      )}
    </InputRowItem>
  );
}
