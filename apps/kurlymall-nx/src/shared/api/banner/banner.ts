import { UnknownError } from '../../errors';

import { BaseResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';

interface TopBanner {
  text: string;
  link: string;
  is_open_new_tab: boolean;
}

interface TopBannerResponse {
  pc: TopBanner;
  mobile: TopBanner;
}

export const fetchTopBanner = async ({ accessToken }: { accessToken: string }) => {
  const url = '/banner/v1/top-bar';

  try {
    const {
      data: {
        data: { pc, mobile },
      },
    } = await httpClient.get<BaseResponse<TopBannerResponse>>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      pc: {
        text: pc.text || '',
        link: pc.link || '',
        isOpenNewTab: pc.is_open_new_tab || false,
      },
      mobile: {
        text: mobile.text || '',
        link: mobile.link || '',
        isOpenNewTab: mobile.is_open_new_tab || false,
      },
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};
