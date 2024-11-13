export const fetchCheckoutMember = jest.fn().mockResolvedValue({
  address: '인천 미추홀구 학익동 681-6',
  addressDetail: '102동 203호',
  email: 'purple@test.com',
  frozenPackingOption: 0,
  isGuest: false,
  mobile: '012-345-6789',
  name: 'purple',
  pointChargeRatio: 12,
  roadAddress: '인천 미추홀구 매소홀로418번길 21 (하나아파트)',
  starBoxPurchased: false,
  totalPoint: 499915860,
  zipCode: '222-26',
  zoneCode: '22226',
});

export const fetchOrderer = jest.fn().mockResolvedValue({
  name: '김컬리',
  email: 'kurly@kurlycorp.com',
  mobile_no: '010-1234-1234',
});
