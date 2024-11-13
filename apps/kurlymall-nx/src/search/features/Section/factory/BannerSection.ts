import { nanoid } from 'nanoid';
import { eq, get, head } from 'lodash';

import { SectionItemViewModel, TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';
import { PartialImpressionSectionItemPayload } from '../../../../shared/amplitude/events/search';

interface BannerSectionItem {
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

interface BannerSectionItemViewModel extends SectionItemViewModel, BannerSectionItem {}

type BannerSectionItemList = BannerSectionItem[];

type BannerSectionItemViewModelList = BannerSectionItemViewModel[];

type BannerSection = Section<
  'BANNER',
  {
    title: string | null;
    items: BannerSectionItemList;
  }
>;

type BannerSectionViewModel = SectionViewModel<
  'BANNER',
  {
    title: string | null;
    items: BannerSectionItemViewModelList;
  }
>;

class BannerSectionViewModelCreator extends TransformableSection {
  static override getImpressionSectionItemEventPayload(): PartialImpressionSectionItemPayload {
    return {};
  }

  transform(section: BannerSection, meta: SectionMeta): BannerSectionViewModel {
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
            _id: nanoid(),
            _position: index + 1,
          };
        }),
      },
    };
  }
}

const isBannerSection = (section: Section<string, unknown>): section is BannerSection =>
  eq(section.view.sectionCode, 'BANNER');

const isBannerSectionViewModel = (section: Section<string, unknown>): section is BannerSectionViewModel =>
  eq(section.view.sectionCode, 'BANNER');

const isBannerSectionItemViewModel = (sectionItem: SectionItemViewModel): sectionItem is BannerSectionItemViewModel =>
  eq(sectionItem._sectionCode, 'BANNER');

export { BannerSectionViewModelCreator, isBannerSection, isBannerSectionViewModel, isBannerSectionItemViewModel };
export type { BannerSection, BannerSectionViewModel, BannerSectionItemViewModel };
