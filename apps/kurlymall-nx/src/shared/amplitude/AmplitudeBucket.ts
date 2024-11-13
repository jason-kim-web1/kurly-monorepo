import { get, isNull } from 'lodash';

import {
  BROWSE_EVENT_INFO,
  BROWSE_EVENT_NAMES,
  BROWSE_SCREEN_NAMES,
  BROWSE_SUB_EVENT_INFO,
  PREVIOUS_SCREEN_NAMES,
  REFERRER_EVENT,
  REFERRER_EVENT_SAVE,
  loadAmplitudeBucket,
  RESET_BROWSE_EVENT_INFO,
  saveAmplitudeBucket,
  ScreenName,
  TabName,
  REFERRER_EVENT_SELECTION_TYPE_EVENT_SAVE,
  WEBVIEW_REFERRER_EVENT_SAVE,
} from '.';

import { isWebview, isPC } from '../../../util/window/getDevice';
import appService from '../services/app.service';

import { isProduction } from '../configs/config';
import { SHORTCUT_TYPE } from '../constant/shortcut-type';
import type { ShortCutType } from '../types';

/**
 * See also
 *   - https://docs.google.com/spreadsheets/d/1yim5oGY1yFu_7i4futi4kN7p7-qdyAQeunuRdFQI3Hw/edit#gid=726702262
 */
export default class AmplitudeBucket {
  browseId: string;

  screenName?: ScreenName;

  previousScreenName?: ScreenName;

  browseTabName?: TabName;

  browseScreenName?: ScreenName;

  eventName?: string;

  isReleaseBuild: boolean;

  browseEventName?: string;

  browseSiteName?: string;

  browseEventInfo?: string | null;

  browseSubEventName?: string;

  browseSubEventInfo?: string;

  browseSectionId?: string | null;

  sectionId?: string | null;

  collectionId?: string | null;

  referrerEvent?: string | null;

  webviewReferrerEvent?: string | null;

  referrerEventName?: string | null;

  searchContentCount?: number | null;

  signUpSourceScreenName?: ScreenName;

  selectionType?: ShortCutType | null;

  constructor(nanoid: any) {
    const data: any = loadAmplitudeBucket();
    if (!data) {
      this.browseId = nanoid();
      this.isReleaseBuild = isProduction();
      return;
    }

    this.browseId = data.browse_id;
    this.screenName = data.screen_name;
    this.previousScreenName = data.previous_screen_name;
    this.browseScreenName = data.browse_screen_name;
    this.browseTabName = data.browse_tab_name;
    this.eventName = data.event_name;
    this.browseEventName = data.browse_event_name;
    this.browseSiteName = data.browse_site_name;
    this.browseSubEventName = data.browse_sub_event_name;
    this.browseEventInfo = data.browse_event_info;
    this.browseSubEventInfo = data.browse_sub_event_info;
    this.browseSectionId = data.browse_section_id;
    this.sectionId = data.section_id;
    this.referrerEvent = data.referrer_event;
    this.webviewReferrerEvent = data.webview_referrer_event;
    this.referrerEventName = data.referrer_event_name;
    this.searchContentCount = data.content_count;
    this.signUpSourceScreenName = data.sign_up_source_screen_name;
    this.isReleaseBuild = data.is_release_build;
    this.selectionType = data.selection_type;
  }

  getBrowseTabName() {
    return this.browseTabName;
  }

  getEventName() {
    return this.eventName;
  }

  getScreenName() {
    return this.screenName;
  }

  getPreviousScreenName() {
    return this.previousScreenName;
  }

  getBrowseScreenName() {
    return this.browseScreenName;
  }

  getBrowseEventName() {
    return this.browseEventName;
  }

  getBrowseEventInfo() {
    return this.browseEventInfo;
  }

  getBrowseSubEventName() {
    return this.browseSubEventName;
  }

  getBrowseSubEventInfo() {
    return this.browseSubEventInfo;
  }

  getSignUpSourceScreenName() {
    return this.signUpSourceScreenName;
  }

