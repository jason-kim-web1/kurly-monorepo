/**
 * 오브젝트 형식의 데이터를 쿼리스트링으로 변환시킵니다.
 *
 * @param { object } query 쿼리스트링으로 변환시킬 object 예) { test: '테스트 메세지' }
 */

export const encodeQueryString = (query: { [key: string]: string | number }): string => {
  const encodedQueryArray = [];

  for (const parameter in query) {
    const encodedParameter = encodeURIComponent(parameter);
    const encodedValue = encodeURIComponent(query[parameter]);
    encodedQueryArray.push(`${encodedParameter}=${encodedValue}`);
  }

  return encodedQueryArray.length ? `?${encodedQueryArray.join('&')}` : '';
};
