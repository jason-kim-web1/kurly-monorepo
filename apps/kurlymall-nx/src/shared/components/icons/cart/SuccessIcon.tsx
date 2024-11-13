import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

export default function SuccessIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src="https://res.kurly.com/mobile/service/order/1909/img_success_order_end.gif" alt="" {...props} />;
}