  assignTabName(name: ScreenName) {
    switch (name) {
      case ScreenName.RECOMMENDATION:
      case ScreenName.BARGAIN:
      case ScreenName.POPULAR_PRODUCT:
      case ScreenName.NEW_PRODUCT:
      case ScreenName.EVENT_LIST:
      case ScreenName.BENEFIT_LIST:
      case ScreenName.RECIPE_LIST:
      case ScreenName.RECIPE_DETAIL:
        return TabName.HOME;
      case ScreenName.CATEGORY_PRODUCT_LIST:
      case ScreenName.GIFT_LIST:
        return TabName.CATEGORY;
      case ScreenName.SEARCH:
      case ScreenName.SEARCH_PRODUCT_LIST:
        return TabName.SEARCH;
      case ScreenName.ORDER_HISTORY:
      case ScreenName.GIFT_HISTORY:
      case ScreenName.FREQUENTLY_PURCHASE_PRODUCT_HISTORY:
      case ScreenName.PICK_LIST:
      case ScreenName.MY_KURLY_STYLE:
      case ScreenName.SHIPPING_ADDRESS_LIST:
      case ScreenName.MY_REVIEWABLE_LIST:
      case ScreenName.MY_REVIEW_HISTORY:
      case ScreenName.MY_PRODUCT_INQUIRY_HISTORY:
      case ScreenName.POINT_HISTORY:
      case ScreenName.COUPON_LIST:
      case ScreenName.ACCOUNT_EDIT:
      case ScreenName.NOTICE_LIST:
      case ScreenName.FREQUENTLY_ASK_QUESTION:
      case ScreenName.PERSONAL_INQUIRY_HISTORY:
      case ScreenName.BULK_ORDER_INQUIRY:
        return TabName.MY_KURLY;
      default:
        break;
    }
  }

  updateScreenName(name: ScreenName) {
    if (isWebview()) {
      appService.analyticsSetScreenName(name);
      return;
    }

    if (name !== this.screenName) {
      this.previousScreenName = this.screenName;
    }

    if (BROWSE_SCREEN_NAMES.has(name)) {
      this.browseScreenName = name;
    }

    if (name !== ScreenName.SIGN_UP && name !== ScreenName.LOGIN) {
      this.signUpSourceScreenName = name;
    }

    // PC의 TabName은 screenName을 체크하여 업데이트
    const tabName = this.assignTabName(name);
    if (isPC && tabName) {
      this.updateBrowseTabName(tabName);
    }

    this.screenName = name;

    this.save();
  }

  updatePreviousScreenName(name: string) {
    if (PREVIOUS_SCREEN_NAMES.has(name) && this.previousScreenName !== this.screenName) {
      this.previousScreenName = this.screenName;
      this.save();
    }
  }

  updateBrowseTabName(name: TabName) {
    if (name === this.browseTabName) {
      return;
    }

    this.browseTabName = name;

    this.save();
  }

  updateEventName(name: string) {
    this.eventName = name;

    this.save();
  }

  assignEventInfo(name: string, info: { [key: string]: string }, browseName?: string) {
    switch (name) {
      case 'select_category':
      case 'select_gift_list':
        return (browseName === 'subEventInfo' && info.secondary_category_id) || info.primary_category_id;
      case 'select_event_list_banner':
      case 'select_benefit_list_banner':
      case 'select_collection_banner':
      case 'select_brand_list_banner':
      case 'select_category_banner':
      case 'select_carousel_list_banner':
      case 'select_vip_page':
        return info.url;
      case 'select_search':
        return info.selection_type;
      case 'select_kurly_recipe':
        return info.content_title;
      case 'select_category_subtab':
        return info.secondary_category_id;
      case 'select_collection_subtab':
        return info.collection_id;
      case 'select_search_banner':
        return info.title;
      case 'open_kurly_alliance':
        return info.alliance_code;
      case 'select_product':
      case 'select_product_shortcut':
        return 'product_list';
      case 'select_section_item':
      case 'select_section_item_shortcut':
        const searchSectionId = get(info, 'search_section_id');
        if (searchSectionId) {
          return searchSectionId;
        }
        return;
      case 'select_category_quick_menu':
        return info.url || info.item_policy;
      case 'select_collection':
        return browseName === 'subEventInfo' ? info.section_title : info.section_type;
      default:
        if (name.startsWith('select_recommendation_')) {
          return info.url || info.selection_type;
        }
        if (name.startsWith('select_starred_theme_')) {
          return info.title;
        }
        break;
    }
  }

  updateBrowseEventName(name: string) {
    if (BROWSE_EVENT_NAMES.has(name) || name.startsWith('select_recommendation_')) {
      this.browseEventName = name;
    }

    this.save();
  }

  updateBrowseSiteName(siteName: string) {
    this.browseSiteName = siteName;
    this.save();
  }

  updateBrowseEventInfo(name: string, info: { [key: string]: string }) {
    if (BROWSE_EVENT_INFO.has(name) || name.startsWith('select_recommendation_')) {
      if (!info) {
        return;
      }

      this.browseEventInfo = this.assignEventInfo(name, info);

      if (!this.browseEventInfo) {
        return;
      }
    }

    if (RESET_BROWSE_EVENT_INFO.has(name)) {
      this.browseEventInfo = null;
    }

    this.save();
  }

