import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';

type SortSectionItem = {
  type: string;
  name: string;
};

type SortSectionItemList = SortSectionItem[];

type SortSection = Section<
  'SORT',
  {
    items: SortSectionItemList;
  }
>;

type SortSectionViewModel = SectionViewModel<
  'SORT',
  {
    items: SortSectionItemList;
  }
>;

class SortSectionViewModelCreator extends TransformableSection {
  transform(section: SortSection, meta: SectionMeta): SortSectionViewModel {
    const {
      view: { sectionCode },
      data: { items },
    } = section;
    const { position, type } = meta;
    return {
      _type: type,
      _id: nanoid(),
      _position: position,
      view: {
        ...section.view,
        sectionCode,
      },
      data: {
        items,
      },
    };
  }
}

const isSortSection = (section: Section<string, unknown>): section is SortSection =>
  eq(section.view.sectionCode, 'SORT');

const isSortSectionViewModel = (section: Section<string, unknown>): section is SortSectionViewModel =>
  eq(section.view.sectionCode, 'SORT');

export { SortSectionViewModelCreator, isSortSection, isSortSectionViewModel };
export type { SortSection, SortSectionViewModel };
