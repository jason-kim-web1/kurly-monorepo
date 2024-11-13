import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styled from '@emotion/styled';

import Arrow from '../icons/Arrow';
import { fadeToggleVariant } from '../../styles/motions/common/common';

const Button = styled.button`
  width: 100%;
  padding: 18px 20px;
  > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.h3`
  position: relative;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  flex-shrink: 0;
`;

const Summary = styled.span`
  overflow: hidden;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

interface Props {
  title: string | ReactNode;
  summary: ReactNode;
  opened: boolean;
  isSummaryKeepOpen?: boolean;
  onClick: () => void;
}

export default function CollapseHead({ title, summary, opened, onClick, isSummaryKeepOpen = false }: Props) {
  return (
    <Button type="button" onClick={onClick}>
      <span>
        <Title>{title}</Title>
        <Summary>
          <AnimatePresence>
            {(!opened || isSummaryKeepOpen) && (
              <motion.div initial="hide" animate="view" exit="hide" variants={fadeToggleVariant}>
                {summary}
              </motion.div>
            )}
          </AnimatePresence>
          <Arrow isOpen={opened} />
        </Summary>
      </span>
    </Button>
  );
}
