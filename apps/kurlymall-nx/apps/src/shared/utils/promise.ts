export const assertFulfilledResult = <T>(result: PromiseSettledResult<T>, fallback: T) =>
  result.status === 'fulfilled' ? result.value : fallback;
