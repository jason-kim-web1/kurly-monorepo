import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Restock } from '../../images';

const Img = styled.img`
  width: 32px;
  height: 32px;
`;

export default function RestockIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src={Restock} alt="restock" {...props} />;
}
