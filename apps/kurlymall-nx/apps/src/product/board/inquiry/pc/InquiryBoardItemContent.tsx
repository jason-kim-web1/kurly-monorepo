import styled from '@emotion/styled';

import { ReactNode } from 'react';

import Question from '../../../../mypage/personal-inquiry/icons/Question';
import Answer from '../../../../mypage/personal-inquiry/icons/Answer';
import RawHTML from '../../../../shared/components/layouts/RawHTML';

type InquiryContentType = 'Question' | 'Answer';

const Container = styled.div`
  max-width: 1010px;
`;

const ContentWrap = styled.div`
  display: flex;
  padding: 22px 20px 30px;
  align-items: flex-start;
`;

const IconWrap = styled.div`
  span {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

const Content = styled.div`
  margin-left: 12px;
  padding-top: 2px;
  font-size: 14px;
  word-break: break-all;
  line-height: 19px;
  letter-spacing: -0.5px;
`;

interface Props {
  type: InquiryContentType;
  content: string;
  children?: ReactNode;
}

export default function InquiryBoardItemContent({ type, content, children }: Props) {
  return (
    <Container>
      <ContentWrap>
        <IconWrap>{type === 'Question' ? <Question /> : <Answer />}</IconWrap>
        <Content>
          {type === 'Question' ? (
            content.split('\n').map((text) => (
              <span key={text}>
                {text}
                <br />
              </span>
            ))
          ) : (
            <RawHTML html={content} />
          )}
        </Content>
      </ContentWrap>
      {children}
    </Container>
  );
}
