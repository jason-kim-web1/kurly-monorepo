import { css } from '@emotion/react';

import { forwardRef, Ref } from 'react';

import { motion, MotionStyle } from 'framer-motion';

import { PropsWithChildrenOnly } from '../../../shared/interfaces';
import COLOR from '../../../shared/constant/colorset';

const layoutStyle = css`
  position: relative;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fffced;
`;

const brandTypeLayoutStyle = css`
  background-color: ${COLOR.kurlyWhite};
`;

// eslint-disable-next-line react/display-name
const Layout = ({ children, type }: PropsWithChildrenOnly & { type: string }) => {
  const isBrandType = type === 'brand';
  return <div css={[layoutStyle, isBrandType && brandTypeLayoutStyle]}>{children}</div>;
};

interface SectionProps extends PropsWithChildrenOnly {
  className?: string;
  motionStyle?: MotionStyle;
}

// eslint-disable-next-line react/display-name
const Section = forwardRef(({ children, className, motionStyle }: SectionProps, ref: Ref<HTMLDivElement>) => {
  return (
    <motion.section ref={ref} className={className} style={motionStyle}>
      {children}
    </motion.section>
  );
});

export { Layout, Section };
