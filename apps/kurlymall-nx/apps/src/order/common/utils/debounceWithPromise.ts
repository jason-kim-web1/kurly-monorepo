/**
 * 주어진 함수를 디바운스 처리하여, 지정된 지연 시간이 경과한 후에만 함수가 실행되도록 하는 유틸리티 함수입니다.
 * 이 함수는 프로미스를 반환하는 함수에 대해 디바운스 처리를 적용하며, 디바운스된 함수 역시 프로미스를 반환합니다.
 *
 * 만약 react-query 의 useMutation 에 mutationFn 에 디바운스 된 함수를 전달해야 한다면 해당 함수를 사용할 수 있습니다.
 * lodash 의 debounce 를 사용하면 MutationFunction 타입과 맞지 않아 타입에러가 발생합니다.
 *
 * @template T - 프로미스를 반환하는 함수의 타입입니다. 이 함수는 임의의 인자를 받고 프로미스를 반환합니다.
 * @param {T} func - 디바운스 처리할 함수입니다. 이 함수는 프로미스를 반환해야 합니다.
 * @param {number} delay - 디바운스 처리에 사용될 지연 시간입니다. 단위는 밀리초(ms)입니다.
 * @returns {(...args: Parameters<T>) => Promise<ReturnType<T>>} 디바운스 처리된 함수입니다. 이 함수는 원본 함수와 동일한 인자를 받고, 프로미스를 반환합니다.
 *
 * @example
 * // 사용 예시
 * async function fetchData(url: string): Promise<Data> {
 *   // 데이터를 가져오는 로직
 * }
 *
 * const debouncedFetchData = debounceWithPromise(fetchData, 200);
 * debouncedFetchData('http://example.com').then(data => console.log(data));
 */
export function debounceWithPromise<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };
}
