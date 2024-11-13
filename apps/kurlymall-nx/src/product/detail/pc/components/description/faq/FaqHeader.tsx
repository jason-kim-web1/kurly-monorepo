import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import { Arrow28x16C5f0080 } from '../../../../../../shared/images';

const FaqHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  padding: 14px 0 17px;
  border: 1px solid ${COLOR.lightGray};
  border-bottom: none;
  font-weight: 300;
  font-size: 16px;
  line-height: 27px;
`;

const FaqTitle = styled.strong`
  width: 179px;
  padding-left: 29px;
  font-weight: 500;
  font-size: 18px;
  color: ${COLOR.kurlyPurple};
`;

const FaqDescription = styled.p`
  white-space: pre-line;
`;

const Emph = styled.strong`
  font-weight: 500;
  color: ${COLOR.kurlyGray600};
`;

const Button = styled.button<{ isAnswerOpen: boolean }>`
  position: absolute;
  right: 25px;
  top: 50%;
  margin-top: -14px;
  padding-right: 20px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  color: ${COLOR.kurlyPurple};
  line-height: 24px;
  letter-spacing: -0.4px;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 8px;
    width: 14px;
    height: 8px;
    background: url(${Arrow28x16C5f0080}) no-repeat 100% 50%;
    background-size: 14px 8px;
    transform: ${(props) => (props.isAnswerOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

interface Props {
  faqIndex: number;
  title: string;
  description: string;
  isStrongDescription?: boolean;
  isOpenAnswer: boolean;
  onClickOpenAnswer(faqIndex: number): void;
}

export default function FaqHeader({
  faqIndex,
  title,
  description,
  isStrongDescription = false,
  isOpenAnswer,
  onClickOpenAnswer,
}: Props) {
  return (
    <FaqHeaderWrapper>
      <FaqTitle>{title}</FaqTitle>
      <FaqDescription>{isStrongDescription ? <Emph>{description}</Emph> : description}</FaqDescription>
      <Button type="button" onClick={() => onClickOpenAnswer(faqIndex)} isAnswerOpen={isOpenAnswer}>
        {isOpenAnswer ? '닫기' : '자세히 보기'}
      </Button>
    </FaqHeaderWrapper>
  );
}
