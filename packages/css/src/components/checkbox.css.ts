import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from '../theme.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  zIndex: 1,
  wordBreak: 'break-all',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  cursor: 'pointer',
});

export const input = style({
  appearance: 'none',
  position: 'absolute',
  width: '1px',
  height: '1px',
  border: 'none',
  opacity: 0,
  overflow: 'hidden',
});

export const label = recipe({
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
      true: sprinkles({
        color: '$gray500',
      }),
      false: {},
    },
    label: {
      true: sprinkles({
        marginLeft: '$16',
      }),
    },
  },
});

export const icon = recipe({
  base: [
    sprinkles({ backgroundColor: '$white' }),
    {
      width: '20px',
      height: '20px',
      boxSizing: 'border-box',
      flexShrink: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
    },
  ],
  variants: {
    type: {
      box: [
        sprinkles({
          borderRadius: '$4',
        }),
        {
          borderWidth: '2px',
          borderStyle: 'solid',
        },
      ],
      line: sprinkles({
        backgroundColor: '$white',
      }),
    },
    disabled: {
      true: {},
      false: {},
    },
    checked: {
      true: {},
      false: sprinkles({
        borderColor: '$gray300',
      }),
    },
  },

  compoundVariants: [
    // box 선택 활성화
    {
      variants: {
        type: 'box',
        checked: true,
      },
      style: [
        sprinkles({
          backgroundColor: '$gray900',
          borderColor: '$gray900',
        }),
        {
          backgroundImage: 'url(../icon/check_white.svg)',
        },
      ],
    },
    // box 미선택, 비활성화
    {
      variants: {
        type: 'box',
        checked: false,
        disabled: true,
      },
      style: [
        sprinkles({
          backgroundColor: '$gray50',
          borderColor: '$gray200',
        }),
      ],
    },
    // box 선택, 비활성화
    {
      variants: {
        type: 'box',
        checked: true,
        disabled: true,
      },
      style: [
        sprinkles({
          backgroundColor: '$gray200',
          borderColor: '$gray200',
        }),
      ],
    },
    // line
    {
      variants: {
        type: 'line',
      },
      style: [
        {
          backgroundImage: 'url(../icon/check_gray.svg)',
        },
      ],
    },
    {
      variants: {
        type: 'line',
        checked: true,
      },
      style: {
        backgroundImage: 'url(../icon/check_black.svg)',
      },
    },
    {
      variants: {
        type: 'line',
        disabled: true,
      },
      style: {
        border: 'none',
        backgroundImage: 'url(../icon/check_gray.svg)',
      },
    },
  ],
  defaultVariants: {
    type: 'box',
    checked: false,
    disabled: false,
  },
});

export type LabelVariants = RecipeVariants<typeof label>;
export type IconVariants = RecipeVariants<typeof icon>;
