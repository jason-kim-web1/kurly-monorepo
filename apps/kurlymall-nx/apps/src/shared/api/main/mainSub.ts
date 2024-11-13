import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';
import type { BaseResponse } from '../../interfaces';

const createApiEntryPath = (key: string) => `/main/v3/sites/${key}/sections`;

interface PaginationResponseData {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

interface BannerResponseData {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  main_horizontal_banner_mobile_url: string;
  main_horizontal_banner_pc_url: string;
  link: string;
}

interface FetchMetAdditionResponse extends BaseResponse<BannerResponseData[]> {
  meta: PaginationResponseData;
}

export async function fetchCarouselHorizontal(key: string, sectionId: number, page: number) {
  const path = `${createApiEntryPath(key)}/${sectionId}/main-banner-carousel-horizontal/banners?page=${page}`;
  try {
    const { data } = await httpClient.get<FetchMetAdditionResponse>(path);
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
}
