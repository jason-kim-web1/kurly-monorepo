import { GenderType } from './GenderType';
import { PrivacyPolicyStatusType } from './PrivacyPolicyStatusType';
import { DeviceType } from './DeviceType';
import { InputType } from './InputType';
import { ButtonTemplate } from '../../mypage/my-kurly-style/shared/types/buttonTemplate';

//회원 프로필 개인정보 제공동의
export interface PrivacyPolicy {
  purpose: string;
  items: string;
  period: string;
  description: string;
}

//회원 프로필 개인정보 제공동의
export interface PrivacyPolicyParam {
  agreePrivacyPolicy: boolean;
}

//내 컬리 스타일 정보 조회
export interface MyKurlyStyle {
  birthYear: number | null;
  gender: GenderType | null;
  hasToddler: boolean;
  openProfile: boolean;
  privacyPolicyStatus: PrivacyPolicyStatusType;
  sites: Sites[];
}

export interface Sites {
  id: string;
  name: string;
  description: string;
  thumbnailImages: ThumbnailImage[];
  displayNewIcon: boolean;
  hasProfile: boolean;
  summary: string | null;
}

export interface ThumbnailImage {
  type: DeviceType;
  url: string;
}

//내 컬리 스타일 저장
export interface MyKurlyStyleParams {
  birthYear: string;
  gender: GenderType;
  hasToddler: boolean;
  openProfile: boolean;
}

//회원 사이트 프로필 정보 조회
export interface Profile {
  id: string;
  name: string;
  hasProfile: boolean;
  description: string;
  thumbnailImages: ThumbnailImage[];
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
  inputType: InputType;
  textLayout: null;
  selectLayout: SelectLayout;
  segments: Segment[];
}

interface SelectLayout {
  min: number;
  max: number;
  templateTypes: TemplateType;
}

export interface TemplateType {
  hasNotProfile: ButtonTemplate;
  hasProfile: 'BUTTON' | 'BUTTON_TAG';
}
export interface Segment {
  id: string;
  name: string;
  description: string | null;
  thumbnailImages: ThumbnailImage[] | null;
  selected: boolean;
}

//회원 사이트 프로필 정보 저장
export interface SiteIdParams {
  success: boolean;
  segments: string[];
}

//프로필 저장 후 상품추천
export interface RecommendProducts {
  memberName: string;
  products: RecommendProduct[];
}

export interface RecommendProduct {
  no: number;
  name: string;
  listImageUrl: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  discountedPrice: number | null;
  discountRate: number | null;
  isMultiplePrice: boolean;
  isGiftable: boolean;
  isSoldOut: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
}
