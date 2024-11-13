import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerIconVariants = recipe({
  base: [
    {
      transition: 'all 250ms ease-out',
    },
  ],
  variants: {
    open: {
      true: {
        transform: 'rotate(180deg)',
      },
      false: {
        transform: 'rotate(0deg)',
      },
    },
  },
});

export type AccordionHeaderIconVariants = RecipeVariants<typeof headerIconVariants>;
