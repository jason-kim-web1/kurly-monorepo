import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Delete12x12 } from '../../images';

const Img = styled.img`
  width: 12px;
  height: 12px;
`;

export default function Delete12x12Icon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src={Delete12x12} alt="delete" {...props} />;
}
