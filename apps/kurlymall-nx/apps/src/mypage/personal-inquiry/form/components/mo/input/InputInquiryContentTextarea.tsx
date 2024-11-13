import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

import GraphemeSplitter from 'grapheme-splitter';

import { personalInquiryMaxContentsLength } from '../../../shared/PersonalInquiryInputValidation';
import COLOR from '../../../../../../shared/constant/colorset';

const splitter = new GraphemeSplitter();

const Container = styled.div`
  position: relative;
  height: 9rem;
  margin-bottom: 10px;
`;

const TextareaWrap = styled.div<{ focused: boolean }>`
  width: 100%;
  height: 100%;
  padding: 16px 16px;
  border: ${({ focused }) => (focused ? '1px solid black' : `1px solid ${COLOR.lightGray}`)};
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80%;
  font-size: 0.938rem;
  outline: none;
  resize: none;
  border: none;
  line-height: 21px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PlaceholderText = styled.span({
  color: COLOR.placeholder,
  fontSize: '0.938rem',
  position: 'absolute',
  top: '1rem',
  left: '1rem',
});

const ValidationText = styled.span({
  color: COLOR.placeholder,
  fontSize: '0.75rem',
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
});

interface Props {
  contents?: string;
  handleChange(e: ChangeEvent): void;
}

export default function InputInquiryContentTextarea({ contents, handleChange }: Props) {
  const [focused, setFocused] = useState(false);

  const contentLength = contents ? splitter.countGraphemes(contents) : 0;

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newLength = splitter.countGraphemes(e.target.value);
    if (newLength > personalInquiryMaxContentsLength) {
      return;
    }
    handleChange(e);
  };

  return (
    <Container>
      <TextareaWrap focused={focused}>
        <Textarea
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          name="contents"
          value={contents}
          onChange={handleContentChange}
        />
      </TextareaWrap>
      {!contents && <PlaceholderText>문의하실 내용을 입력해주세요.</PlaceholderText>}
      <ValidationText>
        {`${contentLength} / ${Number(personalInquiryMaxContentsLength).toLocaleString()}`}
      </ValidationText>
    </Container>
  );
}
