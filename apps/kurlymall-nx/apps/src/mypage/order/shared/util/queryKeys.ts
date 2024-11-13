export const orderCheckoutKeys = {
  all: ['order'] as const,
  orderer: () => [...orderCheckoutKeys.all, 'orderer'] as const,
  checkoutProduct: () => [...orderCheckoutKeys.all, 'checkoutProduct'] as const,
  previousVendor: () => [...orderCheckoutKeys.all, 'previousVendor'] as const,
  pickupPlaces: () => [...orderCheckoutKeys.all, 'pickupPlaces'] as const,
  pickupPeriod: () => [...orderCheckoutKeys.all, 'pickupPeriod'] as const,
  pickupRefundQR: () => [...orderCheckoutKeys.all, 'pickupRefundQR'] as const,
  checkoutAddress: () => [...orderCheckoutKeys.all, 'checkoutAddress'] as const,
  personalCustomsCode: () => [...orderCheckoutKeys.all, 'personalCustomsCode'] as const,
};
