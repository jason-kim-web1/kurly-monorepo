import { ReusablePackageType } from '../../../../shared/interfaces/ReusablePackage';

interface Props {
  isPickupOrder: boolean;
  hasKurlyFulfillmentAndDeliveryProduct: boolean;
  reusablePackageAvailability: {
    isPersonalBagAvailable: boolean;
    isKurlyPurpleBoxAvailable: boolean;
  };
}

/**
 * 주문서의 포장방법 영역 노출 여부를 구한다
 *
 * @param {boolean} isPickuoOrder 픽업 상품 여부
 * @param {boolean} hasKurlyFulfillmentAndDeliveryProduct 컬리 물류 상품인지 여부
 * @param {object} reusablePackageAvailability 재사용 포장재 사용 여부
 * @param {boolean} reusablePackageAvailability.isKurlyPurpleBoxAvailable 컬리백 사용 가능 여부
 * @param {boolean} reusablePackageAvailability.isPersonalBagAvailable 개인보냉박스 사용 가능 여부
 * @returns 포장방법 영역 노출 여부에 대한 boolean 값
 */
export const isViewPackage = ({
  isPickupOrder,
  hasKurlyFulfillmentAndDeliveryProduct,
  reusablePackageAvailability,
}: Props) => {
  if (isPickupOrder || !hasKurlyFulfillmentAndDeliveryProduct) {
    return false;
  }

  if (!reusablePackageAvailability.isKurlyPurpleBoxAvailable && !reusablePackageAvailability.isPersonalBagAvailable) {
    return false;
  }

  return true;
};

/**
 * 주문완료의 포장방법 영역 노출 여부를 구한다
 * @param {ReusablePackageType} packageType 포장방법
 * @returns 포장방법 영역 노출 여부에 대한 boolean 값
 */

export const isViewPackagePaymentResult = ({ packageType }: { packageType: ReusablePackageType }) => {
  return packageType !== 'PAPER';
};
