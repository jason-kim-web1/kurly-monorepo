import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { InquiryContentType } from '../../../../mypage/personal-inquiry/form/types';
import Question from '../../../../mypage/personal-inquiry/icons/Question';
import Answer from '../../../../mypage/personal-inquiry/icons/Answer';
import RawHTML from '../../../../shared/components/layouts/RawHTML';

const Container = styled.div`
  display: flex;
`;

const IconWrap = styled.div`
  flex: 1;
  span {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

const Content = styled.div`
  flex: 8;
  margin-top: 2px;
  line-height: 19px;
`;

interface Props {
  type: InquiryContentType;
  content: string;
  children?: ReactNode;
}

export default function ProductInquiryListItemContent({ type, content, children }: Props) {
  return (
    <Container>
      <IconWrap>{type === 'QUESTION' ? <Question /> : <Answer />}</IconWrap>
      <Content>
        {type === 'QUESTION' ? (
          content.split('\n').map((text) => (
            <span key={text}>
              {text}
              <br />
            </span>
          ))
        ) : (
          <RawHTML html={content} />
        )}
        {children}
      </Content>
    </Container>
  );
}
