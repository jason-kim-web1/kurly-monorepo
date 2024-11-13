import {
  MainInstagramReviewSection,
  MainSection,
  MainSectionType,
  MainSite,
  MdChoicesPayload,
  SpecialDealPayload,
} from '../interfaces/MainSection.interface';
import {
  fetchClosingSaleProducts,
  fetchInstagramReviews,
  fetchMainBanners,
  fetchMainLineBannerSection,
  fetchMainMdChoicesSection,
  fetchMainRecipes,
  fetchMainSections,
  fetchMainSpecialDealsSection,
  fetchMdChoiceProducts,
  fetchRandomCollectionProducts,
  fetchTodayRecommendProducts,
  MainProductResponseData,
  fetchRandomCollectionArticle,
  fetchGroupCollectionCircle,
  fetchMainCarouselBanners,
  fetchMabCollectionProducts,
  fetchMainCarouselHorizontalBanners,
  fetchQuickMenus,
  fetchRandomCollectionNumberProducts,
  fetchGroupCollectionNumber,
} from '../../shared/api/main/main.api';
import { createProductData } from '../../shared/services/product.service';
import { ProductData } from '../../shared/interfaces';
import { MainPopupNotice } from '../interfaces/PopupNotice.interface';
import { fetchMainPopupNotices } from '../../shared/api/main/notice.api';
import { createCollectionUrl, createCollectionGroupsUrl } from '../util/mainSiteUtil';
import { PRODUCT_PATH, getPageUrl } from '../../shared/constant';
import { fetchAppConfig } from '../../shared/api/app-config/AppConfig';
import { AppConfig } from '../../shared/interfaces/AppConfig';

export const createSectionKey = ({ id, type, panelId }: Pick<MainSection<unknown>, 'id' | 'type' | 'panelId'>) =>
  `${id}_${type}_${panelId}`;

const mainSectionTypeMap: Record<string, MainSectionType> = {
  main_banner: 'MAIN_BANNERS',
  main_banner_carousel: 'MAIN_BANNER_CAROUSEL',
  main_banner_carousel_horizontal: 'MAIN_BANNER_CAROUSEL_HORIZONTAL',
  quick_menu: 'QUICK_MENU',
  today_recommendation: 'TODAY_RECOMMEND_PRODUCTS',
  random_line_banner: 'LINE_BANNERS',
  random_collection: 'RANDOM_COLLECTION',
  random_collection_number: 'RANDOM_COLLECTION_NUMBER',
  closing_sale: 'CLOSING_SALE',
  md_choice: 'MD_CHOICES',
  kurly_recipe: 'RECIPES',
  special_deal: 'SPECIAL_DEALS',
  random_collection_article: 'RANDOM_COLLECTION_ARTICLE',
  group_collection_circle: 'GROUP_COLLECTION_CIRCLE',
  group_collection_product_number: 'GROUP_COLLECTION_PRODUCT_NUMBER',
  mab_collection: 'MAB_COLLECTION',
} as const;

export const mainSiteKeyMap: Record<MainSite, Lowercase<MainSite>> = {
  BEAUTY: 'beauty',
  MARKET: 'market',
};

// 프론트에서 하단에 하드코딩하는 구좌
const marketAdditionalSections: MainSection<unknown>[] = [
  {
    id: 1000,
    type: 'INSTAGRAM_REVIEW',
    key: `1000_INSTAGRAM_REVIEW`,
    isError: false,
    isLoading: true,
    inView: false,
    hasLoaded: false,
    panelId: '1',
  } as MainSection<MainInstagramReviewSection>,
];

export async function getMainSections(site: MainSite): Promise<MainSection<unknown>[]> {
  const sections = await fetchMainSections(mainSiteKeyMap[site]);
  const mainSections = sections.data.map(({ id, design_type: type, url }) => {
    const internalType = mainSectionTypeMap[type];
    const panelId = sections.meta.panel_id?.toString() ?? '1';
    return {
      id,
      type: internalType,
      key: createSectionKey({
        id,
        type: internalType,
        panelId,
      }),
      isError: false,
      isLoading: true,
      inView: false,
      hasLoaded: false,
      panelId,
      url,
    };
  });

  if (site === 'MARKET') {
    return [...mainSections, ...marketAdditionalSections];
  }

  return mainSections;
}

