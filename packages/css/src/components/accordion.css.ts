import { style } from '@vanilla-extract/css';
import { sprinkles } from '../theme.css';

export const header = style([
  sprinkles({
    fontSize: '$18',
    fontWeight: '$bold',
    lineHeight: '$26',
  }),
]);
