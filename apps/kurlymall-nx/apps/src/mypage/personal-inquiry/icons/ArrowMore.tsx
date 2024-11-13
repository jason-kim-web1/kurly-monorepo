import styled from '@emotion/styled';

import { ArrowDown } from '../../../shared/images';

type ArrowDirection = 'up' | 'down';

export default styled.span<{ direction?: ArrowDirection; icon?: string }>`
  width: 18px;
  height: 18px;
  background-image: ${({ icon }) => `url(${icon ?? ArrowDown})`};
  background-position: center;
  background-repeat: no-repeat;
  transform: ${({ direction }) => direction === 'up' && 'rotate(180deg)'};
`;
