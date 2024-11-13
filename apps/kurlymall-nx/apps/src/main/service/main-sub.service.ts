import type { MainSite } from '../interfaces/MainSection.interface';
import { fetchCarouselHorizontal } from '../../shared/api/main/mainSub';
import type { CarouselHorizontal } from '../interfaces/MainSub.interface';

const mainSiteKeyMap: Record<MainSite, string> = {
  BEAUTY: 'beauty',
  MARKET: 'market',
};

export async function getCarouselHorizontalPayload(
  site: MainSite,
  sectionId: number,
  page: number,
): Promise<CarouselHorizontal> {
  const data = await fetchCarouselHorizontal(mainSiteKeyMap[site], sectionId, page);
  const pagination = data.meta.pagination;
  return {
    banners: data.data.map(
      ({ id, title, subtitle, image_url, main_horizontal_banner_mobile_url, main_horizontal_banner_pc_url, link }) => ({
        id: Number(id),
        title,
        subtitle,
        link,
        imageUrl: image_url,
        mainHorizontalBannerMobileUrl: main_horizontal_banner_mobile_url,
        mainHorizontalBannerPcUrl: main_horizontal_banner_pc_url,
      }),
    ),
    pagination: {
      total: pagination.total,
      count: pagination.count,
      perPage: pagination.per_page,
      currentPage: pagination.current_page,
      totalPages: pagination.total_pages,
    },
  };
}
