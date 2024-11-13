import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { PurpleArrowRight } from '../../images';

const Img = styled.img`
  width: 9px;
  height: 18px;
`;

export default function PurpleArrowRightIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src={PurpleArrowRight} alt="purpleArrowRight" {...props} />;
}
