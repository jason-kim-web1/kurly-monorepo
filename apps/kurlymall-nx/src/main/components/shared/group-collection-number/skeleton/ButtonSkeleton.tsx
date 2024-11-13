import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../util/window/getDevice';

const Container = styled.div`
  padding: 0 16px;

  ${isPC &&
  css`
    display: flex;
    justify-content: center;
  `}
`;

const ButtonLine = styled.div`
  height: 48px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: ${COLOR.lightGray};

  ${isPC &&
  css`
    width: 516px;
    height: 56px;
    margin-top: 56px;
  `}
`;

const ButtonSkeleton = () => {
  return (
    <Container>
      <ButtonLine />
    </Container>
  );
};

export { ButtonSkeleton };
