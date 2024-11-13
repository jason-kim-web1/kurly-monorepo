import styled from '@emotion/styled';

import { css } from '@emotion/react';

import SaveProfile from '../../shared/components/SaveProfile';
import Recommend from '../components/Recommend';
import { isPC } from '../../../../../util/window/getDevice';

const Container = styled.div`
  ${!isPC &&
  css`
    overflow: auto;
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: calc(-12px + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

export default function SaveSuccessful() {
  return (
    <Container>
      <SaveProfile />
      <Recommend />
    </Container>
  );
}
