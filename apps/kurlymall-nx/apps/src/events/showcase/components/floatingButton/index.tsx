import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { PropsWithChildrenOnly } from '../../../../shared/interfaces';
import { useShowcaseContext } from '../../context/showcaseContext';

const floatDefaultStyle = css`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -80px;
  display: flex;
  justify-content: space-between;
  max-width: 84.53%;
  width: 317px;
  padding: 1.143rem 1.714rem;
  border-radius: 100px;
  background: #242425;
  z-index: 11;
  opacity: 0.7;
  transition: all ease 0.5s 0s;
`;

const floatingActiveStyle = css`
  bottom: 24px;
  opacity: 1;
  transition: all ease 0.6s 0s;

  @supports (bottom: env(safe-area-inset-bottom)) {
    bottom: calc(24px + env(safe-area-inset-bottom));
    transition: all ease 0.6s 0s;
  },
`;

interface Props extends PropsWithChildrenOnly {
  className?: string;
  disabled?: boolean;
  inView: boolean;
  onClick: () => void;
}

const FloatingButton = ({ children, className, inView, disabled = false, onClick }: Props) => {
  const { isBrandType } = useShowcaseContext();

  return (
    <motion.button
      className={className}
      css={[
        floatDefaultStyle,
        inView && floatingActiveStyle,
        isBrandType &&
          css`
            border-radius: 0;
          `,
      ]}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export { FloatingButton };
