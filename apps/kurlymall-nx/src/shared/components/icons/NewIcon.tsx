import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { NewBadge14x14xfa622f } from '../../../shared/images';

const Img = styled.img`
  width: 10px;
  margin-left: 5px;
`;

export default function NewIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src={NewBadge14x14xfa622f} alt="New" {...props} />;
}
