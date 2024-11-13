import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../theme.css';

const showBackdrop = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const backdrop = style({
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100000,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  selectors: {
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: vars.color.system.$dimAlphaRegularUniversal,
      animationName: showBackdrop,
      animationDuration: '0.25s',
    },
  },
});

const showContainer = keyframes({
  '0%': { transform: 'translateY(20px)', opacity: 0 },
  '100%': { transform: 'translateY(0px)', opacity: 1 },
});

export const container = style({
  width: '400px',
  height: '480px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: '100001',
  wordBreak: 'break-word',
  borderRadius: vars.radius.$16,
  backgroundColor: vars.color.background.$background1,
  animationName: showContainer,
  animationDuration: '0.2s',
});

export const header = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  paddingTop: vars.spacing.$12,
  paddingLeft: vars.spacing.$16,
  paddingRight: vars.spacing.$12,
  paddingBottom: vars.spacing.$8,
});

export const headerContainer = style({
  flex: '1',
});

export const headerContent = style({
  paddingTop: vars.spacing.$20,
  paddingRight: vars.spacing.$8,
});

export const headerTitle = style({
  color: vars.color.text.$primary,
});
export const headerDescription = style({
  color: vars.color.text.$tertiary,
});

export const contents = style({
  overflowY: 'auto',
});
