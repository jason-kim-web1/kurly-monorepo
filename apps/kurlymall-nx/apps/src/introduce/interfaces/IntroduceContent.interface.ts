export interface IntroduceContent {
  id?: number;
  title: string;
  text: string;
  urlText?: string;
  url?: string;
  imgUrl?: string;
  imgUrlMo?: string;
  isExternalLink?: boolean;
}

export interface ThumbContent {
  id: number;
  title: string;
  text: string;
  imgUrl: string;
  imgUrlMo: string;
}

export interface SubPageContent {
  id?: number;
  title: string;
  text: string;
  imgUrl?: string;
  imgUrlMo?: string;
}

export interface CertifyPageContent {
  id: number;
  imgUrl: string;
  imgWidth?: number;
  imgHeight?: number;
  imgWidthMo?: number;
  imgHeightMo?: number;
  title: string;
  text: string;
}

export interface QualityStandardLists {
  name: string;
  url: string;
}

export interface QualityStandard {
  id: number;
  title: string;
  text: string;
  lists?: QualityStandardLists[];
}

export interface SustainableDistribution {
  id: number;
  text: string;
  subText: string;
  url: string;
  imgUrl: string;
  imgUrlMo: string;
}

export interface ProductSelection {
  id: number;
  title: string;
  text?: string;
  info?: IntroduceContent[];
}

export interface PackagingMaterials {
  id: number;
  title: string;
  text: string;
  subText?: string;
  imgUrl?: string;
  imgUrlMo?: string;
}

export interface ImageContent {
  id: number;
  imgUrl?: string;
  imgUrlMo?: string;
}

export interface TextContent {
  id: number;
  text: string;
}
