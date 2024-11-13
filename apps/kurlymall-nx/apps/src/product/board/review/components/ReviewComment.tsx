import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import { clamp5x5C5f0080, Arrow7x7x999 } from '../../../../shared/images';

interface Props {
  no: number;
  commentator: string;
  contents: string;
  registrationDate: string;
}

const Wrapper = styled.div`
  border-radius: 6px;
  padding: ${isPC ? '17px 20px 15px' : '16px'};
  margin-top: ${isPC ? '16px' : '12px'};
  background-color: ${COLOR.bgLightGray};
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${isPC ? '10px' : '6px'};
  font-size: ${isPC ? '14px' : '12px'};
  line-height: ${isPC ? '19px' : '16px'};
`;

const Commentator = styled.span`
  flex: 1 1 auto;
  font-weight: 500;
  color: ${COLOR.loversLavender};

  :before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 5px;
    background: url(${clamp5x5C5f0080}) no-repeat 50% 50%;
    vertical-align: 6px;
  }
`;

const RegistrationDate = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const Position = styled.div`
  position: relative;
`;

const Contents = styled.p<{
  isExpanded: boolean;
  lineHeight: number;
  maxLine: number;
}>`
  max-height: ${({ isExpanded, maxLine, lineHeight }) => (!isExpanded ? `${maxLine * lineHeight}px` : 'auto')};
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  line-height: ${({ lineHeight }) => lineHeight}px;
  overflow: hidden;
  white-space: pre-wrap;
`;

const ExpandButton = styled.button`
  padding-top: ${isPC ? '3px' : '5px'};
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};

  :after {
    content: '';
    display: inline-block;
    width: 11px;
    height: 8px;
    margin-left: 6px;
    background: url(${Arrow7x7x999}) no-repeat 50% 50%;
    vertical-align: 1px;
  }
`;

export default function ReviewComment({ commentator, contents, registrationDate }: Props) {
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const lineHeight = 19;
  const isOverflow = scrollHeight - clientHeight > lineHeight / 2;

  const handleToggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setClientHeight(ref.current.clientHeight);
    setScrollHeight(ref.current.scrollHeight);
  }, []);

  return (
    <Wrapper key={contents}>
      <Header>
        <Commentator>{commentator}</Commentator>
        {registrationDate && <RegistrationDate>{format(parseISO(registrationDate), 'yyyy.MM.dd')}</RegistrationDate>}
      </Header>
      <Position>
        <Contents ref={ref} isExpanded={isExpanded} maxLine={3} lineHeight={lineHeight}>
          {contents}
        </Contents>
        {isOverflow && !isExpanded ? <ExpandButton onClick={handleToggleExpand}>더보기</ExpandButton> : null}
      </Position>
    </Wrapper>
  );
}
