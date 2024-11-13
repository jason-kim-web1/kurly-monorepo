export const kurlyMembersQueryKeys = {
  all: ['order'] as const,
  kurlyMembersCheckout: () => [...kurlyMembersQueryKeys.all, 'kurlyMembersCheckout'] as const,
};
