import { ReactNode, RefObject } from 'react';

import { isPC } from '../../../util/window/getDevice';
import { useScrollAmplitudeEvent } from '../hooks/useScrollAmplitudeEvent';
import { StyledContainer } from '../shared/styled';

const LayoutContainer = ({
  pageName,
  children,
  divRef,
}: {
  pageName: string;
  children: ReactNode;
  divRef?: RefObject<HTMLDivElement>;
}) => {
  useScrollAmplitudeEvent({ pageName });

  return (
    <StyledContainer ref={divRef} width={isPC ? window.innerWidth : 750}>
      {children}
    </StyledContainer>
  );
};

export default LayoutContainer;
