import { get } from 'lodash';

interface Props {
  eventName: string;
}

export function getTemplate({ eventName }: Props) {
  const mainSectionMap: Record<string, { templateCode: string; templateType: string }> = {
    MAIN_BANNERS: {
      templateCode: 'main_banner',
      templateType: 'main_banner',
    },
    MAIN_BANNER_CAROUSEL: {
      templateCode: 'main_banner_carousel',
      templateType: 'main_banner',
    },
    MAIN_BANNER_CAROUSEL_HORIZONTAL: {
      templateCode: 'main_banner_carousel_horizontal',
      templateType: 'main_banner',
    },
    TODAY_RECOMMEND_PRODUCTS: {
      templateCode: 'today_recommendation',
      templateType: 'today_recommendation',
    },
    RANDOM_COLLECTION: {
      templateCode: 'random_collection',
      templateType: 'random_collection',
    },
    RANDOM_COLLECTION_NUMBER: {
      templateCode: 'random_collection_number',
      templateType: 'random_collection',
    },
    LINE_BANNERS: {
      templateCode: 'random_line_banner',
      templateType: 'line_banner',
    },
    SPECIAL_DEALS: {
      templateCode: 'special_deal',
      templateType: 'special_deal',
    },
    CLOSING_SALE: {
      templateCode: 'closing_sale',
      templateType: 'closing_sale',
    },
    RECIPES: {
      templateCode: 'kurly_recipe',
      templateType: 'kurly_recipe',
    },
    MD_CHOICES: {
      templateCode: 'md_choice',
      templateType: 'md_choice',
    },
    RANDOM_COLLECTION_ARTICLE: {
      templateCode: 'random_collection_article',
      templateType: 'random_collection_article',
    },
    GROUP_COLLECTION_CIRCLE: {
      templateCode: 'group_collection_circle',
      templateType: 'group_collection',
    },
    GROUP_COLLECTION_PRODUCT_NUMBER: {
      templateCode: 'group_collection_product_number',
      templateType: 'group_collection_product',
    },
    MAB_COLLECTION: {
      templateCode: 'mab_collection',
      templateType: 'mab_collection',
    },
    QUICK_MENU: {
      templateCode: 'quick_menu',
      templateType: 'quick_menu',
    },
    INSTAGRAM_REVIEW: { templateCode: '', templateType: '' },
  };

  return get(mainSectionMap, eventName, { templateType: null, templateCode: null });
}
