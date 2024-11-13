import styled from '@emotion/styled';

import LoadingSpinner from '../LoadingSpinner';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 100%;
`;

export default function MainSectionLoadingSpinner() {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
}
