import styled from '@emotion/styled';

import { RoomProductIconImg, RoomProductIconPcImg } from '../../images';

export default styled.span<{ isPc: boolean }>`
  ${({ isPc }) =>
    isPc
      ? `
    width: 30px;
    height: 30px;
    background-image: url(${RoomProductIconPcImg});
  `
      : `
    width: 24px;
    height: 24px;
    background-image: url(${RoomProductIconImg});
  `};
  display: inline-block;
  background-size: cover;
  background-position: center;
`;
