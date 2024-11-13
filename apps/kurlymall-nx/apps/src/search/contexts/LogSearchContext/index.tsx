import { createContext, PropsWithChildren, useContext } from 'react';
import { eq, get } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

import {
  AdSearchSectionViewModelCreator,
  BannerNoResultSectionViewModelCreator,
  BannerSectionViewModelCreator,
  GoogleResultSectionViewModelCreator,
  isAdSearchSectionItemViewModel,
  isBannerNoResultSectionItemViewModel,
  isBannerSectionItemViewModel,
  isGoogleResultSectionItemViewModel,
  isMarketBestSectionItemViewModel,
  isProductListSectionItemViewModel,
  isPurchasedRecentSectionItemViewModel,
  isThemePromotionSectionItemViewModel,
  isThemeRelatedSectionItemViewModel,
  MarketBestSectionViewModelCreator,
  ProductListSectionItemViewModel,
  PurchasedRecentSectionViewModelCreator,
  SectionItemViewModel,
  ThemePromotionSectionViewModelCreator,
  ThemeRelatedSectionViewModelCreator,
  UnSpecifiedSection,
} from '../../features/Section/factory';
import { amplitudeService } from '../../../shared/amplitude';
import {
  ImpressionSection,
  ImpressionSectionItem,
  PartialImpressionSectionItemPayload,
  PartialSelectSectionItemShortcutPayload,
  SelectSectionItem,
  SelectSectionItemPayload,
  SelectSectionItemShortcut,
  SelectSectionItemShortcutPayload,
} from '../../../shared/amplitude/events/search';
import { SelectProduct } from '../../../shared/amplitude/events/search/SelectProduct';
import { getStickerText } from '../../../shared/amplitude/events/getStickerText';
import { ignoreError } from '../../../shared/utils/general';
import { fusionSignalsService } from '../../../shared/fusion-signals/FusionSignalsService';
import { FUSION_SIGNALS_EVENT } from '../../../shared/fusion-signals/fusionSignalsType';
import { ShortCutType } from '../../../shared/types';
import { SelectProductShortcut } from '../../../shared/amplitude/events/search/SelectProductShortcut';
import { getPackageInfo } from '../../../shared/amplitude/events/product/getPackageInfo';
import { SHORTCUT_TYPE } from '../../../shared/constant/shortcut-type';
import { logTrackerApi } from '../../shared/utils/logTrackerApi';
import { isDefined } from '../../../shared/utils/typeGuard';
import { ImpressionProduct } from '../../../shared/amplitude/events/search/ImpressionProduct';

type LogSearchContextState = {
  defaultSortTypeName: string;
  selectionSortTypeName: string;
  serverSortTypeName: string;
  keyword: string;
  fusionQueryId: string;
  isSorting: boolean;
};

const LogSearchContext = createContext<LogSearchContextState>({
  defaultSortTypeName: '',
  selectionSortTypeName: '',
  serverSortTypeName: '',
  keyword: '',
  fusionQueryId: '',
  isSorting: false,
});

type LogSearchContextProviderProps = {
  data: LogSearchContextState;
};

type ProductShortCutMeta = {
  type?: ShortCutType;
};

const LogSearchContextProvider = ({ data, children }: PropsWithChildren<LogSearchContextProviderProps>) => {
  return <LogSearchContext.Provider value={data}>{children}</LogSearchContext.Provider>;
};

type LogHistoryId = string;

type LogHistoryItem = {
  selectSectionItem: boolean;
  selectSectionItemShortCut: boolean;
  impressionSection: boolean;
  impressionSectionItem: boolean;
};

const DEFAULT_LOG_HISTORY_ITEM = {
  selectSectionItem: false,
  selectSectionItemShortCut: false,
  impressionSection: false,
  impressionSectionItem: false,
};

type LogHistory = Record<string, LogHistoryItem>;

type LogHistoryKey = keyof LogHistoryItem;

const LOG_HISTORY_KEY_TYPE = {
  IMPRESSION_SECTION: 'impressionSection',
  IMPRESSION_SECTION_ITEM: 'impressionSectionItem',
  SELECT_SECTION_ITEM: 'selectSectionItem',
  SELECT_SECTION_ITEM_SHORT_CUT: 'selectSectionItemShortCut',
} as const;

