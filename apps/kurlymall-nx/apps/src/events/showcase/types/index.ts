type ProductContentType = 'INTRO_A' | 'INTRO_B' | 'INTRO_C' | 'TIP' | 'SELLER_INTERVIEW' | 'INTRO_WITH_GIF';

type KeywordElementType = 'text' | 'image' | 'svg' | 'gif';

interface ContentType {
  description: string;
  image: string;
  imageWidth?: string;
}

interface ProductContent {
  type: ProductContentType;
  title: string;
  content: ContentType[];
}

interface ProductType {
  contentNo: number;
  name: string;
  price: number;
  discountRate: number;
  contentList: ProductContent[];
  status: {
    isPurchase: boolean;
    isSoldOut: boolean;
  };
}

interface KeywordElement {
  type: KeywordElementType;
  value: string;
  isOuterLine: boolean;
}

interface ShowcaseIntroA {
  titleList: string[];
  startDate: string;
  endDate: string;
  image: string;
  meta: {
    bgColor?: string;
  };
}

interface ShowcaseIntroB {
  bgImage: string;
  elementMap: KeywordElement[][];
  subDescription: string;
}

interface BrandShowcaseIntro {
  subDescription: string;
  title: string;
  subTitle: string;
  imageList: string[];
  meta: {
    bgColor?: string;
  };
}

interface ProductSlide {
  title: string;
  description: string;
}

interface ShowcaseType {
  collectionSetCode: string;
  INTRO_A: ShowcaseIntroA | BrandShowcaseIntro;
  INTRO_B?: ShowcaseIntroB;
  productList: ProductType[];
  productSlide: ProductSlide;
}

interface ViewingProduct {
  currentIndex: number;
  contentNo: number;
  name: string;
  isPurchase: boolean;
}

export type {
  ProductContentType,
  KeywordElementType,
  ShowcaseType,
  ShowcaseIntroA,
  ShowcaseIntroB,
  BrandShowcaseIntro,
  KeywordElement,
  ProductType,
  ProductContent,
  ContentType,
  ViewingProduct,
  ProductSlide,
};
