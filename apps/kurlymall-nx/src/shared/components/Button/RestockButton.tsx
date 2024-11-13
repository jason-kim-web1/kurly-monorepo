import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { RestockBell } from '../../images';

const Button = styled.button`
  width: 40px;
  height: 40px;
  background-image: url(${RestockBell});
  background-size: cover;
  background-position: center;
`;

export default function Restockbutton({ className, onClick, ...props }: HTMLAttributes<HTMLButtonElement>) {
  return <Button className={className} aria-label="재입고 알림" onClick={onClick} type="button" {...props} />;
}
