import styled from '@emotion/styled';
import React from 'react';

import { PropsWithChildrenOnly } from '../../../../shared/interfaces';

const ButtonWrapper = styled.li`
  display: inline-block;
  margin-right: 8px;

  > button {
    width: 2.5rem;
    height: 2.5rem;
    background-size: 1.5rem;
    vertical-align: middle;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const Container = styled.ul`
  flex: 0 0 auto;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

export default function HeaderButtons({ children }: PropsWithChildrenOnly) {
  const buttons = React.Children.toArray(children);

  return (
    <Container>
      {buttons.map((button, i) => (
        <React.Fragment key={i}>
          <ButtonWrapper>{button}</ButtonWrapper>
        </React.Fragment>
      ))}
    </Container>
  );
}
