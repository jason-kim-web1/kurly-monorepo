import styled from '@emotion/styled';

import {
  CouponListDropArrow,
  CouponListDropArrowDimmed,
  SelectArrowDisabledImg,
  SelectArrowImg,
} from '../../../../images';
import { isPC } from '../../../../../../util/window/getDevice';

export default styled.span<{ dimmed?: boolean; rotate?: number }>`
  display: inline-block;
  width: ${isPC ? '12px' : '24px'};
  height: ${isPC ? '8px' : '24px'};
  background: url(${({ dimmed }) =>
      dimmed
        ? isPC
          ? SelectArrowDisabledImg
          : CouponListDropArrowDimmed
        : isPC
        ? SelectArrowImg
        : CouponListDropArrow})
    0 0 no-repeat;
  ${({ rotate }) =>
    rotate &&
    `
    transform: rotate(${rotate}deg);
  `}
`;
