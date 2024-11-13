import { style } from '@vanilla-extract/css';
import { vars } from '../theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '240px',
    maxWidth: '400px',
    position: 'fixed',
    zIndex: '100001',
    margin: '0 auto',
    textAlign: 'right',
    left: vars.spacing.$16,
    right: vars.spacing.$16,
    borderRadius: vars.radius.$12,
    backgroundColor: vars.color.main.$secondary,
    paddingLeft: vars.spacing.$20,
    paddingRight: vars.spacing.$24,
    paddingTop: vars.spacing.$16,
    paddingBottom: vars.spacing.$16,
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
  },
  variants: {
    isHide: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
    type: {
      normal: {
        paddingLeft: vars.spacing.$24,
      },
      error: {},
      success: {},
    },
    hasButton: {
      true: {},
    },
    buttonOrientation: {
      horizontal: {},
      vertical: {},
    },
    isPC: {
      true: {
        top: 0,
      },
      false: {
        bottom: 0,
      },
    },
  },
  compoundVariants: [
    {
      // 모바일 애니메이션 (숨김)
      variants: {
        isHide: true,
        isPC: false,
      },
      style: {
        transform: 'translateY(100%)',
      },
    },
    {
      // 모바일 애니메이션 (노출)
      variants: {
        isHide: false,
        isPC: false,
      },
      style: {
        transform: 'translateY(-16px)',
      },
    },
    {
      // PC 애니메이션 (숨김)
      variants: {
        isHide: true,
        isPC: true,
      },
      style: {
        transform: 'translateY(-100%)',
      },
    },
    {
      // PC 애니메이션 (노출)
      variants: {
        isHide: false,
        isPC: true,
      },
      style: {
        transform: 'translateY(16px)',
      },
    },
    {
      variants: {
        hasButton: true,
        buttonOrientation: 'vertical',
      },
      style: {
        display: 'block',
        paddingLeft: vars.spacing.$24,
        paddingRight: vars.spacing.$12,
        paddingTop: vars.spacing.$16,
        paddingBottom: vars.spacing.$8,
      },
    },
    {
      variants: {
        hasButton: true,
        buttonOrientation: 'horizontal',
      },
      style: {
        paddingLeft: vars.spacing.$24,
        paddingRight: vars.spacing.$12,
        paddingTop: vars.spacing.$8,
        paddingBottom: vars.spacing.$8,
      },
    },
  ],
});

export const snackbarContent = style({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
});

export const snackbarText = style({
  wordBreak: 'break-all',
  color: vars.color.text.$inverse,
});

export const snackbarIcon = style({
  marginRight: vars.spacing.$12,
});

export const snackbarButton = style({
  display: 'inline-block',
  marginLeft: vars.spacing.$16,
});
