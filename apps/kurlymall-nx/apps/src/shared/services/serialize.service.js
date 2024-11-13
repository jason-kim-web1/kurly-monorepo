import unserializer from 'php-session-unserialize';

import { encode } from 'iconv-lite';

const transform = (value) => {
  if (value === null) {
    return 'N;';
  }

  if (typeof value === 'string') {
    const r = encode(value, 'euc-kr');
    return `s:${r.length}:"${value}";`;
  }

  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return `i:${value};`;
    }

    return `d:${value};`;
  }

  if (typeof value === 'boolean') {
    return `b:${value ? 1 : 0};`;
  }

  if (Array.isArray(value)) {
    const arrayKeys = [...value.keys()];
    const keys = [...Object.keys(value).filter((it) => !arrayKeys.includes(Number(it))), ...arrayKeys];

    const internal = keys.reduce((acc, cur) => `${acc}${transform(cur)}${transform(value[cur])}`, '');

    return `a:${keys.length}:{${internal}}`;
  }

  return `O:${Object.entries(value).reduce((acc, [key, object]) => {
    const internal = Object.entries(object).reduce((a, [k, it]) => `${a}${transform(k)}${transform(it)}`, '');

    return `${acc}${key.length}:"${key}":${Object.keys(object).length}:{${internal}}`;
  }, '')}`;
};

export const serializeTo = (data) =>
  Object.entries(data)
    .filter(([, value]) => value !== undefined)
    .reduce((acc, [key, value]) => `${acc}${key}|${transform(value)}`, '');

export const unserialize = (data) => unserializer(data);
