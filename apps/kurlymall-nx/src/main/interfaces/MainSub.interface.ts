export interface MainSubBanner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  mainHorizontalBannerMobileUrl: string;
  mainHorizontalBannerPcUrl: string;
  link: string;
}

export type MainSubBanners = MainSubBanner[];

export interface MainSubPagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface MainSubBannersTitle {
  title: string;
  subtitle: string;
  banners: MainSubBanners;
}

export interface CarouselHorizontal {
  banners: MainSubBanners;
  pagination: MainSubPagination;
}

export interface CarouselHorizontalAmplitudeData {
  title: string;
  link: string;
  index: number;
}
