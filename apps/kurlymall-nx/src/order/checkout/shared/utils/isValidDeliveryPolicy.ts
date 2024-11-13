import { PaymentCompletedDealProducts } from '../../../../shared/interfaces/Payments';
import { CartDeliveryType } from '../../../cart/constants/CartDeliveryType';

/**
 * 주문 완료 페이지에서 노출 시킬 정책 문구를 구하는 함수.
 *
 * @param {CartDeliveryType} param.validDeliveryPolicy - 비교할 배송 정책
 * @param {PaymentCompletedDealProducts[]} param.orderDealProducts - 주문완료된 상품 목록
 *
 * @returns 주문 완료 정책 문구를 반환한다.
 */
export const isValidDeliveryPolicy = ({
  validDeliveryPolicy,
  orderDealProducts,
}: {
  validDeliveryPolicy: CartDeliveryType;
  orderDealProducts: PaymentCompletedDealProducts[];
}) => {
  return orderDealProducts.some(({ deliveryPolicy }) => deliveryPolicy === validDeliveryPolicy);
};
