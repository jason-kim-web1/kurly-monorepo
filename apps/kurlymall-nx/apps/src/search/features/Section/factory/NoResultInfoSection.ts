import { nanoid } from 'nanoid';
import { eq, get, head } from 'lodash';

import { TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';

type NoResultInfoSection = Section<
  'NO_RESULT_INFO',
  {
    items: {
      header: {
        keyword: string;
        description: string;
      };
      footer: {
        keyword: string;
        description: string;
      };
    }[];
  }
>;

type NoResultInfoSectionViewModel = SectionViewModel<
  'NO_RESULT_INFO',
  {
    headerKeyword: string;
    headerDescription: string;
    footerKeyword: string;
    footerDescription: string;
  }
>;

class NoResultInfoSectionViewModelCreator extends TransformableSection {
  transform(section: NoResultInfoSection, meta: SectionMeta): NoResultInfoSectionViewModel {
    const {
      view: { sectionCode },
    } = section;
    const { position, type } = meta;
    const item = head(section.data.items);

    if (!item) {
      throw new Error('invalid keyword convert info data');
    }

    return {
      _type: type,
      _id: nanoid(),
      _position: position,
      view: {
        ...section.view,
        sectionCode,
      },
      data: {
        headerKeyword: get(item, 'header.keyword'),
        headerDescription: get(item, 'header.description'),
        footerKeyword: get(item, 'footer.keyword'),
        footerDescription: get(item, 'footer.description'),
      },
    };
  }
}

const isNoResultInfoSection = (section: Section<string, unknown>): section is NoResultInfoSection =>
  eq(section.view.sectionCode, 'NO_RESULT_INFO');

const isNoResultInfoSectionViewModel = (section: Section<string, unknown>): section is NoResultInfoSectionViewModel =>
  eq(section.view.sectionCode, 'NO_RESULT_INFO');

export { NoResultInfoSectionViewModelCreator, isNoResultInfoSection, isNoResultInfoSectionViewModel };
export type { NoResultInfoSection, NoResultInfoSectionViewModel };