export async function getMainBannerPayload(site: MainSite, sectionId: number) {
  const banners = await fetchMainBanners(mainSiteKeyMap[site], sectionId);

  return {
    banners: banners.map(({ id, link, image_url, main_banner_pc_url, main_banner_mobile_url }) => ({
      id: Number(id),
      imageUrl: image_url,
      link,
      mainBannerPcUrl: main_banner_pc_url,
      mainBannerMobileUrl: main_banner_mobile_url,
    })),
  };
}

export async function getMainCarouselBannerPayload(site: MainSite, sectionId: number) {
  const { data } = await fetchMainCarouselBanners(mainSiteKeyMap[site], sectionId);

  return {
    title: data.title,
    subtitle: data.subtitle,
    banners: data.data.map(
      ({ id, title, subtitle, image_url, link, main_vertical_banner_pc_url, main_vertical_banner_mobile_url }) => ({
        id: Number(id),
        title,
        subtitle,
        link,
        imageUrl: image_url,
        mainVerticalBannerPcUrl: main_vertical_banner_pc_url,
        mainVerticalBannerMobileUrl: main_vertical_banner_mobile_url,
      }),
    ),
  };
}

export async function getMainCarouselHorizontalBannerPayload(site: MainSite, sectionId: number) {
  const { data } = await fetchMainCarouselHorizontalBanners(mainSiteKeyMap[site], sectionId);

  return {
    title: data.title,
    subtitle: data.subtitle,
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
  };
}

export async function getQuickMenusPayload(site: MainSite, sectionId: number) {
  const { data } = await fetchQuickMenus(mainSiteKeyMap[site], sectionId);
  const { id, title: sectionTitle, subtitle, template_code, template_type, data: quickMenuRows } = data;
  const { max_menu_count, rows } = quickMenuRows;

  return {
    id,
    templateCode: template_code,
    templateType: template_type,
    title: sectionTitle,
    subtitle,
    data: {
      maxMenuCount: max_menu_count,
      rows: rows.map((row) => {
        return row.map((rowItem) => {
          const { title, image_url, main_icon_url, lottie_url, lottie_loop, link, is_new } = rowItem;
          return {
            title,
            imageUrl: image_url,
            resizedImageUrl: main_icon_url,
            lottieUrl: lottie_url,
            lottieLoop: lottie_loop,
            link,
            isNew: is_new,
          };
        });
      }),
    },
  };
}

export const createMainProductData = (data: MainProductResponseData) =>
  createProductData({
    no: data.no,
    name: data.name,
    shortDescription: data.short_description,
    listImageUrl: data.list_image_url,
    salesPrice: data.sales_price,
    discountedPrice: data.discounted_price,
    discountRate: data.discount_rate,
    isBuyNow: data.is_buy_now,
    isGiftable: data.is_giftable,
    canRestockNotify: data.can_restock_notify,
    isOnlyAdult: data.is_only_adult,
    tags: data.tags,
    productViewStatus: data.product_view_status,
    deliveryTypeNames: (data.delivery_type_infos || []).map(({ description }) => description),
    deliveryTypeInfos: data.delivery_type_infos,
    groupProduct: {
      isGroup: data.group_product.is_group,
      isNotRepresentative: data.group_product.is_not_representative,
    },
    isPurchaseStatus: data.is_purchase_status,
    isMultiplePrice: data.is_multiple_price,
    notPurchaseMessage: data.not_purchase_message,
    soldOutTitle: data.sold_out_title,
    soldOutText: data.sold_out_text,
    reviewCount: data.review_count ?? '',
    productVerticalMediumUrl: data.product_vertical_medium_url,
    stickers_v2: data.stickers_v2,
  });

export async function getTodayRecommendProductPayload(site: MainSite, sectionId: number) {
  const { data } = await fetchTodayRecommendProducts(mainSiteKeyMap[site], sectionId);
  const { title, data: products } = data;

  return {
    title,
    products: products.map(createMainProductData),
  };
}

