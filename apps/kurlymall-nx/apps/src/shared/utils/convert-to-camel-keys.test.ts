import { convertToCamelKeys } from './convert-to-camel-keys';

const snakeObj = {
  test_key1: 1,
  test_key2: 1,
  test_key3: 1,
  test_key4: 1,
  test_key5: 1,
};

const camelObj = {
  testKey1: 1,
  testKey2: 1,
  testKey3: 1,
  testKey4: 1,
  testKey5: 1,
};

test('convert to camel keys', () => {
  expect(convertToCamelKeys(snakeObj)).toStrictEqual(camelObj);
});
