import { isEmpty } from 'lodash';
import { format, isAfter, isBefore } from 'date-fns';

import { AddressData } from 'react-daum-postcode';

import { BaseAddressType, CutOffProps, DeliveryProps, DeliveryType } from '../interfaces/ShippingAddress';

// 컬리 API 호출용으로 주소 재가공
export const refinementAddress = ({
  address,
  roadAddress,
  autoRoadAddress,
  jibunAddress,
  autoJibunAddress,
  zonecode,
  buildingName = '',
  userSelectedType,
}: AddressData): DeliveryProps => {
  const fullRoadAddr = roadAddress || autoRoadAddress;
  const fullJibunAddr = jibunAddress || autoJibunAddress;

  return {
    roadZoneCode: zonecode,
    zipcode: zonecode,
    address: fullJibunAddr || address,
    roadAddress: `${fullRoadAddr}${!isEmpty(buildingName) ? ` (${buildingName})` : ''}`,
    baseAddressType: userSelectedType === 'R' ? BaseAddressType.road : BaseAddressType.jibun,
    addressDetail: '',
  };
};

// 컷오프 정책 시간대에 속해있는지 여부를 반환합니다.
// 예를 들어 설날, 택배 파업 등으로 컷오프는 실시간으로 변경 됩니다.
export const isAvailableTime = ({ startAt, endAt, noticeMessage }: CutOffProps) => {
  const now = new Date();

  const startCutOff = format(now, `YYYY-MM-DD ${startAt}`);
  const endCutOff = format(now, `YYYY-MM-DD ${endAt}`);

  const beforeStartCutOff: boolean = isBefore(new Date(startCutOff), now);
  const afterEndCutOff: boolean = isAfter(new Date(endCutOff), now);

  return {
    available: beforeStartCutOff && afterEndCutOff,
    noticeMessage,
  };
};

export const checkShippingUnavailable = (type: DeliveryType | null) => type === 'disable';
