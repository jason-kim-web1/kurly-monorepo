import { isEmpty } from 'lodash';

import { FrontDoorMethodTextMap, OldReceivePlaceTextMap } from '../../../../shared/constant';
import { FrontDoorMethod, ReceivePlace } from '../../../../shared/enums';
import { ReusablePackageTextMap, ReusablePackageType } from '../../../../shared/interfaces';
import { MultiRowBase } from '../../../../shared/interfaces/MultiRow';
import { Receiver } from '../../../../shared/interfaces/OrderDetail';
import { DeliveryTimeType } from '../../../../shared/interfaces/ShippingAddress';

interface Props extends Receiver {
  packingType: ReusablePackageType | null;
  deliveryPolicy: DeliveryTimeType | null;
}

export const getDeliveryInfo = ({
  name,
  phoneNumber,
  accessMethod,
  accessDetail,
  pickupType,
  pickupDetail,
  memo,
  address,
  packingType,
}: Props) => {
  const { address: addressMain, addressDetail, zipcode } = address;

  const EMPTY_COMMENT = '요청사항 없음';

  const formattedZip = isEmpty(zipcode) ? '' : `(${zipcode}) `;

  const fullAddress = `${formattedZip}${addressMain} ${addressDetail}`;

  const pickupMapper = {
    [ReceivePlace.ETC]: '기타 장소',
  };

  const deliveryInfo: MultiRowBase = [
    { subject: '받는분', contents: name },
    { subject: '핸드폰', contents: phoneNumber },
    {
      subject: '주소',
      contents: fullAddress,
    },
  ];

  if (pickupType) {
    deliveryInfo.push({
      subject: '받으실 장소',
      contents: OldReceivePlaceTextMap[pickupType],
    });

    // 문 앞은 별도의 요청 사항 작성이 없습니다.
    if (pickupType !== ReceivePlace.DOOR) {
      deliveryInfo.push({
        subject: pickupMapper[pickupType],
        contents: pickupDetail || EMPTY_COMMENT,
        ...(!pickupDetail && { className: 'gray-text' }),
      });
    }
  } else {
    // 택배 배송인 경우
    deliveryInfo.push({
      subject: '배송 기사 요청사항',
      contents: memo || EMPTY_COMMENT,
      ...(!memo && { className: 'gray-text' }),
    });
  }

  if (accessMethod) {
    const access =
      accessMethod === FrontDoorMethod.FREE
        ? FrontDoorMethodTextMap[accessMethod]
        : `${FrontDoorMethodTextMap[accessMethod]} (${accessDetail})`;

    deliveryInfo.push({
      subject: '공동현관 출입방법',
      contents: access,
    });
  }

  if (packingType) {
    deliveryInfo.push({
      subject: '포장 방법',
      contents: ReusablePackageTextMap[packingType],
    });
  }

  return deliveryInfo;
};
