import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from '../theme.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const toggleSwitchLabelVariants = recipe({
  base: [
    sprinkles({
      lineHeight: '$22',
      fontWeight: '$regular',
      fontSize: '$16',
      color: '$gray900',
    }),
    {
      transition: 'all 250ms ease-out',
    },
  ],
  variants: {
    disabled: {
      true: {
        color: '#BCC4CC',
      },
      false: {},
    },
  },
});

export const toggleSwitchTrackVariants = recipe({
  base: [
    sprinkles({
      width: '$38',
      height: '$24',
      borderRadius: '$12',
      padding: '$4',
    }),
    {
      transition: 'all 250ms ease-out',
      overflow: 'hidden',
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
  ],
  variants: {
    isChecked: {
      true: [
        sprinkles({
          backgroundColor: '$purple800',
        }),
      ],
      false: [
        sprinkles({
          backgroundColor: '$gray400',
        }),
      ],
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        isChecked: true,
        disabled: true,
      },
      style: [
        sprinkles({
          backgroundColor: '$purple200',
        }),
      ],
    },
    {
      variants: {
        isChecked: false,
        disabled: true,
      },
      style: [
        sprinkles({
          backgroundColor: '$gray200',
        }),
      ],
    },
  ],
});

export const toggleSwitchThumbVariants = recipe({
  base: [
    sprinkles({
      width: '$16',
      height: '$16',
      borderRadius: '$8',
      backgroundColor: '$white',
    }),
    {
      transition: 'all 250ms ease-out',
    },
  ],
  variants: {
    isChecked: {
      true: {
        transform: 'translateX(14px)',
      },
      false: {
        transform: 'translateX(0px)',
      },
    },
  },
});

export type ToggleSwitchLabelVariants = RecipeVariants<typeof toggleSwitchLabelVariants>;
export type ToggleSwitchTrackVariants = RecipeVariants<typeof toggleSwitchTrackVariants>;
export type ToggleSwitchThumbVariants = RecipeVariants<typeof toggleSwitchThumbVariants>;