export async function getRandomCollectionPayload(site: MainSite, sectionId: number) {
  const { title, subtitle, data } = await fetchRandomCollectionProducts(mainSiteKeyMap[site], sectionId);
  const { collection_code: collectionCode, has_more: hasMore } = data;

  return {
    title,
    subtitle,
    hasMore,
    collectionCode,
    landingUrl: createCollectionUrl(site, collectionCode),
    products: data.products.map(createMainProductData),
  };
}

export async function getRandomCollectionNumberPayload(site: MainSite, sectionId: number) {
  const { title, subtitle, data } = await fetchRandomCollectionNumberProducts(mainSiteKeyMap[site], sectionId);
  const { collection_code: collectionCode, has_more: hasMore } = data;

  return {
    title,
    subtitle,
    hasMore,
    collectionCode,
    landingUrl: createCollectionUrl(site, collectionCode),
    products: data.products.map(createMainProductData),
  };
}

export async function getMabCollectionPayload(site: MainSite, sectionId: number, panelId: string) {
  const { title, subtitle, data } = await fetchMabCollectionProducts(mainSiteKeyMap[site], sectionId, panelId);
  const { collection_code: collectionCode, has_more: hasMore } = data;

  return {
    title,
    subtitle,
    hasMore,
    collectionCode,
    landingUrl: createCollectionUrl(site, collectionCode),
    products: data.products.map(createMainProductData),
  };
}

export async function getRandomCollectionArticlePayload(site: MainSite, sectionId: number) {
  const {
    title,
    subtitle,
    data: {
      collection_code: collectionCode,
      has_more: hasMore,
      image_url: imageUrl,
      main_image_description_mobile_url: mainImageDescriptionMobileUrl,
      main_image_description_pc_url: mainImageDescriptionPcUrl,
      description,
      products,
    },
  } = await fetchRandomCollectionArticle(mainSiteKeyMap[site], sectionId);

  return {
    title,
    subtitle,
    hasMore,
    collectionCode,
    imageUrl,
    description,
    mainImageDescriptionMobileUrl,
    mainImageDescriptionPcUrl,
    landingUrl: hasMore ? createCollectionUrl(site, collectionCode) : null,
    products: products.map(createMainProductData),
  };
}

export async function getGroupCollectionCirclePayload(site: MainSite, sectionId: number) {
  const {
    title,
    subtitle,
    data: { collection_group_code: collectionCode, has_more: hasMore, collections },
  } = await fetchGroupCollectionCircle(mainSiteKeyMap[site], sectionId);

  return {
    title,
    subtitle,
    hasMore,
    collectionCode,
    landingUrl: hasMore ? createCollectionGroupsUrl(site, collectionCode) : null,
    collections: collections.map(
      ({ code, name, thumbnail_image_url, collection_thumbnail_mobile_url, collection_thumbnail_pc_url }) => ({
        code,
        name,
        thumbnailImageUrl: thumbnail_image_url,
        collectionThumbnailMobileUrl: collection_thumbnail_mobile_url,
        collectionThumbnailPcUrl: collection_thumbnail_pc_url,
      }),
    ),
  };
}

export async function getGroupCollectionNumberPayload(site: MainSite, sectionId: number) {
  const {
    id,
    title,
    subtitle,
    data: { collection_group_code: collectionGroupCode, collection_code: collectionCode, collections },
  } = await fetchGroupCollectionNumber(site, sectionId);

  return {
    id,
    title,
    subtitle,
    collectionGroupCode,
    collectionCode,
    collections,
    landingUrl: createCollectionGroupsUrl(site, collectionGroupCode, collectionCode),
  };
}

export async function getClosingSalePayload(site: MainSite, sectionId: number) {
  const { title, subtitle, data } = await fetchClosingSaleProducts(mainSiteKeyMap[site], sectionId);
  const collectionCode = data.collection_code;
  const hasMore = data.has_more;
  return {
    title,
    subtitle,
    collectionCode,
    products: data.products.map(createMainProductData),
    hasMore,
    landingUrl: createCollectionUrl(site, collectionCode),
  };
}

