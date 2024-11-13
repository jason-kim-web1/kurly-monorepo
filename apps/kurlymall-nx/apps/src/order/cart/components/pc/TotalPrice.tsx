import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import TotalPriceContents from '../TotalPriceContents/TotalPriceContents';
import { useAppSelector } from '../../../../shared/store';

const Wrapper = styled.div`
  padding: ${vars.spacing.$20};
  background-color: ${vars.color.background.$background1};
  border-radius: ${vars.radius.$16};
  margin-bottom: ${vars.spacing.$16};
`;

const Title = styled(Typography)`
  margin-bottom: ${vars.spacing.$20};
`;

export default function TotalPrice() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  if (!hasSession) {
    return null;
  }

  return (
    <Wrapper>
      <Title variant={'$xxlargeSemibold'}>결제금액</Title>
      <TotalPriceContents />
    </Wrapper>
  );
}
