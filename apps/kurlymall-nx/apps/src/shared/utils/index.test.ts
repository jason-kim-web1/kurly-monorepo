import { isLoginedUser } from '.';

import { getCookie } from '../services';

jest.mock('../services');

describe('isLoginedUser', () => {
  const auth = { accessToken: 'accessToken', isGuest: false };
  const emptyAuth = { accessToken: '', isGuest: true };
  const guestAuth = { accessToken: 'accessToken', isGuest: true };

  const cookie = 'DEVSTG_PHPSESSID=abwfkfmqoiqnod;';
  const wrongCookies = ['somedata=test;', '', undefined];

  beforeEach(() => {
    (getCookie as jest.Mock).mockReturnValue(cookie);
  });

  context('with auth', () => {
    context('when has cookie', () => {
      it('return true', () => {
        expect(isLoginedUser(auth)).toBe(true);
      });
    });

    context.each(wrongCookies)('when has not cookie', (value) => {
      beforeEach(() => {
        (getCookie as jest.Mock).mockReturnValue(value);
      });

      it('returns false', () => {
        expect(isLoginedUser(auth)).toBe(false);
      });
    });
  });

  context('with empty auth', () => {
    it('returns false', () => {
      expect(isLoginedUser(emptyAuth)).toBe(false);
    });
  });

  context('with guest auth', () => {
    it('returns false', () => {
      expect(isLoginedUser(guestAuth)).toBe(false);
    });
  });
});