  updateBrowseSubEventInfo(name: string, info: { [key: string]: string }) {
    if (BROWSE_SUB_EVENT_INFO.has(name) || name.startsWith('select_recommendation_')) {
      if (!info) {
        return;
      }

      this.browseSubEventInfo = this.assignEventInfo(name, info, 'subEventInfo');

      if (!this.browseSubEventInfo) {
        return;
      }
    }

    this.save();
  }

  updateBrowseSubEventName(name: string) {
    if (
      BROWSE_SUB_EVENT_INFO.has(name) ||
      (name.startsWith('select_recommendation_') && !name.startsWith('select_recommendation_subtab'))
    ) {
      this.browseSubEventName = name;
    }

    this.save();
  }

  updateBrowseSectionId(name: string, info: { [key: string]: string }) {
    if (
      this.getBrowseScreenName() === ScreenName.RECOMMENDATION ||
      this.getBrowseScreenName() === ScreenName.RECIPE_DETAIL
    ) {
      this.browseSectionId = this.sectionId;
    } else {
      this.browseSectionId = null;
    }

    if (name.startsWith('select_recommendation_') && info?.section_id) {
      this.sectionId = info.section_id;
    }

    this.save();
  }

  updateWebviewReferrerEvent(referrerEvent: string | null) {
    this.webviewReferrerEvent = referrerEvent;
    this.save();
  }

  // selection_type이 한번 지정되었다면 따로 초기화하기 전까지 이전값으로 계속 유지
  updateSelectionType(payload?: { [key: string]: string }) {
    this.selectionType = (payload?.selection_type as ShortCutType) || this.selectionType;
    this.save();
  }

  initReferrerEvent(name: string) {
    const prevReferrerEvent = String(this.referrerEvent);
    this.referrerEvent = null;
    const isAuthenticateScreen = this.isAuthenticateScreenName();
    const isImpressionEvent = name.startsWith('impression_');

    // NOTE: Impression 이벤트로 인해 초기화 되지 않도록 보완 처리
    if (isImpressionEvent) {
      this.referrerEvent = prevReferrerEvent;
      this.referrerEventName = prevReferrerEvent;
      return;
    }

    // 웹뷰로 받은 referrer_event가 유지되어야 하는 이벤트가 아닐 경우 해당 값 초기화
    if (!WEBVIEW_REFERRER_EVENT_SAVE.has(name)) {
      this.webviewReferrerEvent = null;
    }

    // 인증 관련 페이지가 아니고 referrer_event, selection_type이 유지되어야 하는 이벤트나 컬리 탭에서 바로구매 숏컷을 클릭하여 발생한 이벤트가 아니면 해당 프로퍼티 값을 초기화
    if (
      !isAuthenticateScreen &&
      !REFERRER_EVENT_SELECTION_TYPE_EVENT_SAVE.has(name) &&
      !this.referrerEventName?.startsWith('select_recommendation_')
    ) {
      this.referrerEvent = null;
      this.selectionType = null;
    }
  }

  saveShortcutReferrerEvent(payloadReferrerEventName?: string | null) {
    // 상품상세 추천 섹션인 경우
    if (payloadReferrerEventName) {
      this.referrerEvent = payloadReferrerEventName;
      this.referrerEventName = payloadReferrerEventName;
      this.save();
      return;
    }

    if (this.referrerEventName?.startsWith('select_recommendation_')) {
      /**
       * 컬리 추천 탭의 바로구매 또는 상세보기 숏컷 버튼을 클릭하여 발생한 이벤트일 때, referrer_event 값으로
       * 바로구매 또는 상세보기 selection_type 값을 추가하지 않고, referrerEventName 값을 그대로 가져감
       */
      this.referrerEvent = this.referrerEventName;
      this.save();
      return;
    }

    // 카테고리/컬렉션/검색 페이지의 바로구매 또는 상세보기 숏컷 버튼을 클릭하여 발생한 이벤트라면 referrer_event값에 바로구매 selection_type값 추가하여 지정
    if (this.referrerEventName === 'select_product_shortcut') {
      this.referrerEvent = `${this.referrerEventName}.selection_type.${this.selectionType}`;
      this.save();
      return;
    }
  }

