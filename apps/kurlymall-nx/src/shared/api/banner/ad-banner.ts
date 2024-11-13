import httpClient from '../../configs/http-client';

import { AdBannersResponse, BannerAccountType } from '../../interfaces/AdBannerResponse';

import { BaseApiResponse } from '../../interfaces';

export const fetchAdBanner = async ({ bannerAccount }: { bannerAccount: BannerAccountType }) => {
  const url = '/banner-cloud/da-banner/account';

  const { data } = await httpClient.get<BaseApiResponse<AdBannersResponse>>(url, {
    params: { bannerAccount },
  });

  return data.data;
};

export const fetchMyKurlyBanner = async () => {
  const url = '/banner-cloud/da-banner/account-set/MY_KURLY';

  const { data } = await httpClient.get<BaseApiResponse<AdBannersResponse[]>>(url);

  return data.data;
};
