import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div<{ noBorder?: boolean; noMargin?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ noMargin }) => !noMargin && 'margin-top: 60px'};
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
  padding-left: 13px;
  font-size: 14px;
  color: ${COLOR.kurlyGray600};
  vertical-align: top;
`;

interface Props {
  title: string;
  subTitle?: string;
  children?: ReactNode;
  noBorder?: boolean;
  noMargin?: boolean;
}

export function Title({ title, subTitle, children, noBorder = false, noMargin = false }: Props) {
  return (
    <Wrapper noBorder={noBorder} noMargin={noMargin}>
      <Subject>
        {title}
        {subTitle && <Description>{subTitle}</Description>}
      </Subject>
      {children && children}
    </Wrapper>
  );
}
