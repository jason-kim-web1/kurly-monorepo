import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import InputRowHeader from './InputRowHeader';
import InputRowItem from './InputRowItem';
import InputInquiryContentTextarea from './InputInquiryContentTextarea';
import InputInquirySubject from './InputInquirySubject';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

interface Props {
  subject?: string;
  contents?: string;
  handleChange(e: ChangeEvent): void;
}
export default function InputInquiryContent({ subject, contents, handleChange }: Props) {
  const Header = <InputRowHeader label="문의 내용" required />;

  return (
    <Container>
      <InputRowItem header={Header}>
        <InputInquirySubject subject={subject} handleChange={handleChange} />
      </InputRowItem>
      <InputInquiryContentTextarea contents={contents} handleChange={handleChange} />
    </Container>
  );
}