const LOG_HISTORY_QUERY_KEY = ['log', 'search', 'history'];

const checkLogHistoryData = (data: unknown): data is LogHistory => isDefined(data);

const useLogHistoryPolicy = () => {
  const queryClient = useQueryClient();

  const getLogHistory = (): LogHistory => {
    const data = queryClient.getQueryData<LogHistory>(LOG_HISTORY_QUERY_KEY);
    return data || {};
  };

  const checkAlreadyLogged = (id: LogHistoryId, type: LogHistoryKey) => {
    const logHistory = getLogHistory();
    return get(logHistory, `${id}.${type}`, false);
  };

  const setLogHistoryItem = (id: LogHistoryId, historyItem: Partial<LogHistoryItem>) => {
    queryClient.setQueryData(LOG_HISTORY_QUERY_KEY, (prev) => {
      if (!checkLogHistoryData(prev)) {
        return {
          [id]: {
            ...DEFAULT_LOG_HISTORY_ITEM,
            ...historyItem,
          },
        };
      }
      const prevHistoryItem = prev[id] || DEFAULT_LOG_HISTORY_ITEM;
      return {
        ...prev,
        [id]: {
          ...prevHistoryItem,
          ...historyItem,
        },
      };
    });
  };

  const createLogHistoryId = (
    searchOptions: LogSearchContextState,
    section: UnSpecifiedSection,
    item?: SectionItemViewModel,
  ): string => {
    const { keyword, selectionSortTypeName } = searchOptions;
    const {
      _type,
      _position,
      view: { sectionCode },
    } = section;
    const base = [keyword, selectionSortTypeName, _type, sectionCode, _position];
    if (!item) {
      return base.join('_');
    }
    return [...base, item._logId].join('_');
  };

  const log = (id: LogHistoryId, type: LogHistoryKey, f: () => void) => {
    const isImpressionSection = eq(type, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION);
    const isImpressionSectionItem = eq(type, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION_ITEM);
    const isImpressionEvent = isImpressionSection || isImpressionSectionItem;
    if (isImpressionEvent && checkAlreadyLogged(id, type)) {
      return;
    }
    ignoreError(() => {
      setLogHistoryItem(id, {
        [type]: true,
      });
      f();
    });
  };

  return { createLogHistoryId, log } as const;
};

/**
 * Impression = 이전 질의 조건에서 Impression 이벤트가 발행되었다면, 추가 기록하지 않음
 * ProductCard / Shortcut = 이벤트 발송 전에, Impression 이벤트 발행 기록이 있는지 보고, 없을 경우 Impression 이벤트 발행
 */
