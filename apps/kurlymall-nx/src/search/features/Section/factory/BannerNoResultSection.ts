import { nanoid } from 'nanoid';
import { eq, get, head } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';

interface BannerNoResultSectionItem {
  id: string;
  title: string;
  contents: string;
  eventBannerPc: string;
  eventBannerMobile: string;
  eventBannerPcUrl: string;
  eventBannerMobileUrl: string;
  link: string;
  mobileLink: string;
}

interface BannerNoResultSectionItemViewModel extends SectionItemViewModel, BannerNoResultSectionItem {}

type BannerNoResultSectionItemList = BannerNoResultSectionItem[];

type BannerNoResultSectionItemViewModelList = BannerNoResultSectionItemViewModel[];

type BannerNoResultSection = Section<
  'BANNER_NO_RESULT',
  {
    items: BannerNoResultSectionItemList;
    title: string | null;
  }
>;

type BannerNoResultSectionViewModel = SectionViewModel<
  'BANNER_NO_RESULT',
  {
    items: BannerNoResultSectionItemViewModelList;
    title: string | null;
  }
>;

class BannerNoResultSectionViewModelCreator extends TransformableSection {
  static override getImpressionSectionItemEventPayload(): PartialImpressionSectionItemPayload {
    return {};
  }

  transform(section: BannerNoResultSection, meta: SectionMeta): BannerNoResultSectionViewModel {
    const {
      view: { sectionCode },
      data: { title, items },
    } = section;
    const { position, type } = meta;
    const firstItem = head(items);
    return {
      _title: get(firstItem, 'title', ''),
      _url: get(firstItem, 'link', ''),
      _type: type,
      _id: nanoid(),
      _position: position,
      view: {
        ...section.view,
        sectionCode,
      },
      data: {
        title,
        items: items.map((item, index) => {
          const { id } = item;
          const itemPosition = index + 1;
          return {
            ...item,
            _logId: `${itemPosition}_${id}`,
            _sectionCode: sectionCode,
            _position: itemPosition,
            _id: nanoid(),
          };
        }),
      },
    };
  }
}

const isBannerNoResultSection = (section: Section<string, unknown>): section is BannerNoResultSection =>
  eq(section.view.sectionCode, 'BANNER_NO_RESULT');

const isBannerNoResultSectionViewModel = (
  section: Section<string, unknown>,
): section is BannerNoResultSectionViewModel => eq(section.view.sectionCode, 'BANNER_NO_RESULT');

const isBannerNoResultSectionItemViewModel = (
  sectionItem: SectionItemViewModel,
): sectionItem is BannerNoResultSectionItemViewModel => eq(sectionItem._sectionCode, 'BANNER_NO_RESULT');

export {
  BannerNoResultSectionViewModelCreator,
  isBannerNoResultSection,
  isBannerNoResultSectionViewModel,
  isBannerNoResultSectionItemViewModel,
};
export type { BannerNoResultSection, BannerNoResultSectionViewModel, BannerNoResultSectionItemViewModel };
