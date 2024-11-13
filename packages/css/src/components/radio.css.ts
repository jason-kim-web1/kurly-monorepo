import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles, vars } from '../theme.css';
import { style } from '@vanilla-extract/css';
import { Color } from '@thefarmersfront/kpds-tokens';

export const root = style({
  zIndex: 1,
  wordBreak: 'break-all',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
});

export const input = style({
  appearance: 'none',
});

export const label = recipe({
  base: {
    cursor: 'pointer',
  },
  variants: {
    ellipsis: {
      true: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
      },
    },
    disabled: {
      true: [
        sprinkles({
          color: '$gray400',
        }),
        {
          cursor: 'default',
        },
      ],
      false: {},
    },
    label: {
      true: sprinkles({
        marginLeft: '$4',
      }),
    },
  },
});

export const icon = recipe({
  base: [
    sprinkles({ backgroundColor: '$white', borderRadius: '$10' }),
    {
      width: '20px',
      height: '20px',
      boxSizing: 'border-box',
      flexShrink: 0,
      borderStyle: 'solid',
      margin: '10px',
      cursor: 'pointer',
    },
  ],
  variants: {
    disabled: {
      true: [
        sprinkles({
          backgroundColor: '$gray50',
          borderColor: '$gray200',
        }),
        {
          cursor: 'default',
        },
      ],
      false: {},
    },
    checked: {
      true: [
        sprinkles({
          borderWidth: '$6',
          borderColor: '$gray900',
        }),
      ],
      false: sprinkles({
        borderWidth: '$2',
        borderColor: '$gray300',
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        checked: true,
        disabled: true,
      },
      style: {
        borderColor: Color.background.$background4,
        backgroundColor: Color.background.$background1,
      },
    },
  ],
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

export type LabelVariants = RecipeVariants<typeof label>;
export type IconVariants = RecipeVariants<typeof icon>;
