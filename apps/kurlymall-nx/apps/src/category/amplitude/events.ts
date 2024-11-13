import { Category, CategoryKindType } from '../../shared/reducers/category';
import { amplitudeService } from '../../shared/amplitude';
import { AmplitudeEvent } from '../../shared/amplitude/AmplitudeEvent';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import {
  MainCategoryBannerImpressionSectionItemPayload,
  MainCategoryBannerImpressionSectionPayload,
  QuickMenuImpressionSectionItemPayload,
  QuickMenuImpressionSectionPayload,
} from './types';

const logPrimaryCategoryItem = ({ code, name }: Pick<Category, 'code' | 'name'>) => {
  amplitudeService.logEvent(
    new AmplitudeEvent('select_primary_category', {
      primary_category_id: code,
      primary_category_name: name,
    }),
  );
};

const logSecondaryCategoryItem = (
  item: Pick<Category, 'code' | 'name'>,
  secondaryItem: Partial<Pick<Category, 'code' | 'name'>>,
) => {
  amplitudeService.logEvent(
    new AmplitudeEvent('select_category', {
      primary_category_id: item.code,
      primary_category_name: item.name,
      secondary_category_id: secondaryItem.code,
      secondary_category_name: secondaryItem.name,
    }),
  );
};

const logSiteChange = (site: MainSite, selectionType: 'top_category' | 'swipe_category') => {
  amplitudeService.logEvent(
    new AmplitudeEvent('select_site', {
      site_info: site.toLocaleLowerCase(),
      selection_type: selectionType,
    }),
  );
};

const logSelectQuickMenu = (payload: {
  selection_type: 'main_category_quick_menu';
  item_position: number;
  item_policy: `${CategoryKindType},${string}`;
  content_title: string;
  url: string | null;
}) => {
  amplitudeService.logEvent(new AmplitudeEvent('select_category_quick_menu', payload));
};

const logSelectCategoryBanner = (payload: {
  item_position: number;
  selection_type: 'main_category_banner';
  url: string;
  primary_category_id: string;
  primary_category_name: string;
}) => {
  amplitudeService.logEvent(new AmplitudeEvent('select_category_banner', payload));
};

const logImpressionSection = <
  Payload extends QuickMenuImpressionSectionPayload | MainCategoryBannerImpressionSectionPayload,
>(
  payload: Payload,
) => {
  amplitudeService.logEvent(new AmplitudeEvent('impression_section', payload));
};

const logImpressionSectionItem = <
  Payload extends QuickMenuImpressionSectionItemPayload | MainCategoryBannerImpressionSectionItemPayload,
>(
  payload: Payload,
) => {
  amplitudeService.logEvent(new AmplitudeEvent('impression_section_item', payload));
};

export {
  logPrimaryCategoryItem,
  logSecondaryCategoryItem,
  logSiteChange,
  logImpressionSection,
  logImpressionSectionItem,
  logSelectQuickMenu,
  logSelectCategoryBanner,
};
