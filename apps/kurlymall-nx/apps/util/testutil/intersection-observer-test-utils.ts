type Item = {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  created: number;
};

const observers = new Map<IntersectionObserver, Item>();

/**
 * Create a custom IntersectionObserver mock, allowing us to intercept the `observe` and `unobserve` calls.
 * We keep track of the elements being observed, so when `mockAllIsIntersecting` is triggered it will
 * know which elements to trigger the event on.
 * @param mockFn The mock function to use. Defaults to `jest.fn`.
 */
export function setupIntersectionMocking(mockFn: typeof jest.fn) {
  global.IntersectionObserver = mockFn((cb, options = {}) => {
    const item = {
      callback: cb,
      elements: new Set<Element>(),
      created: Date.now(),
    };
    const instance: IntersectionObserver = {
      thresholds: Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0],
      root: options.root ?? null,
      rootMargin: options.rootMargin ?? '',
      observe: mockFn((element: Element) => {
        item.elements.add(element);
      }),
      unobserve: mockFn((element: Element) => {
        item.elements.delete(element);
      }),
      disconnect: mockFn(() => {
        observers.delete(instance);
      }),
      takeRecords: mockFn(),
    };

    observers.set(instance, item);

    return instance;
  });
}

/**
 * Reset the IntersectionObserver mock to its initial state, and clear all the elements being observed.
 */
export function resetIntersectionMocking() {
  if (global.IntersectionObserver) {
    (global.IntersectionObserver as jest.Mock).mockClear();
  }
  observers.clear();
}
