import { eq, get } from 'lodash';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

import { Arrow7x7x999 } from '../../../../shared/images';
import { multiMaxLineText } from '../../../../shared/utils';
import COLOR from '../../../../shared/constant/colorset';
import { everyTrue } from '../../../../shared/utils/lodash-extends';

const Contents = styled.p<{ isExpanded: boolean; height: string }>`
  height: ${({ height }) => height};
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: ${isMobile ? '20px' : '21px'};
  color: ${COLOR.kurlyGray800};
  ${({ isExpanded }) => !isExpanded && multiMaxLineText(3)};
  word-break: break-all;
  white-space: pre-wrap;
`;

const Button = styled.button`
  padding-top: ${isMobile ? '7px' : '3px'};
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};

  :after {
    content: '';
    display: inline-block;
    width: 12px;
    height: 8px;
    margin-left: 6px;
    background: url(${Arrow7x7x999}) no-repeat 50% 50%;
    vertical-align: 1px;
  }
`;

interface Props {
  content: string;
}

export default function ReviewTextContent({ content }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const initializedRef = useRef(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandButtonVisible = isOverflow && !isExpanded;
  const lineHeight = isMobile ? 19 : 21;
  const height = expandButtonVisible ? `${lineHeight * 3}px` : 'auto';

  const handleToggle = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (!ref.current || initializedRef.current) {
      return;
    }
    const clientHeight = get(ref.current, 'clientHeight', 0);
    const scrollHeight = get(ref.current, 'scrollHeight', 0);
    if (everyTrue([clientHeight, scrollHeight].map((v) => eq(v, 0)))) {
      return;
    }
    setIsOverflow(() => scrollHeight - clientHeight > lineHeight / 2);
    initializedRef.current = true;
  });

  return (
    <div>
      <Contents ref={ref} height={height} isExpanded={isExpanded} onClick={handleToggle}>
        {content}
      </Contents>
      {expandButtonVisible && <Button onClick={handleToggle}>더보기</Button>}
    </div>
  );
}
