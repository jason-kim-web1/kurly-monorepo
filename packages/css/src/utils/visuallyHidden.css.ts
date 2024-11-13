import { style } from '@vanilla-extract/css';

export const visuallyHiddenCss = style({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
});
