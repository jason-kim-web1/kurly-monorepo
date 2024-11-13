import COLOR from '../../../../shared/constant/colorset';
import { FrontDoorMethod, PickupDetailCategory } from '../../../../shared/enums';

export const InputBoxPcStyles = {
  '> label': {
    fontWeight: 500,
    fontSize: '14px',
    padding: '0 0 8px',
  },
  input: {
    borderRadius: '3px',
    fontSize: '14px',
    '::placeholder': {
      color: COLOR.kurlyGray350,
    },
  },
};

export const InputBoxMobileStyles = {
  '> label': {
    fontWeight: 600,
    fontSize: '16px',
    padding: '0 0 8px',
  },
  '> span': {
    fontSize: '16px',
  },
  input: {
    fontSize: '16px',
    '::placeholder': {
      color: COLOR.kurlyGray350,
    },
  },
};

export const RECEIVE_PLACE_FRONT_DOOR_MESSAGES: Record<FrontDoorMethod, string[]> = {
  PASSWORD: ['비밀번호가 정확하지 않을 경우, 부득이하게 1층 공동현관 앞에 배송 될 수 있습니다.'],
  FREE: ['자유출입이 불가능한 경우, 부득이하게 1층 공동현관 앞에 배송될 수 있습니다.'],
  CALL_SECURITY_OFFICE: ['경비 부재로 출입이 불가능한 경우, 부득이하게 1층 공동현관 앞에 배송될 수 있습니다.'],
  ETC: [
    '요청하신 방법으로 출입이 어려운 경우, 부득이하게 1층 공동현관 앞에 배송될 수 있습니다.',
    '배송 받으실 시간은 별도로 지정하실 수 없습니다.',
  ],
};

export const RECEIVE_PLACE_ETC_MESSAGES: Record<PickupDetailCategory, string[]> = {
  ETC: [
    '정확한 배송을 위해 장소의 특징 또는 출입 방법 등을 자세하게 작성해주세요.',
    '무인택배함, 보일러실, 양수기 함, 소화전 앞 또는 위탁배송은 불가능합니다.',
    '요청하신 장소로 배송이 어려운 경우, 부득이하게 1층 공동현관 앞에 배송 될 수 있습니다.',
    '배송 받으실 시간은 별도로 지정할 수 없습니다.',
  ],
  PICKUP_BOX: [
    '정확한 배송을 위해 장소의 특징 또는 출입 방법 등을 자세하게 작성해주세요.',
    '무인택배함, 보일러실, 양수기 함, 소화전 앞 또는 위탁배송은 불가능합니다.',
    '요청하신 장소로 배송이 어려운 경우, 부득이하게 1층 공동현관 앞에 배송 될 수 있습니다.',
    '배송 받으실 시간은 별도로 지정할 수 없습니다.',
  ],
  FRONT_OF_ENTRANCE: [
    '정확한 배송을 위해 장소의 특징 또는 출입 방법 등을 자세하게 작성해주세요.',
    '무인택배함, 보일러실, 양수기 함, 소화전 앞 또는 위탁배송은 불가능합니다.',
    '배송 받으실 시간은 별도로 지정할 수 없습니다.',
  ],
};
