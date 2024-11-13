import { checkEnabled } from './checkEnabled';

describe('checkEnabled', () => {
  context('key가 없는 경우', () => {
    it('false를 반환한다.', () => {
      const isEnabled = checkEnabled({ key: undefined, status: '' });

      expect(isEnabled).toBeFalsy();
    });
  });

  context('key가 있고, status가 success인 경우', () => {
    it('true를 반환한다.', () => {
      const isEnabled = checkEnabled({ key: 'key', status: 'success' });

      expect(isEnabled).toBeTruthy();
    });
  });

  context('key가 있고, status가 error인 경우', () => {
    it('false를 반환한다.', () => {
      const isEnabled = checkEnabled({ key: 'key', status: 'error' });

      expect(isEnabled).toBeFalsy();
    });
  });
});
