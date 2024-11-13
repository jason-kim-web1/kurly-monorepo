import styled from '@emotion/styled';

import Loading from '../../../../shared/components/Loading/Loading';

const Container = styled.div`
  > div {
    position: absolute;
    height: 100vh;
    bottom: 0;
    top: unset;
  }
`;

export default function ProductInquiryListLoading() {
  return (
    <Container>
      <Loading />
    </Container>
  );
}
