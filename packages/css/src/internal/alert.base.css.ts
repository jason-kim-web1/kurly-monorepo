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
  width: '280px',
  maxHeight: '480px',
  position: 'relative',
  zIndex: '100001',
  wordBreak: 'break-word',
  borderRadius: vars.radius.$16,
  backgroundColor: vars.color.background.$background1,
  animationName: showContainer,
  animationDuration: '0.2s',
});

export const mobileContainer = style({
  paddingTop: vars.spacing.$32,
  paddingBottom: vars.spacing.$0,
});

export const title = style({
  paddingLeft: vars.spacing.$24,
  paddingRight: vars.spacing.$24,
  marginBottom: vars.spacing.$8,
  color: vars.color.text.$primary,
});

export const contentComponent = style({
  marginBottom: vars.spacing.$20,
  paddingLeft: vars.spacing.$24,
  paddingRight: vars.spacing.$24,
  overflowY: 'auto',
});

export const contentText = style([
  contentComponent,
  {
    color: vars.color.text.$secondary,
    whiteSpace: 'pre-line',
  },
]);
