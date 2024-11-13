import { ReactNode } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../shared/constant/colorset';

const Wrapper = styled.div<{ hasBorder?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 25px 0 20px;

  ${({ hasBorder }) =>
    hasBorder &&
    css`
      border-bottom: 2px solid ${COLOR.kurlyGray800};
    `}
`;

const InsideWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.5px;
  line-height: 28px;
`;

const Subject = styled.span`
  padding-left: 8px;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.2px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
  hasBorder?: boolean;
}

export default function MypageHeader({ title, description, children, hasBorder }: Props) {
  return (
    <Wrapper hasBorder={hasBorder}>
      <InsideWrapper>
        <Title>{title}</Title>
        {description && <Subject>{description}</Subject>}
      </InsideWrapper>
      {children && <InsideWrapper>{children}</InsideWrapper>}
    </Wrapper>
  );
}
