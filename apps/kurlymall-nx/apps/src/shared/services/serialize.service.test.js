import { serializeTo, unserialize } from './serialize.service';

describe('serializeTo', () => {
  context('with string', () => {
    it('returns data', () => {
      const result = serializeTo({ key: 'foo' });

      expect(result).toBe('key|s:3:"foo";');
    });
  });

  context('with integer', () => {
    it('returns data', () => {
      const result = serializeTo({ key: 87 });

      expect(result).toBe('key|i:87;');
    });
  });

  context('with double', () => {
    it('returns data', () => {
      const result = serializeTo({ key: 13.8 });

      expect(result).toBe('key|d:13.8;');
    });
  });

  context('with boolean', () => {
    it('returns data', () => {
      expect(serializeTo({ key: true })).toBe('key|b:1;');
      expect(serializeTo({ key: false })).toBe('key|b:0;');

      // expect(serializeTo(unserialize('key|b:0'))).toBe('key|b:0;');
      expect(serializeTo(unserialize('key|b:1'))).toBe('key|b:1;');
    });
  });

  context('with null', () => {
    it('returns data', () => {
      const result = serializeTo({ key: null });

      expect(result).toBe('key|N;');
    });
  });

  context('with array', () => {
    it('returns data', () => {
      const source = 'array_like_object_test|a:3:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"foo";i:0;s:5:"hello";}';

      const data = unserialize(source);

      const result = serializeTo(data);

      expect(result).toBe(source);
    });
  });

  context('with object', () => {
    const source =
      'object_test|O:3:"Foo":5:{s:10:"aMemberVar";s:26:"aMemberVar Member Variable";s:9:"aFuncName";s:11:"aMemberFunc";s:4:"aBoo";O:3:"Bar":1:{s:10:"aMemberVar";s:26:"aMemberVar Member Variable";}s:7:"aPerson";O:6:"Person":2:{s:4:"name";s:7:"gildong";s:7:"address";N;}s:6:"aEmpty";N;}';

    it('returns data', () => {
      const data = unserialize(source);

      const result = serializeTo(data);

      expect(result).toBe(source);
    });
  });

  context('with complex', () => {
    const serializedData =
      'object_test|O:6:"Person":4:{s:4:"name";s:7:"gildong";s:5:"grade";N;s:7:"address";O:7:"Address":1:{s:10:"aMemberVar";s:26:"aMemberVar Member Variable";}s:6:"wallet";O:6:"Wallet":2:{s:5:"money";i:50000;s:4:"card";N;}}class_test|s:3:"Foo";array_test|a:4:{i:0;s:3:"foo";i:1;s:3:"bar";i:2;s:5:"hello";i:3;s:5:"world";}array_like_object_test|a:4:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"foo";i:0;s:5:"hello";i:1;N;}uid|s:32:"697721bdc702ecc288876b5f51d698d7";int_test|i:87220;double_test|d:0.5;null_test|b:0;string_test|s:12:"Hello world!";empty_string_test|s:0:"";boolean_test_false|b:0;boolean_test_true|b:1;';

    it('returns data', () => {
      const data = unserialize(serializedData);

      const result = serializeTo(data);

      expect(result).toBe(serializedData);
    });
  });
});
