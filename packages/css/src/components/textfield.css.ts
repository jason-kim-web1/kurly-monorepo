import { sprinkles, vars } from '../theme.css';
import { style } from '@vanilla-extract/css';
import { Spacing } from '@thefarmersfront/kpds-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const root = recipe({
  base: {
    zIndex: 1,
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    cursor: 'text',
    paddingLeft: vars.spacing.$16,
    paddingRight: vars.spacing.$16,
  },
  variants: {
    as: {
      textarea: {
        flexDirection: 'column',
      },
      input: {
        flexDirection: 'row',
        paddingTop: '13px',
        paddingBottom: '13px',
      },
    },
  },
});

export const addedTextUL = style({
  marginTop: vars.spacing.$2,
});

export const infoText = recipe({
  base: {
    position: 'relative',
    color: vars.color.text.$tertiary,
    paddingTop: vars.spacing.$4,
  },
  variants: {
    dot: {
      true: {
        paddingLeft: vars.spacing.$10,
      },
    },
  },
});

export const errorText = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    paddingTop: vars.spacing.$4,
  },
  variants: {
    error: {
      true: {
        color: vars.color.main.$danger,
      },
      false: {
        color: vars.color.main.$complete,
      },
    },
  },
});

export const infoTextDot = style({
  position: 'absolute',
  top: '10px',
  left: '0px',
  backgroundColor: vars.color.background.$background5,
  borderRadius: '50%',
  width: vars.spacing.$4,
  height: vars.spacing.$4,
});

export const input = style({
  background: 'none',
  whiteSpace: 'pre-wrap',
  lineHeight: vars.lineHeight.$22,
  selectors: {
    '&:focus': {
      outline: 0,
    },
  },
});

export const textFieldInputVariants = recipe({
  base: [
    sprinkles({
      fontWeight: '$regular',
      fontSize: '$16',
    }),
    {
      width: '100%',
      height: 'auto',
      boxSizing: 'border-box',
      zIndex: '1',
      resize: 'none',
      color: vars.color.text.$primary,
      selectors: {
        '&::placeholder': {
          color: vars.color.text.$tertiary,
        },
        '&[type="text"]': {
          height: '22px',
        },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  ],
  variants: {
    disabled: {
      true: {
        color: vars.color.text.$disabled,
        selectors: {
          '&::placeholder': {
            color: vars.color.text.$disabled,
          },
        },
      },
    },
    error: {
      true: {
        selectors: {
          '&::placeholder': {
            color: vars.color.main.$danger,
          },
        },
      },
    },
    as: {
      textarea: {
        paddingTop: vars.spacing.$16,
        selectors: {
          '&:last-child': {
            paddingBottom: vars.spacing.$16,
          },
        },
      },
    },
    focused: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        error: true,
        focused: true,
      },
      style: {
        color: vars.color.text.$primary,
        selectors: {
          '&::placeholder': {
            color: vars.color.text.$tertiary,
          },
        },
      },
    },
  ],
});

export const textFieldInputBorderVariants = recipe({
  base: [
    sprinkles({
      borderRadius: '$10',
      borderWidth: '$1',
      backgroundColor: '$white',
    }),
    {
      position: 'absolute',
      inset: Spacing.$0,
      borderStyle: 'solid',
      selectors: {
        '&::placeholder': {
          color: 'transparent',
        },
      },
    },
  ],
  variants: {
    as: {
      textarea: {
        borderRadius: vars.spacing.$12,
      },
    },
    focused: {
      true: {
        borderColor: vars.color.main.$secondary,
      },
      false: {
        borderColor: vars.color.line.$line2,
      },
    },
    disabled: {
      true: {
        borderColor: vars.color.line.$line2,
      },
    },
    error: {
      true: {
        borderColor: vars.color.main.$danger,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        error: true,
        focused: true,
      },
      style: {
        borderColor: vars.color.main.$secondary,
      },
    },
  ],
});

export const textFieldLabelVariants = style({
  color: vars.color.main.$secondary,
  marginBottom: Spacing.$6,
  userSelect: 'none',
  pointerEvents: 'none',
});

export const textFieldLabelRequiredVariants = recipe({
  variants: {
    disabled: {
      true: sprinkles({
        color: '$gray500',
      }),
      false: sprinkles({
        color: '$red800',
      }),
    },
  },
});

export const slot = style({
  display: 'flex',
  position: 'relative',
  flexShrink: '0',
  alignItems: 'center',
  zIndex: '1',
});

export const textFieldCounterVariants = recipe({
  base: [
    sprinkles({
      color: '$gray500',
    }),
    {
      userSelect: 'none',
    },
  ],
  variants: {
    focused: {
      true: {},
      false: {},
    },
    error: {
      true: {
        selectors: {
          '&::placeholder': {
            color: vars.color.main.$danger,
          },
        },
      },
    },
    as: {
      textarea: {
        width: '100%',
        textAlign: 'right',
        marginTop: vars.spacing.$8,
        marginBottom: vars.spacing.$16,
        lineHeight: vars.lineHeight.$20,
      },
      input: {
        marginLeft: vars.spacing.$8,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        error: true,
        focused: false,
      },
      style: sprinkles({
        color: '$red800',
      }),
    },
  ],
});

export const textFieldInputCounterVariants = recipe({
  base: [
    sprinkles({
      color: '$gray900',
    }),
  ],
  variants: {
    hasCount: {
      true: {},
      false: sprinkles({
        color: '$gray500',
      }),
    },
    error: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        error: true,
        hasCount: false,
      },
      style: sprinkles({
        color: '$red800',
      }),
    },
  ],
});

export const textFieldInputMaxLengthVariants = recipe({
  base: [
    sprinkles({
      color: '$gray500',
    }),
  ],
  variants: {
    focused: {
      true: {},
      false: sprinkles({
        color: '$gray500',
      }),
    },
    error: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        error: true,
        focused: false,
      },
      style: sprinkles({
        color: '$red800',
      }),
    },
  ],
});

export type TextFieldInputVariants = RecipeVariants<typeof textFieldInputVariants>;
export type TextFieldInputBorderVariants = RecipeVariants<typeof textFieldInputBorderVariants>;
export type TextFieldLabelRequireVariants = RecipeVariants<typeof textFieldLabelRequiredVariants>;
export type TextFieldCounterVariants = RecipeVariants<typeof textFieldCounterVariants>;
export type TextFieldInputCounterVariants = RecipeVariants<typeof textFieldInputCounterVariants>;
export type textFieldInputMaxLengthVariants = RecipeVariants<typeof textFieldInputMaxLengthVariants>;
