const queryKeys = {
  all: (productNo: number) => ['product', productNo, 'review'] as const,
  notice: () => ['product', 'review', 'notice'] as const,
  review: (productNo: number, reviewId: number) => [...queryKeys.all(productNo), reviewId] as const,
  list: (productNo: number) => [...queryKeys.all(productNo), 'list'] as const,
  post: (productNo: number) => [...queryKeys.list(productNo), 'post'] as const,
  image: (productNo: number) => [...queryKeys.list(productNo), 'image'] as const,
  filter: (productNo: number, filterType: string) => [...queryKeys.all(productNo), 'filters', filterType] as const,
  count: (productNo: number, filters: string) => [...queryKeys.list(productNo), 'count', filters] as const,
  infiniteList: (productNo: number, size: number, sortType: string, onlyImage: boolean, filters: string) =>
    [...queryKeys.all(productNo), size, 'infinite-list', { sortType, onlyImage, filters }] as const,
  detail: (productNo: number, reviewId: number) => [queryKeys.all(productNo), 'detail', reviewId] as const,
};

export { queryKeys as ReviewKeys };