  updateReferrerEvent(name: string, payload?: { [key: string]: string }) {
    this.initReferrerEvent(name);
    const payloadEventReferrerName = get(payload, 'referrer_event', null);
    const isAuthenticateScreen = this.isAuthenticateScreenName();

    /**
     * referrer_event가 유지되어야 하는지 여부. 다음 조건 중 하나를 만족하면 유지되어야 함
     *
     * 조건 1: 유지되어야 하는 이벤트 목록에 있는 경우
     * 조건 2: 인증 관련 화면일 경우
     */
    const isReferrerEventNeedSave = REFERRER_EVENT_SAVE.has(name) || isAuthenticateScreen;
    /**
     * 숏컷 클릭 시 referrer_event가 유지되어야 하는지 여부. 다음 조건을 모두 만족하면 유지되어야 함
     *
     * 조건 1: selection_type이 바로구매(purchase) 또는 상세보기(detail)인 경우
     * 조건 2: 웹뷰로 전달된 referrer_event 값이 존재하지 않는 경우(주문서가 웹뷰로 띄워지지 않았을 경우)
     * 조건 3: referrer_event에 selection_type이 들어갔을 때 해당 값을 유지해야 하는 이벤트 목록에 포함되거나 인증 관련 화면일 경우
     */
    const isShortcutReferrerEventNeedSave =
      (this.selectionType === SHORTCUT_TYPE.CART ||
        this.selectionType === SHORTCUT_TYPE.PURCHASE ||
        this.selectionType === SHORTCUT_TYPE.DETAIL) &&
      !this.webviewReferrerEvent &&
      (REFERRER_EVENT_SELECTION_TYPE_EVENT_SAVE.has(name) || isAuthenticateScreen);

    if (REFERRER_EVENT.has(name) || name.startsWith('select_recommendation_')) {
      this.referrerEventName = name;
    }

    if (isReferrerEventNeedSave) {
      if (isShortcutReferrerEventNeedSave) {
        this.saveShortcutReferrerEvent(payloadEventReferrerName);
        return;
      }

      if (isNull(payloadEventReferrerName)) {
        this.referrerEvent = this.referrerEventName;
      } else {
        this.referrerEvent = payloadEventReferrerName;
        this.referrerEventName = payloadEventReferrerName;
      }
    }

    this.save();
  }

  getRawData() {
    return {
      browse_id: this.browseId,
      screen_name: this.screenName,
      previous_screen_name: this.previousScreenName,
      browse_screen_name: this.browseScreenName,
      browse_tab_name: this.browseTabName,
      event_name: this.eventName,
      browse_site_name: this.browseSiteName,
      browse_event_name: this.browseEventName,
      browse_event_info: this.browseEventInfo,
      browse_sub_event_name: this.browseSubEventName,
      browse_sub_event_info: this.browseSubEventInfo,
      browse_section_id: this.browseSectionId,
      section_id: this.sectionId,
      sign_up_source_screen_name: this.signUpSourceScreenName,
      is_release_build: this.isReleaseBuild,
      referrer_event: this.referrerEvent,
      webview_referrer_event: this.webviewReferrerEvent,
      referrer_event_name: this.referrerEventName,
      search_content_count: this.searchContentCount,
      selection_type: this.selectionType,
    };
  }

  getData() {
    return {
      browse_id: this.browseId,
      screen_name: this.screenName,
      previous_screen_name: this.previousScreenName,
      browse_screen_name: this.browseScreenName,
      browse_tab_name: this.browseTabName,
      event_name: this.eventName,
      browse_site_name: this.browseSiteName,
      browse_event_name: this.browseEventName,
      browse_event_info: this.browseEventInfo,
      browse_sub_event_name: this.browseSubEventName,
      browse_sub_event_info: this.browseSubEventInfo,
      browse_section_id: this.browseSectionId,
      referrer_event: this.referrerEvent,
      ...(this.isSignUp() && {
        sign_up_source_screen_name: this.signUpSourceScreenName,
      }),
      is_release_build: this.isReleaseBuild,
    };
  }

  isSignUp() {
    return (
      (this.screenName === ScreenName.SIGN_UP || this.screenName === ScreenName.LOGIN) &&
      (this.eventName === 'sign_up_success' ||
        this.eventName === 'view_sign_up' ||
        this.eventName === 'select_join_button' ||
        this.eventName === 'view_sns_sync' ||
        this.eventName === 'sns_sync_success')
    );
  }

  isAuthenticateScreenName() {
    const authenticateScreenList = new Set([
      ScreenName.SIGN_UP,
      ScreenName.SIGN_UP_SUCCESS,
      ScreenName.LOGIN,
      ScreenName.FIND_ID,
      ScreenName.FIND_PASSWORD,
      ScreenName.SNS_SYNC,
    ]);

    return this.screenName ? authenticateScreenList.has(this.screenName) : false;
  }

  save() {
    saveAmplitudeBucket(this);
  }
}
