import styled from '@emotion/styled';

import ResultContainer from '../../../src/shared/containers/pc/address/ResultContainer';

const Wrapper = styled.div`
  padding: 0 30px;
`;

export default function ShippingAddressResultPage() {
  return (
    <Wrapper>
      <ResultContainer />
    </Wrapper>
  );
}
