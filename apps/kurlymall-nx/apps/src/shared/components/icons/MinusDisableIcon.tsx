import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { MinusDisable28x28 } from '../../images';

const Img = styled.img`
  width: 28px;
  height: 28px;
`;

export default function MinusDisableIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src={MinusDisable28x28} alt="minusDisable" {...props} />;
}
