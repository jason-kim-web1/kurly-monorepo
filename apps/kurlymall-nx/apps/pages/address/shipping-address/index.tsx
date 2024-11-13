import styled from '@emotion/styled';

import SearchContainer from '../../../src/shared/containers/SearchContainer';

const Wrapper = styled.div`
  height: 100vh;
`;

export default function ShippingAddressPage() {
  return (
    <Wrapper>
      <SearchContainer />
    </Wrapper>
  );
}
