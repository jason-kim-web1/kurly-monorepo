import { getFile } from '../../common';
import { UnknownError } from '../../../errors';
import { isProduction, RESOURCE_URL } from '../../../configs/config';
import { GradeName } from '../../../enums';

export interface MemberBenefitUpdate {
  title: string;
  defaultVersion: string;
  updateVersion: string;
  updateDate: Date;
}

export interface GiftHistoryList {
  id: string;
  name: string;
  thumbImgPC: string;
  thumbImgMobile: string;
  goodsNo: number;
}

export interface GradeBenefitList {
  id: GradeName;
  orderPriceSum: number;
  reviewPoint?: string;
  pointRate: number;
  gift?: string;
  benefitPrice: number;
  benefitPriceSum: string;
  outerBenefitPC?: string[];
  outerBenefitMW?: string[];
}

export interface LoversBenefitInfo {
  title: string;
  giftName: string;
  giftDescription: string;
  giftImgPC: string;
  giftImgMobile: string;
  giftBackgroundColor: string;
  giftHistory: GiftHistoryList[];
  gradeBenefit: GradeBenefitList[];
  gradeBenefitTerms: string[];
  currentMonthGift: string;
}

// 멤버스 제도
export interface DefaultBenefitList {
  text: string;
  icon: string;
}

export interface CouponPackList {
  id: string;
  badge?: string;
  text: string;
  count: string;
}

export interface CouponPackContents {
  id: string;
  text: string;
  list: CouponPackList[];
  styleColor: {
    bg: string;
    title: string;
    round: string;
    count: string;
    border: string;
  };
}

export interface BenefitShared {
  title: string;
  kakaoTemplateId: number;
  link: string;
}

export interface MembersBenefitInfo {
  title: string;
  description: string;
  defaultBenefit: {
    title: string;
    list: DefaultBenefitList[];
    styleColorBg: string;
  };
  couponPack: {
    title: string;
    contents: CouponPackContents[];
  };
  caution: string[];
  shared: BenefitShared;
  buttonText: string;
}

export interface FriendBenefitUpdate {
  title: string;
  defaultVersion: string;
  updateVersion: string;
  doubleStartDate: Date;
  doubleEndDate: Date;
}

export interface AddNotice {
  text: string;
}

export interface FriendBenefitInfo {
  title: string;
  description: string;
  imgUrlPC: string;
  imgUrlMobile: string;
  kakaoTemplateId: {
    dev: number;
    prod: number;
  };
  joinBenefitUrl: string;
  shareEventUrl?: string;
  addNotice: AddNotice[];
}

// VIP 제도
export interface VipInfoList {
  title: string;
  subList?: string[];
}

export interface VipDropdown {
  vvipTag?: string;
  title: string;
  subTitle: string;
  list: VipInfoList[];
}

export interface VipTabs {
  id: string;
  rank: string;
  dropdown: VipDropdown[];
}

export interface VipNoticeInfo {
  title: string;
  text: string;
  subTitle: string;
  table: string;
  list: VipInfoList[];
}

export interface SelectionCriteria {
  title: string;
  text: string;
}

export interface VipBenefitInfo {
  title: string;
  description: string;
  selectionCriteria: SelectionCriteria[];
  tabs: VipTabs[];
  notice: VipNoticeInfo;
}

export interface PaymentBenefitsDate {
  startDate: string;
  endDate: string;
}

export interface PaymentBenefitsHead {
  headTitle: string;
  headText?: string;
  iconUrl: string;
  pcIconWidth: string;
  pcIconHeight: string;
  moWebIconWidth: string;
  moWebIconHeight: string;
  benefitDate: string;
}

export interface PaymentBenefitsContent {
  titleInfo: {
    subTitle?: string;
    subTitleIcon?: string;
    mainTitle: string;
  };
  bubbleBox: {
    bubbleText: string;
    bubbleBgColor: string;
    bubbleTextColor: string;
  };
  detailInfo: {
    detailTitleColor: string;
    detailContent: DetailContent[];
  };
}

export interface DetailContent {
  detailTitle: string;
  detailText: string;
  detailList?: string[];
}

export interface PaymentBenefitsNoticeInfo {
  subTitle?: string;
  noticeList: NoticeList[];
}

export interface NoticeList {
  text: string;
  subList?: string[];
  subListDot?: string[];
  subListHyphen?: string[];
}

export interface PaymentBenefitsNotice {
  noticeTitle: string;
  noticeInfo: PaymentBenefitsNoticeInfo[];
}

export interface PaymentBenefitsData {
  id: string;
  menu: string;
  date: PaymentBenefitsDate;
  head: PaymentBenefitsHead;
  content: PaymentBenefitsContent[];
  notice: PaymentBenefitsNotice[];
}

export interface PaymentBenefitsInfo {
  id: string;
  data: PaymentBenefitsData[];
}

// 컬리러버스 혜택
export const fetchLoversBenefitUpdate = async (): Promise<MemberBenefitUpdate> => {
  const url = `${RESOURCE_URL}/json/member-benefit/lovers/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    return await getFile<MemberBenefitUpdate>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchLoversBenefitInfo = async (version: string): Promise<LoversBenefitInfo> => {
  const url = `${RESOURCE_URL}/json/member-benefit/lovers/${version}.json`;
  try {
    return await getFile<LoversBenefitInfo>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

// 컬리 멤버스 제도 안내
export const fetchMembersBenefitUpdate = async (): Promise<MemberBenefitUpdate> => {
  const url = `${RESOURCE_URL}/json/member-benefit/members/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    return await getFile<MemberBenefitUpdate>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchMembersBenefitInfo = async (version: string): Promise<MembersBenefitInfo> => {
  const url = `${RESOURCE_URL}/json/member-benefit/members/${version}.json`;
  try {
    return await getFile<MembersBenefitInfo>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

// VIP 제도 안내
export const fetchVipBenefitUpdate = async (): Promise<MemberBenefitUpdate> => {
  const url = `${RESOURCE_URL}/json/member-benefit/vip/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    return await getFile<MemberBenefitUpdate>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchVipBenefitInfo = async (version: string): Promise<VipBenefitInfo> => {
  const url = `${RESOURCE_URL}/json/member-benefit/vip/${version}.json`;
  try {
    return await getFile<VipBenefitInfo>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

// 친구초대
export const fetchFriendBenefitUpdate = async (): Promise<FriendBenefitUpdate> => {
  const url = `${RESOURCE_URL}/json/member-benefit/friend/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    return await getFile<FriendBenefitUpdate>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchFriendBenefitInfo = async (version: string): Promise<FriendBenefitInfo> => {
  const url = `${RESOURCE_URL}/json/member-benefit/friend/${version}.json`;
  try {
    return await getFile<FriendBenefitInfo>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

// 결제혜택
export const fetchPaymentBenefitsUpdate = async (): Promise<MemberBenefitUpdate> => {
  const url = `${RESOURCE_URL}/json/member-benefit/payment/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    return await getFile<MemberBenefitUpdate>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchPaymentBenefitsInfo = async (version: string): Promise<PaymentBenefitsInfo> => {
  const url = `${RESOURCE_URL}/json/member-benefit/payment/${version}.json`;
  try {
    return await getFile<PaymentBenefitsInfo>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};
