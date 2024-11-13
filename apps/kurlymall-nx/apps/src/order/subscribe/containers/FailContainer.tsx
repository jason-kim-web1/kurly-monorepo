import styled from '@emotion/styled';

import { css } from '@emotion/react';

import FailResult from '../components/FailResult';
import FailAction from '../components/FailAction';
import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
  text-align: center;

  ${isPC
    ? css`
        padding: 100px 30px 30px;
      `
    : css`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(100vh - 160px);
        justify-content: center;
      `}
`;

export default function FailContainer() {
  return (
    <Wrapper>
      <FailResult />
      <FailAction />
    </Wrapper>
  );
}
