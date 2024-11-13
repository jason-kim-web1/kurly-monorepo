import { get, includes } from 'lodash';

import { MainSection, MdChoicesOption } from '../../../../main/interfaces/MainSection.interface';
import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getEventName } from './getEventName';
import { getPayLoadData } from './getPayLoadData';
import { getProductData } from './getProductData';
import { getTemplate } from './getTemplate';
import { getCollectionId } from './getCollectionId';

interface Payload {
  sections: MainSection<unknown>[];
  section: any;
  eventName: string;
  sectionType: string;
  position?: number;
  target?: number | string;
  selectedOption?: MdChoicesOption;
  link?: string;
}

const COMPARE_EVENT_NAMES = {
  mainBannerUrl: ['MAIN_BANNERS', 'MAIN_BANNER_CAROUSEL', 'MAIN_BANNER_CAROUSEL_HORIZONTAL'],
  contentTitleCarousel: ['MAIN_BANNER_CAROUSEL', 'MAIN_BANNER_CAROUSEL_HORIZONTAL'],
  contentTitleRecipes: ['RECIPES'],
  bannerId: ['MAIN_BANNERS'],
};

function getTargetInPayload({
  compareEventNames,
  eventName,
  payload,
  compare,
  compareKey,
  key,
}: {
  compareEventNames: string[];
  eventName: string;
  payload: any;
  compare: string | number;
  compareKey: string;
  key: string;
}) {
  if (!includes(compareEventNames, eventName)) {
    return null;
  }

  return (
    getPayLoadData({
      payload,
      compare,
      compareKey,
      key,
    }) || null
  );
}

export class SelectRecommendation extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(getEventName({ name: payload.eventName, position: payload.position }), payload);
  }

  getPayload() {
    try {
      const { target, sections, section, eventName, position, sectionType, selectedOption, link } = this.payload;
      const { type, payload: sectionPayLoad, id } = section;

      const themePosition = sections.findIndex((s) => s.id === id);
      const calcPosition = typeof position !== 'undefined' ? position + 1 : null;
      const productMdChoices = eventName === 'MD_CHOICES' ? selectedOption : null;

      const mainBannerUrl =
        getTargetInPayload({
          compareEventNames: COMPARE_EVENT_NAMES.mainBannerUrl,
          eventName,
          payload: sectionPayLoad,
          compare: target ? target : 0,
          compareKey: 'id',
          key: 'banners',
        })?.link || null;

      const bannerId =
        getTargetInPayload({
          compareEventNames: COMPARE_EVENT_NAMES.bannerId,
          eventName,
          payload: sectionPayLoad,
          compare: target ? target : 0,
          compareKey: 'id',
          key: 'banners',
        })?.id || null;

      const moreUrl = sectionPayLoad.link || link || null;

      const quickMenuUrl = get(sectionPayLoad, `menus[${position}].link`, null);

      const url = mainBannerUrl || moreUrl || quickMenuUrl;

      const productTypeData = getProductData({
        eventName,
        sectionType,
        payload: sectionPayLoad,
        target,
        position,
        selectedOption,
      });

      const contentTitleRecipes =
        getTargetInPayload({
          compareEventNames: COMPARE_EVENT_NAMES.contentTitleRecipes,
          eventName,
          payload: sectionPayLoad,
          compare: target ? target : 0,
          compareKey: 'no',
          key: 'recipes',
        })?.title || null;

      const contentTitleCarousel =
        getTargetInPayload({
          compareEventNames: COMPARE_EVENT_NAMES.contentTitleCarousel,
          eventName,
          payload: sectionPayLoad,
          compare: target ? target : 0,
          compareKey: 'id',
          key: 'banners',
        })?.title || null;

      const contentTitleLineBanners = eventName === 'LINE_BANNERS' ? sectionPayLoad.title || null : null;

      const contentTitleQuickMenu = get(sectionPayLoad, `menus[${position}].title`, null);

      const contentTitle =
        contentTitleRecipes || contentTitleLineBanners || contentTitleCarousel || contentTitleQuickMenu;
      const collectionId =
        getCollectionId({
          type,
          target,
          sectionType,
          collections: sectionPayLoad?.collections,
          collectionCode: sectionPayLoad?.collectionCode,
        }) || null;

      const groupCollectionId = type === 'GROUP_COLLECTION_CIRCLE' ? sectionPayLoad.collectionCode : null;

      const sendData = {
        ...productTypeData,
        selection_type: sectionType,
        theme_position: themePosition + 1,
        position: calcPosition,
        section_id: id,
        template_code: getTemplate({ eventName }).templateCode,
        template_type: getTemplate({ eventName }).templateType,
        collection_id: collectionId || null, // 컬렉션 목록 갈때 사용하는 ID
        // optional
        title: eventName !== 'LINE_BANNERS' && sectionPayLoad.title ? sectionPayLoad.title : null,
        url: url,
        primary_category_id: productMdChoices?.code || null, // 'MD의 추천' 구좌 내 상품의 대분류 카테고리 코드
        primary_category_name: productMdChoices?.name || null, // 'MD의 추천' 구좌 내 상품의 대분류 카테고리 이름
        content_title: contentTitle, // 캐러셀배너, 레시피, 띠배너 (api의 title)
        group_collection_id: groupCollectionId,
        banner_id: bannerId,
      };

      return sendData;
    } catch (e) {
      return;
    }
  }
}
