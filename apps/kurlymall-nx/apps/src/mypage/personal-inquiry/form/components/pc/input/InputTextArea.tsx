import { Fragment, ChangeEvent } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import FormInputRow from './FormInputRow';
import MessageArea from '../../../../../../shared/components/Message/MessageTextArea';
import { inquiryTitle, warningArray, noticeArray } from '../../../shared/constants/inquiry-text';

const Container = styled.div`
  > div {
    padding-bottom: 0;
    > div:first-of-type {
      padding-top: 5px;
    }
  }
  textarea {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray450};
`;

const Title = styled.strong<{ top?: boolean }>`
  display: block;
  margin: ${({ top }) => (top ? '0 0 4px' : '16px 0 4px')};
  font-weight: 500;
`;

const P = styled.p`
  padding: 4px 0 0 10px;
  &::before {
    display: inline-block;
    width: 10px;
    margin: 0 0 0 -10px;
    content: '·';
  }
`;

const Warning = styled.p`
  color: ${COLOR.invalidRed};
  padding: 4px 0 0 15px;
  &::before {
    display: inline-block;
    width: 15px;
    margin: 0 0 0 -15px;
    content: '※';
  }
`;

const Placeholder = () => (
  <Wrapper>
    {inquiryTitle && <Title top>{inquiryTitle}</Title>}
    {warningArray?.map(({ text }) => (
      <Warning key={text}>{text}</Warning>
    ))}
    {noticeArray?.map(({ title, content }) => (
      <Fragment key={title}>
        <Title>{title}</Title>
        {content.map((item) => (
          <P key={item}>{item}</P>
        ))}
      </Fragment>
    ))}
  </Wrapper>
);

const theme = {
  height: 536,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.placeholder,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
};

interface Props {
  contents?: string;
  onChange(e: ChangeEvent): void;
}

export default function InputTextArea({ contents, onChange }: Props) {
  const handleChange = (value: string, event: ChangeEvent) => {
    onChange(event);
  };

  return (
    <Container>
      <FormInputRow label="내용" id="inquiry-contents" required>
        <MessageArea
          theme={theme}
          value={contents ?? ''}
          showCount
          id="inquiry-contents"
          name="contents"
          maxLength={5000}
          showCountText
          onChange={handleChange}
        >
          <Placeholder />
        </MessageArea>
      </FormInputRow>
    </Container>
  );
}
