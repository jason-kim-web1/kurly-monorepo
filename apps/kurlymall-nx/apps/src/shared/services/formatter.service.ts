import { chain, chunk, slice } from 'lodash';

const formatter = new Intl.NumberFormat('ko-KR');

export const addComma = (value: number | string): string => formatter.format(Number(value));

export const prefixPlus = (value: number | string): string => (value > 0 ? '+' : '');

export const prefixMinus = (value: number | string): string => (value > 0 ? '-' : '');

export const appendHyphenToPhoneNumber = (value: string) => value.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3');

export const removeHyphen = (value: string) => value.replace(/-/g, '');

export const convertToKoreanNumber = (value: number): string => {
  if (value > 10000) {
    return `${Math.floor(value / 10000)}만원`;
  }

  if (value > 1000) {
    return `${Math.floor(value / 1000)}천원`;
  }

  return `${addComma(value)}원`;
};

export const convertToAllKoreanNumber = (value: number): string => {
  return `${addComma(value)}원`;
};

export const convertNumberToKRW = (value: number): string => {
  if (value <= 0) {
    return '0원';
  }

  if (value >= 100 && ((value % 1000) - (value % 100)) / 10 > 0) {
    return convertToAllKoreanNumber(value);
  }

  const units = ['', '천', '만'];
  return (
    chain(value.toString())
      .split('')
      .reverse()
      .chunk(4)
      .thru(function (array) {
        return [...chunk(array[0], 3), ...slice(array, 1)];
      })
      .map(function (cur, index) {
        const price = cur.reverse().join('');

        return price === '0' || price === '000' ? '' : `${price}${units[index]}`;
      })
      .reverse()
      .compact()
      .join(' ')
      .value() + '원'
  );
};
