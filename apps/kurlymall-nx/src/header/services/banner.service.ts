import { fetchAdBanner, fetchMyKurlyBanner } from '../../shared/api/banner/ad-banner';
import { AdBannersResponse, BannerAccountType } from '../../shared/interfaces/AdBannerResponse';

export const getDaBanner = (params: BannerAccountType): Promise<AdBannersResponse> => {
  return fetchAdBanner({ bannerAccount: params });
};

export const getMyKurlyDaBanner = (): Promise<AdBannersResponse[]> => {
  return fetchMyKurlyBanner();
};
