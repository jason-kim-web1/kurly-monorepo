import { motion, PanInfo } from 'framer-motion';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { SerializedStyles } from '@emotion/react';

import COLOR from '../../constant/colorset';
import { zIndex } from '../../styles';

const Wrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.kurlyWhite};
  z-index: ${zIndex.productMaximum};
  cursor: grab;
`;

const overlayAnimation = {
  initial: { top: '100vh' },
  animate: { top: 0 },
  transition: { duration: 0.35 },
};
const DRAG_OFFSET_Y = 120;
const overlayDragOptions = {
  dragElastic: 0.8,
  dragConstraints: { top: 0, right: 0, bottom: 0, left: 0 },
  dragTransition: { bounceStiffness: 600, bounceDamping: 30 },
  whileTap: { cursor: 'grabbing' },
};

interface Props {
  children: ReactNode;
  overlayStyle?: SerializedStyles;
  onDrag(): void;
}
export default function DragOverlayWrapper({ children, overlayStyle, onDrag }: Props) {
  const handleOnDrag = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.y > DRAG_OFFSET_Y) {
      onDrag();
    }
  };

  return (
    <Wrapper
      drag="y"
      dragDirectionLock
      onDrag={handleOnDrag}
      css={overlayStyle}
      {...overlayAnimation}
      {...overlayDragOptions}
    >
      {children}
    </Wrapper>
  );
}
