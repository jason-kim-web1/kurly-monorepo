import { chunk } from 'lodash';

import { encode } from 'iconv-lite';

export const encodeURIWithEUCKR = (text: string) =>
  chunk(encode(text, 'euc-kr').toString('hex'), 2)
    .reduce((acc, cur) => `${acc}%${cur.join('')}`, '')
    .toUpperCase();
