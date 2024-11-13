import { encodeURIWithEUCKR } from './uri-encoder';

test('encodeURIWithEUCKR', () => {
  expect(encodeURIWithEUCKR('오징어')).toBe('%BF%C0%C2%A1%BE%EE');
});
