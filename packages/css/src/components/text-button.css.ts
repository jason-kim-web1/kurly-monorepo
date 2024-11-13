import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles, vars } from '../theme.css';

export const variants = recipe({
  base: [
    {
      zIndex: 1,
      overflow: 'hidden',
      transition: 'all 100ms ease-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      borderWidth: '0px',
      backgroundColor: 'transparent',
    },
    sprinkles({ color: '$white', borderRadius: '$8' }),
  ],
  variants: {
    type: {
      primary: [
        sprinkles({
          color: '$purple900',
        }),
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
        sprinkles({ color: '$gray900' }),
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
        sprinkles({ color: '$orange900' }),
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
        sprinkles({ color: '$gray600' }),
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
        sprinkles({ color: '$gray500' }),
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
        sprinkles({ color: '$whiteInverse' }),
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
        sprinkles({ color: '$whiteUniversal' }),
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
        sprinkles({ color: '$red900' }),
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
        sprinkles({ color: '$purple800' }),
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
    style: {
      normal: {},
      underline: {
        textDecoration: 'underline',
      },
    },
    size: {
      large: [
        {
          height: '42px',
        },
        sprinkles({
          paddingX: '$16',
        }),
      ],
      medium: [
        {
          height: '38px',
        },
        sprinkles({
          paddingX: '$12',
        }),
      ],
      small: [
        {
          height: '36px',
        },
        sprinkles({
          paddingX: '$8',
        }),
      ],
    },
  },
  defaultVariants: {
    type: 'primary',
    style: 'normal',
    size: 'large',
  },
});

export type Variants = RecipeVariants<typeof variants>;
