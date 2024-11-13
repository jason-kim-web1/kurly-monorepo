/**
 * - '컬리'에서 이 페이지를 열겠습니까?(Open this page in "컬리"?)
 * - 주소가 유효하지 않기 때문에 Safari가 해당 페이지를 열 수 없습니다
 * 위 얼럿이 노출되는 경우, 얼럿을 끄는 시점을 특정하기 위해 focus 이벤트를 활용
 */
const waitForMessageClose = () =>
  new Promise<void>((resolve) => {
    // 100ms 까지 blur 이벤트가 발생하지 않는다면(얼럿이 뜨지 않은것이므로) 바로 끝낸다.
    const timer = setTimeout(() => {
      resolve();
    }, 100);

    // blur 이벤트가 발생했다는 것 : 확인메시지가 떴다는 것
    window.addEventListener('blur', () => {
      // 타이머 삭제하여 resolve 되지 않도록 하고
      clearTimeout(timer);

      // focus 가 돌아오는 시점에 resolve 될 수 있도록 한다
      window.addEventListener('focus', () => {
        resolve();
      });
    });
  });

/**
 * URI Scheme 을 호출해보고, 이동했는지 여부를 return
 * @param scheme
 * @return 이동했는지 여부
 */
export const tryUriScheme = (scheme: string) =>
  new Promise<boolean>(async (resolve) => {
    let timer: NodeJS.Timer | undefined = undefined;

    // 이미 보이지 않고 있다면 false 리턴(resolve)
    if (window.document.visibilityState !== 'visible') {
      resolve(false);
      return;
    }
    const listener = () => {
      // visibilitychange 이벤트 발생 시 보이지 않는다면 이동한것이므로 true 리턴(resolve)
      if (window.document.visibilityState !== 'visible') {
        window.document.removeEventListener('visibilitychange', listener);
        if (timer) {
          clearTimeout(timer);
        }
        resolve(true);
      }
    };

    window.document.addEventListener('visibilitychange', listener);

    try {
      // scheme 호출
      window.location.assign(scheme);
    } catch (e) {}

    // 오류메시지 혹은 확인메시지가 떴을 수 있기 때문에 먼저 이것이 꺼질때까지 대기
    await waitForMessageClose();
    timer = setTimeout(() => {
      window.document.removeEventListener('visibilitychange', listener);
      resolve(false);
    }, 2000);
  });
