import styled from '@emotion/styled';
import { ReactNode } from 'react';

import COLOR from '../../constant/colorset';

const Item = styled.li<{ size?: 'small' | 'medium' }>`
  position: relative;
  padding-top: 4px;
  ${({ size }) =>
    size === 'medium'
      ? `
    font-size: 14px;
    line-height: 19px;
    padding-left: 11px;
  `
      : `
    font-size: 12px;
    line-height: 16px;
    padding-left: 7px;
  `}
  color: ${COLOR.kurlyGray450};
  :before {
    overflow: hidden;
    position: absolute;
    ${({ size }) =>
      size === 'medium'
        ? `
    width: 3px;
    height: 3px;
    margin: 9px 8px 0 -10px;
    background: ${COLOR.placeholder};
  `
        : `
    width: 1px;
    height: 1px;
    margin: 6px 0px 0 -6px;
    background: ${COLOR.kurlyGray450};
  `}
    vertical-align: top;
    border-radius: 50%;
    content: '';
  }
  text-align: left;
`;

interface Props {
  size?: 'small' | 'medium';
  contents: ReactNode[];
  className?: string;
}

export default function InformationList({ contents, size = 'small', className }: Props) {
  return (
    <ul className={className}>
      {contents?.map((value) => (
        <Item key={`information-list-${value}`} size={size}>
          {value}
        </Item>
      ))}
    </ul>
  );
}
