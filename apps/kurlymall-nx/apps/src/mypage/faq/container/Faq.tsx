import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import Question from '../../personal-inquiry/icons/Question';
import Answer from '../../personal-inquiry/icons/Answer';
import { toggleFaqSelected } from '../slice';
import COLOR from '../../../shared/constant/colorset';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import SlideToggleWrapper from '../../../shared/components/motion/SlideToggleWrapper';

const QuestionContainer = styled.div`
  padding: 0 20px;
  background-color: ${COLOR.kurlyWhite};

  pre {
    white-space: pre-wrap;
  }
`;

const AnswerContainer = styled(motion.div)<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 22px 20px 24px 20px;
  border-bottom: ${({ selected }) => (selected ? '' : `1px solid ${COLOR.kurlyGray150}`)};
  background-color: #fafafa;
`;

const QuestionWrap = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: ${({ selected }) => (selected ? '' : `1px solid ${COLOR.kurlyGray150}`)};
`;

const Text = styled.div({
  flex: 10,
  paddingTop: '2px',
  marginLeft: '10px',
  fontSize: '15px',
  color: '#333333',
  lineHeight: 1.43,
  whiteSpace: 'normal',
});

const AnswerText = styled(Text)`
  white-space: pre-line;
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
`;

interface Props {
  question: string;
  answer: string;
  selected: boolean;
  no: number;
}

export default function Faq({ question, answer, no, selected }: Props) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleFaqSelected(no));
  };

  return (
    <>
      <QuestionContainer>
        <QuestionWrap selected={selected} onClick={handleClick}>
          <Question css={iconStyle} />
          <Text>
            <RawHTML html={question ?? ''} />
          </Text>
        </QuestionWrap>
      </QuestionContainer>
      <SlideToggleWrapper opened={selected}>
        <AnswerContainer selected={selected}>
          <Answer css={iconStyle} />
          <AnswerText>
            <RawHTML html={answer ?? ''} />
          </AnswerText>
        </AnswerContainer>
      </SlideToggleWrapper>
    </>
  );
}
