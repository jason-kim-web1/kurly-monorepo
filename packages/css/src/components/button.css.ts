import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars, sprinkles } from '../theme.css';

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
      borderWidth: '0px',
    },
    sprinkles({ color: '$white' }),
  ],

  variants: {
    type: {
      primary: {},
      secondary: {},
      tertiary: {},
      danger: {},
      kakao: {},
    },
    size: {
      small: sprinkles({
        height: '$32',
        paddingX: '$12',
        fontSize: '$14',
      }),
      medium: sprinkles({
        height: '$40',
        paddingX: '$16',
        fontSize: '$14',
      }),
      large: sprinkles({
        height: '$48',
        paddingX: '$16',
        fontSize: '$16',
      }),
      extraLarge: sprinkles({
        height: '$56',
        paddingX: '$24',
        fontSize: '$18',
      }),
    },
    shape: {
      capsule: {},
      square: {},
    },
    style: {
      fill: {},
      stroke: {
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    },
    color: {
      regular: {},
      light: {},
    },
    weight: {
      semibold: sprinkles({ fontWeight: '$semibold' }),
      regular: sprinkles({ fontWeight: '$regular' }),
    },
  },

  compoundVariants: [
    // primary
    {
      variants: {
        type: 'primary',
        style: 'fill',
        color: 'regular',
      },
      style: [
        sprinkles({
          backgroundColor: '$purple900',
          color: '$white',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$purple950,
            },
            '&:disabled': {
              backgroundColor: vars.color.$purple100,
              color: vars.color.$purple400,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'primary',
        style: 'fill',
        color: 'light',
      },
      style: [
        sprinkles({
          backgroundColor: '$purple100',
          color: '$purple900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$purple200,
            },
            '&:disabled': {
              backgroundColor: vars.color.$purple100,
              color: vars.color.$purple400,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'primary',
        style: 'stroke',
        color: 'regular',
      },
      style: [
        sprinkles({
          borderColor: '$purple900',
          backgroundColor: '$white',
          color: '$purple900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$purple50,
            },
            '&:disabled': {
              color: vars.color.$purple400,
              borderColor: vars.color.$purple200,
              backgroundColor: vars.color.$white,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'primary',
        style: 'stroke',
        color: 'light',
      },
      style: [
        sprinkles({
          borderColor: '$purple200',
          backgroundColor: '$white',
          color: '$purple900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$purple200,
            },
            '&:disabled': {
              color: vars.color.$purple400,
              backgroundColor: vars.color.$white,
            },
          },
        },
      ],
    },

    // secondary
    {
      variants: {
        type: 'secondary',
        style: 'fill',
        color: 'regular',
      },
      style: [
        sprinkles({
          backgroundColor: '$gray900',
          color: '$white',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$gray950,
            },
            '&:disabled': {
              backgroundColor: vars.color.background.$background3,
              color: vars.color.text.$disabled,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'secondary',
        style: 'fill',
        color: 'light',
      },
      style: [
        sprinkles({
          backgroundColor: '$gray100',
          color: '$gray900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.background.$background4,
            },
            '&:disabled': {
              backgroundColor: vars.color.background.$background3,
              color: vars.color.text.$disabled,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'secondary',
        style: 'stroke',
        color: 'regular',
      },
      style: [
        sprinkles({
          borderColor: '$gray900',
          backgroundColor: '$white',
          color: '$gray900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.background.$background2,
            },
            '&:disabled': {
              color: vars.color.text.$disabled,
              borderColor: vars.color.line.$line2,
              backgroundColor: vars.color.background.$background1,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'secondary',
        style: 'stroke',
        color: 'light',
      },
      style: [
        sprinkles({
          borderColor: '$gray200',
          backgroundColor: '$white',
          color: '$gray900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.background.$background2,
            },
            '&:disabled': {
              color: vars.color.text.$disabled,
              backgroundColor: vars.color.background.$background1,
            },
          },
        },
      ],
    },

    // tertiary
    {
      variants: {
        type: 'tertiary',
        style: 'fill',
        color: 'regular',
      },
      style: [
        sprinkles({
          backgroundColor: '$orange900',
          color: '$white',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$orange950,
            },
            '&:disabled': {
              backgroundColor: vars.color.$orange100,
              color: vars.color.$orange400,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'tertiary',
        style: 'fill',
        color: 'light',
      },
      style: [
        sprinkles({
          backgroundColor: '$orange100',
          color: '$orange900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$orange200,
            },
            '&:disabled': {
              backgroundColor: vars.color.$orange100,
              color: vars.color.$orange400,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'tertiary',
        style: 'stroke',
        color: 'regular',
      },
      style: [
        sprinkles({
          borderColor: '$orange900',
          backgroundColor: '$white',
          color: '$orange900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$orange50,
            },
            '&:disabled': {
              color: vars.color.$orange400,
              borderColor: vars.color.$orange200,
              backgroundColor: vars.color.background.$background1,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'tertiary',
        style: 'stroke',
        color: 'light',
      },
      style: [
        sprinkles({
          borderColor: '$orange200',
          backgroundColor: '$white',
          color: '$orange900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$orange50,
            },
            '&:disabled': {
              color: vars.color.$orange200,
              backgroundColor: vars.color.background.$background1,
            },
          },
        },
      ],
    },

    // danger
    {
      variants: {
        type: 'danger',
        style: 'fill',
        color: 'regular',
      },
      style: [
        sprinkles({
          backgroundColor: '$red900',
          color: '$white',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$red950,
            },
            '&:disabled': {
              backgroundColor: vars.color.$red100,
              color: vars.color.$red400,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'danger',
        style: 'fill',
        color: 'light',
      },
      style: [
        sprinkles({
          backgroundColor: '$red900',
          color: '$red100',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$red200,
            },
            '&:disabled': {
              backgroundColor: vars.color.$red100,
              color: vars.color.$red400,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'danger',
        style: 'stroke',
        color: 'regular',
      },
      style: [
        sprinkles({
          borderColor: '$red900',
          backgroundColor: '$white',
          color: '$red900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$red50,
            },
            '&:disabled': {
              color: vars.color.$red400,
              borderColor: vars.color.$red200,
              backgroundColor: vars.color.background.$background1,
            },
          },
        },
      ],
    },
    {
      variants: {
        type: 'danger',
        style: 'stroke',
        color: 'light',
      },
      style: [
        sprinkles({
          borderColor: '$red200',
          backgroundColor: '$white',
          color: '$red900',
        }),
        {
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$red50,
            },
            '&:disabled': {
              color: vars.color.$red400,
              backgroundColor: vars.color.background.$background1,
            },
          },
        },
      ],
    },

    // kakao
    {
      variants: {
        type: 'kakao',
      },
      style: [
        sprinkles({
          backgroundColor: '$kakaoYellow900',
        }),
        {
          borderWidth: '0px',
          color: vars.color.$blackUniversal,
          selectors: {
            '&:hover, &:active': {
              backgroundColor: vars.color.$kakaoYellow950,
            },
            '&:disabled': {
              backgroundColor: vars.color.$kakaoYellow100,
              color: vars.color.$kakaoYellow400,
            },
          },
        },
      ],
    },

    // shape - square
    {
      variants: {
        size: 'extraLarge',
        shape: 'square',
      },
      style: sprinkles({
        borderRadius: '$12',
      }),
    },
    {
      variants: {
        size: 'large',
        shape: 'square',
      },
      style: sprinkles({
        borderRadius: '$10',
      }),
    },
    {
      variants: {
        size: 'medium',
        shape: 'square',
      },
      style: sprinkles({
        borderRadius: '$8',
      }),
    },
    {
      variants: {
        size: 'small',
        shape: 'square',
      },
      style: sprinkles({
        borderRadius: '$6',
      }),
    },

    // shape - capsule
    {
      variants: {
        size: 'extraLarge',
        shape: 'capsule',
      },
      style: sprinkles({
        borderRadius: '$28',
      }),
    },
    {
      variants: {
        size: 'large',
        shape: 'capsule',
      },
      style: sprinkles({
        borderRadius: '$24',
      }),
    },
    {
      variants: {
        size: 'medium',
        shape: 'capsule',
      },
      style: sprinkles({
        borderRadius: '$20',
      }),
    },
    {
      variants: {
        size: 'small',
        shape: 'capsule',
      },
      style: sprinkles({
        borderRadius: '$16',
      }),
    },
  ],

  defaultVariants: {
    type: 'primary',
    style: 'fill',
    color: 'regular',
    size: 'extraLarge',
    shape: 'square',
    weight: 'semibold',
  },
});

export type Variants = RecipeVariants<typeof variants>;
