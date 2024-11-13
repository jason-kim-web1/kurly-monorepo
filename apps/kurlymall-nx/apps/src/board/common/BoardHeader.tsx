import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../src/shared/constant/colorset';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 27px;
  justify-content: space-between;
`;

const InsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 24px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.5px;
  line-height: 48px;
`;

const Subject = styled.span`
  padding-left: 11px;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: ${COLOR.kurlyGray450};
  line-height: 20px;
`;

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function BoardHeader({ title, description, children }: Props) {
  return (
    <Wrapper>
      <InsideWrapper>
        <Title>{title}</Title>
        {description && <Subject>{description}</Subject>}
      </InsideWrapper>
      {children && <InsideWrapper>{children}</InsideWrapper>}
    </Wrapper>
  );
}
