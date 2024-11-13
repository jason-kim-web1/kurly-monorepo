import { ParsedUrlQuery } from 'querystring';
import { parseQueryString } from './parseQueryString';

const query = {
  testKey1: undefined,
  testKey2: '',
  testKey3: ['1', '2', '3'],
  testKey4: ['1'],
};

const returnQuery = {
  testKey1: '',
  testKey2: '',
  testKey3: '1',
  testKey4: '1',
};

test('Query의 첫번째 값만 return하라', () => {
  expect(parseQueryString(query as ParsedUrlQuery)).toStrictEqual(returnQuery);
});
