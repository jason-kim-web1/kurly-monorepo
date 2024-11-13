import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const Header = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 44px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.32px;
  vertical-align: top;
`;

const Contents = styled.div`
  flex: 1;
`;

export default function InformationRow({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Wrapper className={className}>
      <Header>{title}</Header>
      <Contents>{children && children}</Contents>
    </Wrapper>
  );
}
