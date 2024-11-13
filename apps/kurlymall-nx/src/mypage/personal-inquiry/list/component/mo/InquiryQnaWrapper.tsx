import { Fragment, ReactNode } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import Question from '../../../icons/Question';
import Answer from '../../../icons/Answer';
import { splitTexts } from '../../../../../shared/utils';

type InquiryQnaType = 'ANSWER' | 'QUESTION';

const Container = styled.div({
  width: '100%',
  paddingBottom: 0,
  marginTop: '.75rem',
  display: 'flex',
});

const Content = styled.div({
  width: '100%',
  marginLeft: '9px',
  paddingTop: '2px',
  wordBreak: 'break-all',
});

const Text = styled.span(({ type }: { type: InquiryQnaType }) => ({
  fontSize: '14px',
  lineHeight: '23px',
  color: type === 'QUESTION' ? '#333333' : '#666666',
}));

const CreatedAt = styled.div({
  marginTop: '9px',
  fontSize: '14px',
  color: '#999999',
});

const IconWrap = styled.div`
  span {
    width: 24px;
    height: 24px;
    top: -2px;
    display: block;
  }
`;

interface Props {
  text: string;
  type: InquiryQnaType;
  children: ReactNode;
  createdAt?: string;
}

export default function InquiryQnaWrapper({ text, type, children, createdAt }: Props) {
  return (
    <Container>
      <IconWrap>
        {type === 'QUESTION' && <Question />}
        {type === 'ANSWER' && <Answer />}
      </IconWrap>
      <Content>
        {splitTexts(text).map((it) => (
          <Fragment key={`text-frag-${it.id}`}>
            <Text type={type}>{it.text}</Text>
            <br />
          </Fragment>
        ))}
        {children}
        {type === 'ANSWER' && createdAt && <CreatedAt>{moment(createdAt).format('YYYY.MM.DD')}</CreatedAt>}
      </Content>
    </Container>
  );
}
