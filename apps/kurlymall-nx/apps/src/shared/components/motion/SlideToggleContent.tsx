import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

const Inner = styled(motion.div)`
  overflow: hidden;
`;

interface Props {
  opened: boolean;
  children: ReactNode;
}

export default function SlideToggleContent({ opened, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>('auto');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(opened ? contentRef.current.scrollHeight : 0);
    }
  }, [opened]);

  return (
    <AnimatePresence>
      <Inner
        key="slide-inner"
        initial={opened ? { height, opacity: 1 } : { height: 0, opacity: 0 }}
        animate={{ height, opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-hidden={!opened}
        ref={contentRef}
      >
        {children}
      </Inner>
    </AnimatePresence>
  );
}
