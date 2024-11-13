export const memberKeys = {
  all: ['member'] as const,
  memberInfo: () => [...memberKeys.all, 'memberInfo'] as const,
  memberPoint: () => [...memberKeys.all, 'memberPoint'] as const,
  currentBenefit: () => [...memberKeys.all, 'currentBenefit'] as const,
  memberBenefit: () => [...memberKeys.all, 'memberBenefit'] as const,
  mypageInfo: () => [...memberKeys.all, 'mypageInfo'] as const,
};

export const deliveryKeys = {
  all: ['delivery'] as const,
  deliveryAddress: () => [...deliveryKeys.all, 'deliveryAddress'] as const,
};