export async function getMainLineBannerPayload(site: MainSite, sectionId: number) {
  const { data } = await fetchMainLineBannerSection(mainSiteKeyMap[site], sectionId);

  const {
    title,
    subtitle,
    link,
    image_url: imageUrl,
    main_line_banner_mobile_url: mainLineBannerMobileUrl,
    main_line_banner_pc_url: mainLineBannerPcUrl,
    id,
    background_color: backgroundColor,
    text_color: textColor,
  } = data;

  return {
    title,
    bannerId: Number(id),
    bannerType: imageUrl ? 'IMAGE' : 'TEXT',
    text: {
      subtitle,
      textColor,
      backgroundColor,
    },
    image: {
      imageUrl,
      mainLineBannerMobileUrl,
      mainLineBannerPcUrl,
    },
    link,
  };
}

export async function getMainSpecialDealsPayload(site: MainSite, sectionId: number): Promise<SpecialDealPayload> {
  const data = await fetchMainSpecialDealsSection(mainSiteKeyMap[site], sectionId);

  return {
    title: data.title,
    subtitle: data.subtitle,
    additionalText: data.additional_text ?? '',
    deals: data.data.map((it) => ({
      product: {
        ...createMainProductData(it.product),
        quantity: it.quantity,
      },
      isDisplayTime: it.is_display_time,
      isSoldOut: it.is_sold_out,
      soldOutTitle: it.sold_out_title,
      soldOutContent: it.sold_out_content,
      dealExpired: new Date() > new Date(it.promotion_end_time),
      dealExpireTime: it.promotion_end_time,
      thumbnailImageUrl: it.thumbnail_image_url,
      productHorizontalLargeUrl: it.product_horizontal_large_url,
    })),
  };
}

export async function getMdChoiceProducts(site: MainSite, sectionId: number, code: string): Promise<ProductData[]> {
  const results = await fetchMdChoiceProducts(mainSiteKeyMap[site], sectionId, code);
  return results.map(createMainProductData);
}

export async function getMainMdChoicesPayload(site: MainSite, sectionId: number): Promise<MdChoicesPayload> {
  const {
    title,
    subtitle,
    data,
    additional_text: additionalText,
  } = await fetchMainMdChoicesSection(mainSiteKeyMap[site], sectionId);

  const { default_code: defaultCode } = data;

  const defaultProducts = await getMdChoiceProducts(site, sectionId, defaultCode);

  return {
    title,
    subtitle,
    additionalText,
    options: data.md_choices.map(({ name, code }) => ({
      name,
      code,
      selected: code === defaultCode,
      products: code === defaultCode ? defaultProducts : [],
      loading: code !== defaultCode,
      link: `${getPageUrl(PRODUCT_PATH.categories)}/${code}`,
    })),
  };
}

export async function getMainRecipes(site: MainSite, sectionId: number) {
  const { title, subtitle, data } = await fetchMainRecipes(mainSiteKeyMap[site], sectionId);

  return {
    title,
    subtitle,
    recipes: data.map(({ no, title: recipeTitle, link, image_url: imageUrl, main_recipe_url: mainRecipeUrl }) => ({
      no,
      title: recipeTitle,
      link,
      imageUrl,
      mainRecipeUrl,
    })),
  };
}

export async function getMainPopupNotices(): Promise<MainPopupNotice[]> {
  const data = await fetchMainPopupNotices();
  return data.map((notice) => {
    const { title, name, id, popup, content, buttons, pc, mobile } = notice;

    return {
      title,
      content,
      id,
      name,
      buttons: buttons.map((button) => ({
        noShowHours: button.no_show_hours,
        label: button.label,
      })),
      mobile: {
        link: mobile.link,
        content: mobile.content,
      },
      pc: {
        content: pc.content,
        link: pc.link,
      },
      showOrder: notice.show_order,
      closeOption: notice.close_option,
      popup: {
        link: popup.link,
        url: popup.url,
      },
    };
  });
}

export async function getInstagramReviewPayload() {
  const { title, subtitle, reviews } = await fetchInstagramReviews();

  return {
    title,
    subtitle,
    reviews: reviews.map(({ thumbnail_image_url, landing_url }) => ({
      imageUrl: thumbnail_image_url,
      landingUrl: landing_url,
    })),
  };
}

export async function getAppConfig(appConfig?: AppConfig): Promise<AppConfig | null> {
  if (appConfig) return appConfig;

  try {
    return await fetchAppConfig();
  } catch (err) {
    console.error(err);

    return null;
  }
}
