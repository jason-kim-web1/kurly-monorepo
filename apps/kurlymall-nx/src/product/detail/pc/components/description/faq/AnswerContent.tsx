import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

const AnswerWrapper = styled.div`
  display: flex;
  padding: 39px 0 40px;
  border-top: 1px solid ${COLOR.lightGray};
`;

const AnswerTitle = styled.b`
  width: 340px;
  padding-left: 31px;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
`;

const AnswerDescription = styled.p`
  flex: 1;
  padding: 2px 10px 0 0;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  white-space: pre-line;
`;

interface Props {
  title: string;
  children: ReactNode;
}

export default function AnswerContent({ title, children }: Props) {
  return (
    <AnswerWrapper>
      <AnswerTitle>{title}</AnswerTitle>
      <AnswerDescription>{children}</AnswerDescription>
    </AnswerWrapper>
  );
}
