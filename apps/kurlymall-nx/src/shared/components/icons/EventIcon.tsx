import styled from '@emotion/styled';
import { HtmlHTMLAttributes } from 'react';

import COLOR from '../../constant/colorset';

const Icon = styled.span`
  display: flex;
  align-items: center;
  height: 17px;
  padding: 0 7px;
  border: 1px solid ${COLOR.pointText};
  border-radius: 9px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 500;
  font-size: 10px;
  color: ${COLOR.pointText};
  white-space: nowrap;
`;

interface Props extends HtmlHTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export default function EventIcon({ className }: Props) {
  return <Icon css={className}>혜택</Icon>;
}
