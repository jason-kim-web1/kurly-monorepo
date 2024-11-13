import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import TotalPriceContents from '../TotalPriceContents/TotalPriceContents';

const Wrapper = styled.div`
  padding: ${vars.spacing.$24} ${vars.spacing.$16};
  background-color: ${vars.color.background.$background1};
`;

export default function TotalPrice() {
  return (
    <Wrapper>
      <TotalPriceContents />
    </Wrapper>
  );
}
