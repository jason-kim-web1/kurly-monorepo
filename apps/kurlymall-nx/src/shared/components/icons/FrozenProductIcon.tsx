import styled from '@emotion/styled';

import { FrozenProductIconImg, FrozenProductIconPcImg } from '../../images';

export default styled.span<{ isPc: boolean }>`
  ${({ isPc }) =>
    isPc
      ? `
    width: 30px;
    height: 30px;
    background-image: url(${FrozenProductIconPcImg});
  `
      : `
    width: 24px;
    height: 24px;
    background-image: url(${FrozenProductIconImg});
  `};
  display: inline-block;
  background-size: cover;
  background-position: center;
`;
