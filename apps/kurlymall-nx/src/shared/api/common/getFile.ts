import axios from 'axios';

/**
 * api 외 다른 리소스(i.e. S3) 에서 파일 데이터를 가져올 때 사용.
 * @param link 리소스 주소
 * @param params GET 호출 시, url 쿼리에 들어가는 변수 (키/값). e.g. { version: 1 }
 * @returns 전달된 리소스에서 가져온 데이터
 */
export const getFile = async <T>(link: string, params?: Record<string, number | string>) => {
  const { data } = await axios.get<T>(link, {
    params,
  });

  return data;
};
