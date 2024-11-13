import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { ReactNode } from 'react';

const Wrapper = styled.div`
  position: relative;
  padding-bottom: ${vars.spacing.$16};

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -16px;
    right: -16px;
    height: 1px;
    background-color: ${vars.color.background.$background3};
  }
`;

export default function DeliveryGroupTitle({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
