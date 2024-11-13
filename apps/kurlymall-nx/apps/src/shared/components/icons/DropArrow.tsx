import styled from '@emotion/styled';

import { ListDropArrow, ListDropArrowDimmed } from '../../images';

export default styled.span<{ dimmed?: boolean; rotate?: number }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url(${({ dimmed }) => (dimmed ? ListDropArrowDimmed : ListDropArrow)});
  background-size: cover;
  background-position: center;
  ${({ rotate }) =>
    rotate &&
    `
    transform: rotate(${rotate}deg);
  `}
`;
