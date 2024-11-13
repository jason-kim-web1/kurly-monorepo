import styled from '@emotion/styled';

import { CartBlackIcon, CartWhiteIcon } from '../../images';

export default styled.span<{
  color: 'black' | 'white';
}>`
  width: 44px;
  height: 44px;
  display: inline-block;
  background: url(${({ color }) => (color === 'black' ? CartBlackIcon : CartWhiteIcon)}) no-repeat 0 50%;
  background-size: 24px 24px;
  transition: all 0.3s ease-in-out;
`;
