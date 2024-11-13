import { isValidDeliveryPolicy } from './isValidDeliveryPolicy';
import { CartDeliveryType } from '../../../cart/constants/CartDeliveryType';
import { PaymentCompletedDealProducts } from '../../../../shared/interfaces/Payments';

const testProduct = {
  dealProductNo: 1000319037,
  dealProductName: '딜1',
  contentsProductNo: 1000319038,
  contentsProductName: '[스티커] 텍스트 하단',
  masterProductCode: 'M00000122772',
  quantity: 1,
  retailPrice: 7000,
  productPrice: 7000,
  discountPrice: 7000,
};

describe('isValidDeliveryPolicy', () => {
  it('orderDealProducts에 validDeliveryPolicy의 값과 일치하는 항목이 있는 경우 true를 return 한다', () => {
    const validDeliveryPolicy: CartDeliveryType = 'DAWN';
    const orderDealProducts: PaymentCompletedDealProducts[] = [
      {
        ...testProduct,
        deliveryPolicy: 'DAWN',
      },
      {
        ...testProduct,
        deliveryPolicy: 'DAY_PARCEL',
      },
    ];

    const result = isValidDeliveryPolicy({ validDeliveryPolicy, orderDealProducts });
    expect(result).toBe(true);
  });

  it('orderDealProducts에 validDeliveryPolicy의 값과 일치하는 항목이 없는 경우 false를 return 한다', () => {
    const validDeliveryPolicy: CartDeliveryType = 'NOW_DELIVERY';
    const orderDealProducts: PaymentCompletedDealProducts[] = [
      { ...testProduct, deliveryPolicy: 'DAWN' },
      { ...testProduct, deliveryPolicy: 'DAY_PARCEL' },
    ];

    const result = isValidDeliveryPolicy({ validDeliveryPolicy, orderDealProducts });
    expect(result).toBe(false);
  });

  it('orderDealProducts에 상품이 없으면 false를 return 한다', () => {
    const validDeliveryPolicy: CartDeliveryType = 'DAWN';
    const orderDealProducts: PaymentCompletedDealProducts[] = [];

    const result = isValidDeliveryPolicy({ validDeliveryPolicy, orderDealProducts });
    expect(result).toBe(false);
  });
});
