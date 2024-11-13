export type BannerAccountType =
  | 'TOP_BAR_BANNER_PC_LOGOUT'
  | 'TOP_BAR_BANNER_PC_LOGIN'
  | 'TOP_BAR_BANNER_MOBILE_LOGOUT'
  | 'TOP_BAR_BANNER_MOBILE_LOGIN'
  | 'MY_KURLY_PC_WELCOME_BANNER'
  | 'MY_KURLY_MOBILE_WELCOME_BANNER'
  | 'MY_KURLY_PC_NORMAL_BANNER'
  | 'MY_KURLY_MOBILE_NORMAL_BANNER'
  | 'MY_KURLY_PC_KURLY_VVIP_BANNER'
  | 'MY_KURLY_MOBILE_KURLY_VVIP_BANNER'
  | 'MY_KURLY_PC_KURLY_VIP_BANNER'
  | 'MY_KURLY_MOBILE_KURLY_VIP_BANNER'
  | 'RECOMMENDATION'
  | 'COUPON_MOBILE_KURLY_MEMBERS'
  | 'ORDER_MOBILE_KURLY_MEMBERS_COUPON'
  | 'ORDER_PC_KURLY_MEMBERS_COUPON'
  | 'ORDER_MOBILE_KURLY_MEMBERS_COUPON_BOTTOM'
  | 'ORDER_PC_KURLY_MEMBERS_COUPON_BOTTOM'
  | 'ORDER_MOBILE_KURLY_MEMBERS_ORDER_INFO_BOTTOM'
  | 'ORDER_PC_KURLY_MEMBERS_ORDER_INFO_BOTTOM'
  | 'NOTIFICATION_CENTER_BANNER'
  | 'ORDER_KURLYPAY_KURLY_MEMBERS_BANNER_PC'
  | 'ORDER_KURLYPAY_KURLY_MEMBERS_BANNER_MOBILE';

export interface AdBannersResponse {
  id: number;
  daBannerAccount: string;
  daBannerAccountType: string;
  platform: string;
  title: string;
  image: string;
  imageUrl: string;
  link: string;
  sort: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  couponIds: string;
  locationTarget: string;
}

export const initialAdBanner: AdBannersResponse = {
  id: 0,
  daBannerAccount: '',
  daBannerAccountType: '',
  platform: '',
  title: '',
  image: '',
  imageUrl: '',
  link: '',
  sort: 0,
  startDate: '',
  endDate: '',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  updatedBy: '',
  couponIds: '',
  locationTarget: '',
};
