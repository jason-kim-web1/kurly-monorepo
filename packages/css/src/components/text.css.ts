import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from '../theme.css';

export const variants = recipe({
  variants: {
    size: {
      $64: sprinkles({ fontSize: '$64' }),
      $36: sprinkles({ fontSize: '$36' }),
      $28: sprinkles({ fontSize: '$28' }),
      $24: sprinkles({ fontSize: '$24' }),
      $20: sprinkles({ fontSize: '$20' }),
      $18: sprinkles({ fontSize: '$18' }),
      $16: sprinkles({ fontSize: '$16' }),
      $14: sprinkles({ fontSize: '$14' }),
      $13: sprinkles({ fontSize: '$13' }),
      $12: sprinkles({ fontSize: '$12' }),
      $10: sprinkles({ fontSize: '$10' }),
    },
    weight: {
      bold: sprinkles({ fontWeight: '$bold' }),
      semibold: sprinkles({ fontWeight: '$semibold' }),
      regular: sprinkles({ fontWeight: '$regular' }),
    },
    lineHeight: {
      $72: sprinkles({ lineHeight: '$72' }),
      $44: sprinkles({ lineHeight: '$44' }),
      $36: sprinkles({ lineHeight: '$36' }),
      $32: sprinkles({ lineHeight: '$32' }),
      $28: sprinkles({ lineHeight: '$28' }),
      $26: sprinkles({ lineHeight: '$26' }),
      $22: sprinkles({ lineHeight: '$22' }),
      $20: sprinkles({ lineHeight: '$20' }),
      $18: sprinkles({ lineHeight: '$18' }),
      $16: sprinkles({ lineHeight: '$16' }),
      $14: sprinkles({ lineHeight: '$14' }),
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