const useLogger = () => {
  const context = useContext(LogSearchContext);
  if (!context) {
    throw new Error('LogSearchContext 는 하위에서 사용해주세요!');
  }
  const { log, createLogHistoryId } = useLogHistoryPolicy();
  const { isSorting, keyword, defaultSortTypeName, serverSortTypeName, selectionSortTypeName, fusionQueryId } = context;

  const handleImpressionSection = (section: UnSpecifiedSection) => {
    const {
      _type,
      _position,
      _title,
      _url,
      view: { sectionCode },
    } = section;
    const logId = createLogHistoryId(context, section);
    log(logId, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION, () => {
      amplitudeService.logEvent(
        new ImpressionSection({
          search_section_category: _type,
          search_section_name: _title,
          search_section_id: sectionCode,
          section_position: _position,
          url: _url,
          title: _title,
          search_test_group: '',
          keyword,
        }),
      );
    });
  };

  const handleImpressionProduct = (section: UnSpecifiedSection, item: ProductListSectionItemViewModel) => {
    const logId = createLogHistoryId(context, section, item);
    log(logId, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION_ITEM, () => {
      amplitudeService.logEvent(
        new ImpressionProduct({
          content_id: item.no,
          content_name: item.name,
          fusion_query_id: fusionQueryId,
          position: item.position,
          sales_price: item.salesPrice,
          price: item.discountedPrice || item.salesPrice,
        }),
      );
    });
  };

  const handleImpressionSectionItem = (section: UnSpecifiedSection, item: SectionItemViewModel) => {
    // NOTE: [정책] 오가닉 (PRODUCT_LIST) 섹션의 노출 이벤트는 impression_product 으로 기록
    if (isProductListSectionItemViewModel(item)) {
      handleImpressionProduct(section, item);
      return;
    }
    const logId = createLogHistoryId(context, section, item);
    const {
      _type,
      _position,
      _title,
      view: { sectionCode },
    } = section;
    const sectionEventPayload = {
      search_section_category: _type,
      search_section_name: _title,
      search_section_id: sectionCode,
      section_position: _position,
    };
    const searchEventPayload = {
      is_sorting: isSorting,
      default_sort_type: defaultSortTypeName,
      selection_sort_type: selectionSortTypeName,
      server_sort_type: serverSortTypeName,
      keyword,
      fusion_query_id: fusionQueryId,
    };
    let itemEventPayload: PartialImpressionSectionItemPayload = {};
    if (isBannerNoResultSectionItemViewModel(item)) {
      itemEventPayload = BannerNoResultSectionViewModelCreator.getImpressionSectionItemEventPayload();
    }
    if (isBannerSectionItemViewModel(item)) {
      itemEventPayload = BannerSectionViewModelCreator.getImpressionSectionItemEventPayload();
    }
    if (isMarketBestSectionItemViewModel(item)) {
      itemEventPayload = MarketBestSectionViewModelCreator.getImpressionSectionItemEventPayload(item);
    }
    if (isPurchasedRecentSectionItemViewModel(item)) {
      itemEventPayload = PurchasedRecentSectionViewModelCreator.getImpressionSectionItemEventPayload(item);
    }
    if (isThemePromotionSectionItemViewModel(item)) {
      itemEventPayload = ThemePromotionSectionViewModelCreator.getImpressionSectionItemEventPayload(item);
    }
    if (isThemeRelatedSectionItemViewModel(item)) {
      itemEventPayload = ThemeRelatedSectionViewModelCreator.getImpressionSectionItemEventPayload(item);
    }
    if (isAdSearchSectionItemViewModel(item)) {
      itemEventPayload = AdSearchSectionViewModelCreator.getImpressionSectionItemEventPayload(item);
    }
    if (isGoogleResultSectionItemViewModel(item)) {
      itemEventPayload = GoogleResultSectionViewModelCreator.getImpressionSectionItemEventPayload(item);
    }
    log(logId, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION_ITEM, () => {
      amplitudeService.logEvent(
        new ImpressionSectionItem({
          ...sectionEventPayload,
          ...searchEventPayload,
          ...itemEventPayload,
        }),
      );
      if (isAdSearchSectionItemViewModel(item)) {
        logTrackerApi(get(item, 'adInfo.impTrackers', []));
      }
    });
  };

  const handleSelectProductCard = (section: UnSpecifiedSection, item: SectionItemViewModel) => {
    if (!isProductListSectionItemViewModel(item)) {
      return;
    }
    const logId = createLogHistoryId(context, section, item);
    const {
      _position,
      no,
      name,
      deliveryTypeNames,
      salesPrice,
      discountedPrice,
      isSoldOut,
      isGiftable,
      _stickers,
      reviewCount,
    } = item;

    // TOFIX: Refactor
    handleImpressionSection(section);
    handleImpressionSectionItem(section, item);

    log(logId, LOG_HISTORY_KEY_TYPE.SELECT_SECTION_ITEM, () => {
      amplitudeService.logEvent(
        new SelectProduct({
          default_sort_type: defaultSortTypeName,
          selection_sort_type: selectionSortTypeName,
          server_sort_type: serverSortTypeName,
          is_sorting: isSorting,
          keyword,
          fusion_query_id: fusionQueryId,
          position: _position,
          content_id: no,
          content_name: name,
          delivery_type: deliveryTypeNames.join(','),
          sales_price: salesPrice,
          price: discountedPrice || salesPrice,
          is_soldout: isSoldOut,
          is_gift_purchase: isGiftable,
          sticker: getStickerText(_stickers),
          review_count: reviewCount,
          // NOTE: 전체 상품 개수
          content_count: 0,
        }),
      );

      fusionSignalsService.logEvent({
        type: FUSION_SIGNALS_EVENT.CLICK_PRODUCT,
        docId: no,
        label: name,
        resPos: _position,
      });
    });
  };

  const handleSelectProductShortCut = (
    section: UnSpecifiedSection,
    item: ProductListSectionItemViewModel,
    meta: ProductShortCutMeta,
  ) => {
    const {
      no,
      name,
      deliveryTypeNames,
      salesPrice,
      discountedPrice,
      isSoldOut,
      isGiftable,
      position,
      _stickers,
      reviewCount,
      groupProduct,
    } = item;
    const { type } = meta;
    const { packageId, packageName } = getPackageInfo({
      isGroupProduct: groupProduct.isGroup,
      no,
      name,
    });
    const logId = createLogHistoryId(context, section, item);

    // TOFIX: Refactor
    handleImpressionSection(section);
    handleImpressionSectionItem(section, item);

    log(logId, LOG_HISTORY_KEY_TYPE.SELECT_SECTION_ITEM_SHORT_CUT, () => {
      amplitudeService.logEvent(
        new SelectProductShortcut({
          content_id: no,
          content_name: name,
          content_type: null,
          delivery_type: deliveryTypeNames.join(','),
          sales_price: salesPrice,
          price: discountedPrice || salesPrice,
          is_soldout: isSoldOut,
          is_gift_purchase: isGiftable,
          position,
          package_id: packageId,
          package_name: packageName,
          content_count: 0,
          sticker: getStickerText(_stickers),
          review_count: reviewCount,
          selection_type: type,
          fusion_query_id: fusionQueryId,
          keyword,
          default_sort_type: defaultSortTypeName,
          selection_sort_type: selectionSortTypeName,
          server_sort_type: serverSortTypeName,
          is_sorting: isSorting,
        }),
      );
      ignoreError(() => {
        fusionSignalsService.logEvent({
          type: eq(type, SHORTCUT_TYPE.DETAIL) ? FUSION_SIGNALS_EVENT.CLICK_PRODUCT : FUSION_SIGNALS_EVENT.CLICK_SELECT,
          docId: no,
          label: name,
          resPos: position,
        });
      });
    });
  };

  const handleSelectSectionItemType = (section: UnSpecifiedSection, selectionType: string) => {
    const {
      _type,
      _position,
      _title,
      view: { sectionCode },
    } = section;
    const logId = createLogHistoryId(context, section);
    log(logId, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION_ITEM, () => {
      amplitudeService.logEvent(
        new SelectSectionItem({
          search_section_category: _type,
          search_section_name: _title,
          search_section_id: sectionCode,
          section_position: _position,
          search_test_group: '',
          default_sort_type: defaultSortTypeName,
          selection_sort_type: selectionSortTypeName,
          server_sort_type: serverSortTypeName,
          keyword,
          selection_type: selectionType,
          fusion_query_id: fusionQueryId,
        } as SelectSectionItemShortcutPayload),
      );
    });
  };

  const handleSelectSectionItem = (section: UnSpecifiedSection, item: SectionItemViewModel) => {
    const {
      _type,
      _position,
      _title,
      view: { sectionCode },
    } = section;
    const logId = createLogHistoryId(context, section);
    let eventPayload: SelectSectionItemPayload = {
      search_section_category: _type,
      search_section_name: _title,
      search_section_id: sectionCode,
      section_position: _position,
      default_sort_type: defaultSortTypeName,
      selection_sort_type: selectionSortTypeName,
      server_sort_type: serverSortTypeName,
      filter_id: '',
      keyword,
      fusion_query_id: fusionQueryId,
      item_position: item._position,
      position: item._position,
      selection_type: '',
    };
    if (isBannerSectionItemViewModel(item)) {
      eventPayload.selection_type = 'banner';
    }
    if (isBannerNoResultSectionItemViewModel(item)) {
      eventPayload.selection_type = 'banner';
    }
    if (isMarketBestSectionItemViewModel(item) || isGoogleResultSectionItemViewModel(item)) {
      const { no, name } = item;
      eventPayload = {
        ...eventPayload,
        content_id: no,
        content_name: name,
      };
    }
    if (isProductListSectionItemViewModel(item)) {
      handleSelectProductCard(section, item);
      return;
    }
    if (
      isPurchasedRecentSectionItemViewModel(item) ||
      isThemeRelatedSectionItemViewModel(item) ||
      isThemePromotionSectionItemViewModel(item) ||
      isAdSearchSectionItemViewModel(item)
    ) {
      const { productNo, productName } = item;
      eventPayload = {
        ...eventPayload,
        content_id: productNo,
        content_name: productName,
      };
    }

    // TOFIX: 중복 코드 개선
    handleImpressionSection(section);
    handleImpressionSectionItem(section, item);

    log(logId, LOG_HISTORY_KEY_TYPE.SELECT_SECTION_ITEM, () => {
      amplitudeService.logEvent(new SelectSectionItem(eventPayload));
    });

    if (isAdSearchSectionItemViewModel(item)) {
      logTrackerApi(get(item, 'adInfo.clickTrackers', []));
    }
  };

  const handleSelectSectionItemShortCut = (
    section: UnSpecifiedSection,
    item: SectionItemViewModel,
    meta: ProductShortCutMeta,
  ) => {
    // NOTE: [정책] 오가닉 (PRODUCT_LIST) 검색 결과 인 경우
    if (isProductListSectionItemViewModel(item)) {
      handleSelectProductShortCut(section, item, meta);
      return;
    }
    const {
      _type,
      _title,
      _position,
      view: { sectionCode },
    } = section;
    const { type } = meta;
    const logId = createLogHistoryId(context, section, item);
    let eventPayload: PartialSelectSectionItemShortcutPayload = {
      position: item._position,
      item_position: item._position,
      selection_type: type,
    };
    if (isMarketBestSectionItemViewModel(item) || isGoogleResultSectionItemViewModel(item)) {
      const { no, name, isSoldOut, isGiftable, deliveryTypeNames, discountedPrice, salesPrice } = item;
      eventPayload = {
        ...eventPayload,
        content_id: no,
        content_name: name,
        price: discountedPrice || salesPrice,
        sales_price: salesPrice,
        is_soldout: isSoldOut,
        is_gift_purchase: isGiftable,
        // sticker: getStickerText(sticker),
        delivery_type: deliveryTypeNames.join(','),
      };
    }
    if (isPurchasedRecentSectionItemViewModel(item)) {
      const { productName, productNo, discountedPrice, salesPrice } = item;
      eventPayload = {
        ...eventPayload,
        content_id: productNo,
        content_name: productName,
        price: discountedPrice || salesPrice,
        sales_price: salesPrice,
        is_soldout: false,
        is_gift_purchase: false,
      };
    }
    if (
      isThemeRelatedSectionItemViewModel(item) ||
      isThemePromotionSectionItemViewModel(item) ||
      isAdSearchSectionItemViewModel(item)
    ) {
      const { productName, productNo, discountedPrice, salesPrice } = item;
      eventPayload = {
        ...eventPayload,
        content_id: productNo,
        content_name: productName,
        price: discountedPrice || salesPrice,
        sales_price: salesPrice,
        is_soldout: false,
        is_gift_purchase: false,
      };
    }
    // TOFIX: 중복 코드 개선
    handleImpressionSection(section);
    handleImpressionSectionItem(section, item);

    log(logId, LOG_HISTORY_KEY_TYPE.SELECT_SECTION_ITEM_SHORT_CUT, () => {
      amplitudeService.logEvent(
        new SelectSectionItemShortcut({
          search_section_id: sectionCode,
          search_section_category: _type,
          search_section_name: _title,
          section_position: _position,
          default_sort_type: defaultSortTypeName,
          selection_sort_type: selectionSortTypeName,
          server_sort_type: serverSortTypeName,
          fusion_query_id: fusionQueryId,
          keyword,
          ...eventPayload,
        } as SelectSectionItemShortcutPayload),
      );
    });
    if (isAdSearchSectionItemViewModel(item)) {
      logTrackerApi(get(item, 'adInfo.clickTrackers', []));
    }
  };

  return {
    isSorting,
    fusionQueryId,
    keyword,
    defaultSortTypeName,
    serverSortTypeName,
    selectionSortTypeName,
    logSelectSectionItem: handleSelectSectionItem,
    logSelectSectionItemType: handleSelectSectionItemType,
    logSelectSectionItemShortCut: handleSelectSectionItemShortCut,
    logImpressionSection: handleImpressionSection,
    logImpressionSectionItem: handleImpressionSectionItem,
  } as const;
};

export { LogSearchContextProvider, useLogger };
export type { ProductShortCutMeta };
