import { nanoid } from 'nanoid';
import { eq } from 'lodash';

import { TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';

type FilterSectionItem = {
  name: string;
  key: string;
  template: string;
  isQuick: boolean;
  values: {
    key: string;
    name: string;
    value: string;
    productCounts: number;
    iconUrl: string | null;
  }[];
};

type FilterSectionItemList = FilterSectionItem[];

type FilterSection = Section<
  'FILTER',
  {
    items: FilterSectionItemList;
  }
>;

type FilterSectionViewModel = SectionViewModel<
  'FILTER',
  {
    items: FilterSectionItemList;
  }
>;

class FilterSectionViewModelCreator extends TransformableSection {
  transform(section: FilterSection, meta: SectionMeta): FilterSectionViewModel {
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

const isFilterSection = (section: Section<string, unknown>): section is FilterSection =>
  eq(section.view.sectionCode, 'FILTER');

const isFilterSectionViewModel = (section: Section<string, unknown>): section is FilterSectionViewModel =>
  eq(section.view.sectionCode, 'FILTER');

export { FilterSectionViewModelCreator, isFilterSection, isFilterSectionViewModel };
export type { FilterSection, FilterSectionViewModel, FilterSectionItem };
