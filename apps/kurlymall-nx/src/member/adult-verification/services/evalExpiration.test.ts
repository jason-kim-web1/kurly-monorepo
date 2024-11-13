import { add } from 'date-fns';

import evalExpiration from './evalExpiration';

describe('evalExpiration', () => {
  const currentDateTime = new Date();

  it('현재일시가 만료일시를 지났다면 true를 반환한다', () => {
    const expiredLastYear = add(currentDateTime, { years: -1 });
    const expiredLastSecond = add(currentDateTime, { seconds: -1 });
    expect(evalExpiration(expiredLastYear, currentDateTime)).toBeTruthy();
    expect(evalExpiration(expiredLastSecond, currentDateTime)).toBeTruthy();
  });

  it('현재일시가 만료일시를 지나지 않았다면 false를 반환한다.', () => {
    const expiredInYear = add(currentDateTime, { years: 1 });
    expect(evalExpiration(expiredInYear, currentDateTime)).toBeFalsy();
  });

  it('정해진 만료일시가 없다면 false를 반환한다', () => {
    expect(evalExpiration(null, currentDateTime)).toBeFalsy();
  });
});
