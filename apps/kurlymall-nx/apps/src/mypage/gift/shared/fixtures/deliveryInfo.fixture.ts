import { FrontDoorMethod, ReceivePlace, ReusablePackage } from '../../../../shared/enums';
import { ReusablePackageType } from '../../../../shared/interfaces';
import { Receiver } from '../../../../shared/interfaces/OrderDetail';
import { DeliveryTimeType } from '../../../../shared/interfaces/ShippingAddress';

interface Props extends Receiver {
  packingType: ReusablePackageType;
  deliveryPolicy: DeliveryTimeType;
  isDeliveryProduct: boolean;
}

export const deliveryInfoFixture: Props = {
  name: '김컬리',
  phoneNumber: '010-1234-****',
  accessMethod: FrontDoorMethod.PASSWORD,
  accessDetail: '0000',
  pickupType: ReceivePlace.DOOR,
  pickupDetail: '',
  memo: '',
  address: {
    address: '도로명주소',
    addressDetail: '상세 주소',
    zipcode: '신우편주소',
  },
  packingType: ReusablePackage.PAPER,
  deliveryPolicy: DeliveryTimeType.DAWN,
  isDeliveryProduct: true,
  deliveryMessageTimeType: null,
};
