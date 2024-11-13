import snakeToCamel from './snakeToCamelCase';

describe('snakeToCamel test', () => {
  context('object의 key가 snake인 경우', () => {
    it('object의 key를 camel로 변환 후 반환하라', () => {
      const obj = {
        snake_case: 'value',
      };
      const camelObj = {
        snakeCase: 'value',
      };

      const nestedObj = {
        snake_case: {
          snake_case: 'value',
        },
      };
      const nestedCamelObj = {
        snakeCase: {
          snakeCase: 'value',
        },
      };

      const objWithArrayValue = {
        snake_case: ['value1', 'value2'],
      };
      const camelObjWithArrayValue = {
        snakeCase: ['value1', 'value2'],
      };

      const nestedObjWithArrayValue = {
        snake_case: [
          {
            snake_case: ['value1', 'value2'],
          },
        ],
      };
      const nestedCamelObjWithArrayValue = {
        snakeCase: [
          {
            snakeCase: ['value1', 'value2'],
          },
        ],
      };

      expect(snakeToCamel(obj)).toStrictEqual(camelObj);
      expect(snakeToCamel(nestedObj)).toStrictEqual(nestedCamelObj);
      expect(snakeToCamel(objWithArrayValue)).toStrictEqual(camelObjWithArrayValue);
      expect(snakeToCamel(nestedObjWithArrayValue)).toStrictEqual(nestedCamelObjWithArrayValue);
    });
  });

  context('object의 key가 snake가 아닌 경우', () => {
    it('object를 그대로 반환하라', () => {
      const obj = {
        number: 1,
        string: 'a',
        null: null,
        undefined: undefined,
        array: [],
        obj: {},
        date: new Date(),
        regex: /reg/,
        true: true,
        false: false,
        camelCase: 'camelCase',
      };

      expect(snakeToCamel(obj)).toStrictEqual(obj);
    });
  });
});
