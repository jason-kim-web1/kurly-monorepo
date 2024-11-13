import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { GUIDE_LINE } from '../constants/interestFree';
import { isPC } from '../../../../../util/window/getDevice';

const GuideText = styled.li`
  position: relative;
  padding-left: 7px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  overflow: hidden;
  ::before {
    content: '';
    background-color: ${COLOR.kurlyGray450};
    position: absolute;
    top: 6px;
    left: 1px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }

  ${isPC &&
  css`
    padding-left: 12px;
    color: ${COLOR.kurlyGray600};
    font-size: 14px;
    line-height: 19px;

    ::before {
      top: 7px;
      left: 4px;
      width: 3px;
      height: 3px;
    }
  `}
`;

export default function InterestFreeGuideLines() {
  return (
    <ul>
      {GUIDE_LINE.map((value, index) => (
        <GuideText key={`Interest-free-guidelines-${index}`}>{value}</GuideText>
      ))}
    </ul>
  );
}
