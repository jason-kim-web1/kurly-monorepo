import { camelCase, transform } from 'lodash';

import httpClient from '../../configs/http-client';

import { PrimaryCategory, CategoryKindType, CategoryBanner } from '../../reducers/category';

import { UnknownError } from '../../errors';

interface SubCategoryGroups {
  kind: CategoryKindType;
  code: string;
  name: string;
}

interface BannerResponse {
  mobile_link: string;
  mobile_image_url: string;
  title: string;
  sub_title: string;
}

interface FetchCategory {
  kind: CategoryKindType;
  code: string;
  name: string;
  position: number;
  pc_icon_url: string;
  pc_icon_active_url: string;
  mobile_icon_url: string;
  mobile_icon_active_url: string;
  mobile_icon_v2_url: string;
  thumbnail_url: string;
  is_new: boolean;
  is_show_all: boolean;
  sub_category_groups: SubCategoryGroups[];
  mobile_link: string;
  mobile_lottie_url: string;
  mobile_lottie_loop: number | null;
  banners: BannerResponse[];
}

interface CategoryData {
  main: FetchCategory[];
  quick: FetchCategory[];
}

interface CategoryMeta {
  recommend: {
    pc_icon_url: string;
    pc_icon_active_url: string;
  };
  is_new: {
    mobile_icon_url: string;
    pc_icon_url: string;
  };
}

interface CategoryResponse {
  data: CategoryData;
  meta: CategoryMeta;
}

const GIFT_CATEGORIES = ['772', '375'];
// @Todo 선물하기 웹 오픈시 삭제
const omitGiftCategory = (data: FetchCategory): boolean => !GIFT_CATEGORIES.includes(data.code);

const createCategory = (data: FetchCategory): PrimaryCategory => {
  return {
    kind: data.kind,
    code: data.code,
    name: data.name,
    position: data.position,
    pcIconUrl: data.pc_icon_url,
    pcIconActiveUrl: data.pc_icon_active_url,
    mobileIconUrl: data.mobile_icon_url,
    mobileIconActiveUrl: data.mobile_icon_active_url,
    mobileIconV2Url: data.mobile_icon_v2_url,
    thumbnailUrl: data.thumbnail_url,
    isNew: data.is_new,
    isShowAll: data.is_show_all,
    subCategoryGroups: data.sub_category_groups,
    mobileLink: data.mobile_link,
    mobileLottieUrl: data.mobile_lottie_url,
    mobileLottieLoop: data.mobile_lottie_loop,
    banners: data.banners.map(
      (item) => transform(item, (acc, value, key) => (acc[camelCase(key) as keyof CategoryBanner] = value)),
      {},
    ),
  };
};

export const fetchCategory = async (siteKey: string) => {
  const url = `/collection/v2/home/sites/${siteKey}/category-groups`;

  try {
    const { data } = await httpClient.get<CategoryResponse>(url);

    const categories = data.data.main.filter(omitGiftCategory).map(createCategory);
    const quick = data.data.quick?.filter(omitGiftCategory).map(createCategory) || [];
    // TODO nullable 처리 제거 필요. 현재 beauty dev API 에서는 안내려오는 중

    const categoriesMeta = {
      recommendCategoriesName: '컬리의 추천',
      recommend: {
        pcIconUrl: data.meta.recommend.pc_icon_url,
        pcIconActiveUrl: data.meta.recommend.pc_icon_active_url,
      },
      isNew: {
        pcIconUrl: data.meta.is_new.pc_icon_url,
        mobileIconUrl: data.meta.is_new.mobile_icon_url,
      },
    };

    return {
      categories,
      categoriesMeta,
      quick,
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};
