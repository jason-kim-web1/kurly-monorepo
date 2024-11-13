import { CategoryKindType } from '../../shared/reducers/category';

interface ImpressionSectionPayload {
  search_section_id: string;
}

interface ImpressionSectionItemPayload {
  search_section_id: string;
  item_position: number;
  url: string | null;
}

interface QuickMenuImpressionSectionPayload extends ImpressionSectionPayload {
  readonly search_section_id: 'main_category_quick_menu';
}

interface QuickMenuImpressionSectionItemPayload extends ImpressionSectionItemPayload {
  readonly search_section_id: 'main_category_quick_menu';
  content_title: string;
  item_policy: `${CategoryKindType},${string}`;
  item_policy_detail: 'main_category_quick_menu_banner' | null;
}

interface MainCategoryBannerImpressionSectionPayload extends ImpressionSectionPayload {
  readonly search_section_id: 'main_category_banner';
  primary_category_id: string;
  primary_category_name: string;
}

interface MainCategoryBannerImpressionSectionItemPayload extends ImpressionSectionItemPayload {
  readonly search_section_id: 'main_category_banner';
  title: string;
  primary_category_id: string;
  primary_category_name: string;
}

export type {
  QuickMenuImpressionSectionPayload,
  QuickMenuImpressionSectionItemPayload,
  MainCategoryBannerImpressionSectionPayload,
  MainCategoryBannerImpressionSectionItemPayload,
};
