import styled from '@emotion/styled';

import { iconCalendar } from '../../../shared/images';

type ArrowDirection = 'up' | 'down';

export default styled.span<{ direction?: ArrowDirection }>`
  width: 18px;
  height: 18px;
  background-image: url(${iconCalendar});
  background-position: center;
  background-repeat: no-repeat;
`;
