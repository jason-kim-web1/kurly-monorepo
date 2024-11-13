import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

import GraphemeSplitter from 'grapheme-splitter';

import { personalInquiryMaxSubjectLength } from '../../../shared/PersonalInquiryInputValidation';
import COLOR from '../../../../../../shared/constant/colorset';

const splitter = new GraphemeSplitter();

const Input = styled.input({
  width: '100%',
  padding: '14px 16px',
  height: '3rem',
  borderRadius: 4,
  fontSize: '0.938rem',
  border: `1px solid ${COLOR.lightGray}`,
  outline: 'none',
  '&:focus': {
    border: '1px solid black',
  },
  '::placeholder': {
    color: COLOR.placeholder,
  },
});

interface Props {
  handleChange(e: ChangeEvent): void;
  subject?: string;
}

export default function InputInquirySubject({ subject, handleChange }: Props) {
  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newLength = splitter.countGraphemes(e.target.value);
    if (newLength > personalInquiryMaxSubjectLength) {
      return;
    }
    handleChange(e);
  };

  return (
    <Input
      name="subject"
      type="text"
      onChange={handleContentChange}
      value={subject}
      placeholder="제목을 입력해주세요"
    />
  );
}
