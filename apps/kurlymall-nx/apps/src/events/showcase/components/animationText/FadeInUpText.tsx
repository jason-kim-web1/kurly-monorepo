import { css } from '@emotion/react';

import { useInView } from 'react-intersection-observer';

import { PropsWithChildrenOnly } from '../../../../shared/interfaces';

const wordStyle = css`
  word-break: keep-all;
  white-space: pre-line;
`;

const textDefaultStyle = css`
  ${wordStyle};
  opacity: 0.3;
  transform: translateY(25px);
  transition: transform 500ms cubic-bezier(0, 0, 0.5, 1), opacity 400ms cubic-bezier(0, 0, 0.5, 1),
    visibility 300ms cubic-bezier(0, 0, 0.5, 1);
  pointer-events: none;
`;

const animation = css`
  opacity: 1;
  transform: translateY(0px);
`;

interface Props extends PropsWithChildrenOnly {
  className?: string;
}

const FadeInUpText = ({ children, className }: Props) => {
  const { ref, inView } = useInView({ threshold: 0.5, rootMargin: '100px 0px' });
  return (
    <div ref={ref} className={className} css={[textDefaultStyle, inView && animation]}>
      {children}
    </div>
  );
};

export { FadeInUpText };
