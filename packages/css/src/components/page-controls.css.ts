import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../theme.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  height: '100%',
});

export const variants = recipe({
  base: [
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderStyle: 'solid',
    },
    sprinkles({
      width: '$48',
      height: '$48',
      borderWidth: '$1',
      borderColor: '$gray500',
      borderRadius: '$10',
      backgroundColor: '$white',
    }),
  ],
  variants: {
    type: {
      next: {
        transform: 'rotate(180deg)',
      },
      prev: {},
    },
    disabled: {
      true: {
        backgroundImage: 'url(../icon/ic_arrow_left_inactive.svg)',
      },
      false: {
        backgroundImage: 'url(../icon/ic_arrow_left_active.svg)',
      },
    },
    defaultVariants: {
      type: 'prev',
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
