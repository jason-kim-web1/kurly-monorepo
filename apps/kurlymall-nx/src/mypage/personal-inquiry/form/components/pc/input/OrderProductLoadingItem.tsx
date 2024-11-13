import styled from '@emotion/styled';

import Loading from '../../../../../../shared/components/Loading/Loading';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  > div {
    position: absolute;
  }
`;

export default function LoadingItem() {
  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
}
