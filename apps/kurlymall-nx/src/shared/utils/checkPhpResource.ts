/**
 * php와 관련된 url인지 검사하는 함수
 * @param url 검사하고 싶은 url
 */
export const checkPhpResource = (url: string): boolean => {
  const [hostWithPath] = url.split('?');
  return hostWithPath.lastIndexOf('.php') !== -1;
};
