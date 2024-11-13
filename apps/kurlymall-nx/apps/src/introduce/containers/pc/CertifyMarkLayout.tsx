import styled from '@emotion/styled';

import { ReactNode } from 'react';

import COLOR from '../../../shared/constant/colorset';

const Contaier = styled.div`
  width: 1050px;
  margin: 0 auto;
  color: ${COLOR.kurlyBlack};
  letter-spacing: -0.05em;
`;

const Desc = styled.p`
  padding: 0 0 60px;
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;
  text-align: justify;
`;

const CertifyMark = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const Title = styled.strong`
  min-width: 46px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.kurlyPurple};
`;

const Info = styled.div`
  width: calc(100% - 46px);
`;

interface Props {
  type: string;
  desc?: string;
  children: ReactNode;
}

export default function CertifyMarkLayout({ type, desc, children }: Props) {
  return (
    <Contaier>
      {desc && <Desc>{desc}</Desc>}
      <CertifyMark>
        <Title>{type}</Title>
        <Info>{children}</Info>
      </CertifyMark>
    </Contaier>
  );
}
