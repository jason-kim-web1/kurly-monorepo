import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div<{ noBorder?: boolean; noMargin?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ noMargin }) => !noMargin && 'margin-top: 75px'};
  ${({ noBorder }) =>
    !noBorder &&
    `
    border-bottom: 1px solid ${COLOR.kurlyGray800}
  `};
`;

const Subject = styled.h3`
  padding: 16px 0;
  font-weight: 500;
  font-size: 20px;
  color: ${COLOR.kurlyGray800};
  line-height: 29px;
`;

const Description = styled.span`
  display: inline-block;
  padding-left: 20px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  title: string;
  subTitle?: string;
  children?: ReactNode;
  noBorder?: boolean;
  noMargin?: boolean;
  className?: string;
}

export function Title({ title, subTitle, children, noBorder = false, noMargin = false, className }: Props) {
  return (
    <Wrapper noBorder={noBorder} noMargin={noMargin} className={className}>
      <Subject>
        {title}
        {subTitle && <Description>{subTitle}</Description>}
      </Subject>
      {children && children}
    </Wrapper>
  );
}
