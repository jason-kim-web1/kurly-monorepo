export interface UserInfo {
  name: string;
  grade: string;
  id: string;
}

export interface Member {
  isGuest: boolean;
  name: string;
  email: string;
  mobile: string;
  address: string;
  roadAddress: string;
  addressDetail: string;
  zipcode: string;
  zonecode: string;
  starBoxPurchased: boolean;
  totalPoint: number;
  // api docs 에는 없으나 내려오고 있는 response
  pointChargeRatio: number;
  frozenPackingOption: number;
}
