import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../theme.css';

export const variants = recipe({
  base: [
    {
      width: '40px',
      height: '40px',
      zIndex: 1,
      overflow: 'hidden',
      transition: 'all 100ms ease-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxSizing: 'border-box',
      borderWidth: '0px',
      backgroundColor: 'transparent',
      borderRadius: vars.radius.$20,
    },
  ],
  variants: {
    type: {
      primary: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$purple100,
            },
            '&:disabled': {
              color: vars.color.$purple400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      secondary: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$gray100,
            },
            '&:disabled': {
              color: vars.color.$gray400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      tertiary: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$orange100,
            },
            '&:disabled': {
              color: vars.color.$orange400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      quaternary: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$gray50,
            },
            '&:disabled': {
              color: vars.color.$gray400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      quinary: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$gray100,
            },
            '&:disabled': {
              color: vars.color.$gray400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      inverse: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$blackAlphaLight,
            },
            '&:disabled': {
              color: vars.color.$whiteAlphaRegular,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      universal: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$blackAlphaLightUniversal,
            },
            '&:disabled': {
              color: vars.color.$whiteAlphaRegular,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      danger: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$red100,
            },
            '&:disabled': {
              color: vars.color.$red400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      point: [
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$purple100,
            },
            '&:disabled': {
              color: vars.color.$purple400,
              backgroundColor: 'transparent',
            },
          },
        },
      ],
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

export type Variants = RecipeVariants<typeof variants>;
