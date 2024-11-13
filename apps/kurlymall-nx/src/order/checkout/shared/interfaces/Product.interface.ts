import { CalculatedPrice, CheckoutCoupon, Product, ReusablePackage } from '../../../../shared/interfaces';

export interface CheckoutProducts {
  products: Product[];
  coupons: CheckoutCoupon[];
  price: CalculatedPrice;
  reusablePackage: ReusablePackage;
}
