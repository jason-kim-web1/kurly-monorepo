import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

import { slideToggleVariant } from '../../styles/motions/common/common';

const Inner = styled(motion.div)`
  overflow: hidden;
`;

interface Props {
  opened: boolean;
  children: ReactNode;
}

export default function SlideToggleWrapper({ opened, children }: Props) {
  return (
    <AnimatePresence>
      {opened && (
        <Inner key="slide-inner" initial="hide" animate="view" exit="hide" variants={slideToggleVariant}>
          {children}
        </Inner>
      )}
    </AnimatePresence>
  );
}
