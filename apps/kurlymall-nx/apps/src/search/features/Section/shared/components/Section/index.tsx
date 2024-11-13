import type { CSSProperties, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';

import { getSectionStyle } from '../../styles/section';

type SectionImplProps = {
  type: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const SectionImpl = ({ type, className, children, style }: SectionImplProps, ref?: ForwardedRef<HTMLElement>) => {
  const sectionTypeStyle = getSectionStyle(type);
  return (
    <section ref={ref} className={[sectionTypeStyle, className].join(' ')} style={style}>
      {children}
    </section>
  );
};

const Section = forwardRef(SectionImpl);

export { Section };
