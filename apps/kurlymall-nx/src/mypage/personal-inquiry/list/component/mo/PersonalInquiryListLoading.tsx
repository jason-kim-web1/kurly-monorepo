import styled from '@emotion/styled';

import Loading from '../../../../../shared/components/Loading/Loading';

const Container = styled.div`
  position: absolute;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.4;
  z-index: 100;
  top: 0;
`;

const LoadingWrap = styled.div`
  top: 0;
  position: sticky;
`;

interface Props {
  loading: boolean;
}

export default function PersonalInquiryListLoading({ loading }: Props) {
  if (!loading) {
    return null;
  }

  return (
    <Container>
      <LoadingWrap>
        <Loading />
      </LoadingWrap>
    </Container>
  );
}
