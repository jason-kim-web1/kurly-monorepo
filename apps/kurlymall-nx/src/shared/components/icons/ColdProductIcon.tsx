import styled from '@emotion/styled';

import { ColdProductIconImg, ColdProductIconPcImg } from '../../images';

export default styled.span<{ isPc: boolean }>`
  ${({ isPc }) =>
    isPc
      ? `
    width: 30px;
    height: 30px;
    background-image: url(${ColdProductIconPcImg});
  `
      : `
    width: 24px;
    height: 24px;
    background-image: url(${ColdProductIconImg});
  `};
  display: inline-block;
  background-size: cover;
  background-position: center;
`;
