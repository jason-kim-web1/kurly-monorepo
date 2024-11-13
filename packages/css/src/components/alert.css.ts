import { style } from '@vanilla-extract/css';
import { sprinkles, vars } from '../theme.css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const wrapper = style([
  {
    position: 'fixed',
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  sprinkles({
    left: '$16',
    right: '$16',
  }),
  {
    selectors: {
      '&::before': {
        content: '',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
]);

export const innerWrapper = style([
  {
    position: 'relative',
    width: '100%',
    maxWidth: '280px',
    maxHeight: '480px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10000,
    wordBreak: 'break-word',
  },
  sprinkles({
    borderRadius: '$16',
    paddingTop: '$32',
    paddingBottom: '$0',
    backgroundColor: '$whiteInverse',
  }),
]);

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

export const buttonWrapper = recipe({
  base: [
    {
      display: 'flex',
    },
    sprinkles({
      paddingTop: '$8',
      paddingBottom: '$16',
      paddingLeft: '$16',
      paddingRight: '$16',
    }),
  ],
  variants: {
    buttonLayout: {
      vertical: {
        flexDirection: 'column-reverse',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
  },
  defaultVariants: {
    buttonLayout: 'horizontal',
  },
});

export const alertButton = recipe({
  base: [{ width: '100%' }],
  variants: {
    buttonLayout: {
      vertical: {},
      horizontal: {},
    },
    isGroupButton: {
      true: {
        width: '50%',
        selectors: {
          '&:first-of-type': {
            marginRight: vars.spacing.$8,
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        buttonLayout: 'vertical',
        isGroupButton: true,
      },
      style: {
        width: '100%',
        selectors: {
          '&:first-of-type': {
            marginRight: vars.spacing.$0,
            marginTop: vars.spacing.$8,
          },
        },
      },
    },
  ],
  defaultVariants: {
    isGroupButton: false,
    buttonLayout: 'horizontal',
  },
});

export type AlertButtonVariants = RecipeVariants<typeof alertButton>;
