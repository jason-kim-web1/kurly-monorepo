import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const Img = styled.img`
  width: 16px;
  height: 10px;
`;

export default function SelectedIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src="https://res.kurly.com/pc/service/order/1908/ico_check_32x20.png" alt="" {...props} />;
}
