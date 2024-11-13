export const getMembersBannerQueryString = (paymentMethodId?: string | null) => {
  const queryString = new URLSearchParams({
    openTerms: 'true',
    ...(paymentMethodId && { paymentMethodId }),
  }).toString();

  return `?${queryString}`;
};
