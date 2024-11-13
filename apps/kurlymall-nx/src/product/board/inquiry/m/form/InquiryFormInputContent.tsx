import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

import MessageTextArea from '../../../../../shared/components/Message/MessageTextArea';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  textarea {
    line-height: 21px;
    padding: 16px 15px 8px;
  }
  .content-length-counter {
    padding: 0 16px 16px;
  }
`;

const textareaTheme = {
  height: 145,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.disabled,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
};

interface Props {
  value: string;
  onChange(e: ChangeEvent): void;
}

export default function InquiryFormInputContent({ value, onChange }: Props) {
  const handleChange = (v: string, e: ChangeEvent) => {
    onChange(e);
  };

  return (
    <Container>
      <MessageTextArea
        theme={textareaTheme}
        id="InquiryFormContent"
        name="content"
        value={value}
        onChange={handleChange}
        maxLength={5000}
        placeholder="내용을 입력해 주세요"
        showCount
      />
    </Container>
  );
}
