import type { ComponentPropsWithoutRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 6px;
  background-color: ${COLOR.kurlyWhite};
`;

function SpinnerOverlay({ children }: ComponentPropsWithoutRef<'div'>) {
  return (
    <Wrapper initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </Wrapper>
  );
}

export default SpinnerOverlay;
