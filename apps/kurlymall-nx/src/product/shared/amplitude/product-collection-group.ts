import { mapKeys, snakeCase } from 'lodash';

import { amplitudeService } from '../../../shared/amplitude';
import { AmplitudeEvent } from '../../../shared/amplitude/AmplitudeEvent';

interface SectionPageParams {
  /** 섹션화면 */
  sectionScreen: string;
  /** 섹션분류 */
  sectionType: string;
}

interface ImpressionGroupParams {
  /** 섹션유형 _ ex) 컬렉션 id*/
  sectionId: string;
  /** 섹션이름 _ex) 컬렉션 타이틀 */
  sectionTitle: string;
  /** 섹션순서 */
  sectionPosition: number;
  /** 컬렉션 id */
  collectionId: string;
}

interface ImpressionItemParams {
  /** 상품 id */
  contentId: number;
  /** 상품명 */
  contentName: string;
  /** 가격 */
  price: number;
  /** GMV2, 컬리팬마가 */
  basePrice?: number;
  /** 컬렉션 id */
  collectionId: string;
  /** 상품 순서 */
  itemPosition: number;
}

interface SelectCollectionParams extends SectionPageParams, ImpressionGroupParams, Partial<ImpressionItemParams> {
  /**
   * content: 상품 클릭
   * title: 타이틀 옆 전체보기 버튼 클릭
   * more: 상품 카드 목록 옆 전체보기 버튼 클릭
   */
  selectionType: 'content' | 'title' | 'more';
  collectionId: string;
}

interface SelectViewAllParams {
  /**
   * title: 타이틀 옆 전체보기 버튼 클릭
   * more: 상품 카드 목록 옆 전체보기 버튼 클릭
   */
  readonly selectionType: 'title' | 'more';
  /** 컬렉션 id */
  collectionId: string;
}

interface SelectProductParams {
  /**
   * content: 상품 클릭
   */
  readonly selectionType: 'content';
  /** 컬렉션 id */
  collectionId: string;
  /** 상품 id */
  contentId: number;
}

const logImpressionGroup = (payload: SectionPageParams & ImpressionGroupParams) => {
  amplitudeService.logEvent(
    new AmplitudeEvent(
      'impression_group',
      mapKeys(payload, (_, key: string) => snakeCase(key)),
    ),
  );
};

const logImpressionItem = (payload: SectionPageParams & ImpressionGroupParams & ImpressionItemParams) => {
  amplitudeService.logEvent(
    new AmplitudeEvent(
      'impression_item',
      mapKeys(payload, (_, key: string) => snakeCase(key)),
    ),
  );
};

const logSelectCollection = (payload: SelectCollectionParams) => {
  amplitudeService.logEvent(
    new AmplitudeEvent(
      'select_collection',
      mapKeys(payload, (_, key: string) => snakeCase(key)),
    ),
  );
};

export type {
  SectionPageParams,
  ImpressionGroupParams,
  ImpressionItemParams,
  SelectProductParams,
  SelectViewAllParams,
};

export { logImpressionGroup, logImpressionItem, logSelectCollection };
