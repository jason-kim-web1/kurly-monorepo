import { emailValidate } from './email-validator';

describe('email validator', () => {
  it.each([
    'mysite.ourearth.com',
    'mysite@.com.my',
    '@you.me.net',
    'mysite123@gmail.b',
    'mysite@.org.org',
    '.mysite@mysite.org',
    'mysite()*@gmail.com',
    'mysite..1234@yahoo.com',
  ])('잘못된 이메일 형식이면 false 를 반환한다.', (value) => {
    expect(emailValidate(value)).toBe(false);
  });

  it.each(['mysite@ourearth.com', 'my.ownsite@ourearth.org', 'mysite@you.me.net'])(
    '올바른 이메일 형식이면 true 를 반환한다.',
    (value) => {
      expect(emailValidate(value)).toBe(true);
    },
  );
});
