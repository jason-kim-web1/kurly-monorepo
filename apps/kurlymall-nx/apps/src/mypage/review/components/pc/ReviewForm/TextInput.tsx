import { ForwardedRef, forwardRef } from 'react';

import { defaultTextareaStyle } from './styled-components';
import MessageTextArea from '../../../../../shared/components/Message/MessageTextArea';
import TextareaPlaceholder from '../../../../../product/board/review/pc/TextareaPlaceholder';

interface Props {
  value: string;
  onChange(value: string): void;
}

function TextInput({ value, onChange }: Props, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <MessageTextArea
      theme={{ ...defaultTextareaStyle, height: 205 }}
      id="contents"
      name="contents"
      value={value}
      onChange={onChange}
      maxLength={5000}
      css={{ width: '100%' }}
      ref={ref}
    >
      <TextareaPlaceholder />
    </MessageTextArea>
  );
}

const ForwardedTextInput = forwardRef<HTMLTextAreaElement, Props>(TextInput);

export default ForwardedTextInput;
