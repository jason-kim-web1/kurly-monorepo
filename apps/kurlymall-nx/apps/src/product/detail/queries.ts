const queryKeys = {
  shareProduct: (productNo: number) => ['product', productNo, 'share'] as const,
};

export { queryKeys as ProductDetailKeys };
