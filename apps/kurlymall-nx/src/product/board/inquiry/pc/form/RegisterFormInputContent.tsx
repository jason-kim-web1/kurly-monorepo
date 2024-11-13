import styled from '@emotion/styled';

import { ChangeEvent } from 'react';

import RegisterFormInputRow from './RegisterFormInputRow';
import MessageTextArea from '../../../../../shared/components/Message/MessageTextArea';
import TextAreaPlaceholder from './TextAreaPlaceholder';
import COLOR from '../../../../../shared/constant/colorset';

const MessageTextAreaWrap = styled.div`
  position: relative;
  .placeholder {
    overflow-y: auto;
    z-index: 1;
    height: 86%;
  }
  textarea {
    font-size: 14px;
  }
`;

const textareaTheme = {
  height: 260,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.placeholder,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
};

interface Props {
  value: string;
  onChange(e: ChangeEvent): void;
}

export default function RegisterFormInputContent({ value, onChange }: Props) {
  const handleChange = (v: string, e: ChangeEvent) => {
    onChange(e);
  };

  return (
    <RegisterFormInputRow label="내용">
      <MessageTextAreaWrap>
        <MessageTextArea theme={textareaTheme} name="content" value={value} onChange={handleChange} maxLength={5000}>
          <TextAreaPlaceholder />
        </MessageTextArea>
      </MessageTextAreaWrap>
    </RegisterFormInputRow>
  );
}
