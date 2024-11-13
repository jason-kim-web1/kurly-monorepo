import { join, chain } from 'lodash';

export const joinBy = (sep: string) => (iterable: string[]) => join(iterable, sep);
export const joinByNewLine = joinBy('\n');

export const getShallowObjectToStringWithNewLine = (object: { [key: string]: string }) =>
  chain(object).values().compact().join('\n').value();
