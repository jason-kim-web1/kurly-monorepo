import { nanoid } from 'nanoid';
import { eq, get, head } from 'lodash';

import { TransformableSection } from './SectionFactory';
import type { Section, SectionViewModel, SectionMeta } from './SectionFactory';

type KeywordConvertType = 'SPELLING_CORRECTION' | 'ALTERNATIVE_SUGGESTION';

type KeywordConvertInfoSection = Section<
  'KEYWORD_CONVERT_INFO',
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
      type: KeywordConvertType;
    }[];
  }
>;

type KeywordConvertInfoSectionViewModel = SectionViewModel<
  'KEYWORD_CONVERT_INFO',
  {
    headerKeyword: string;
    headerDescription: string;
    footerKeyword: string;
    footerDescription: string;
    type: KeywordConvertType;
  }
>;

class KeywordConvertInfoSectionViewModelCreator extends TransformableSection {
  transform(section: KeywordConvertInfoSection, meta: SectionMeta): KeywordConvertInfoSectionViewModel {
    const sectionCode = section.view.sectionCode;
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
        type: get(item, 'type'),
      },
    };
  }
}

const isKeywordConvertInfoSection = (section: Section<string, unknown>): section is KeywordConvertInfoSection =>
  eq(section.view.sectionCode, 'KEYWORD_CONVERT_INFO');

const isKeywordConvertInfoSectionViewModel = (
  section: Section<string, unknown>,
): section is KeywordConvertInfoSectionViewModel => eq(section.view.sectionCode, 'KEYWORD_CONVERT_INFO');

export { KeywordConvertInfoSectionViewModelCreator, isKeywordConvertInfoSection, isKeywordConvertInfoSectionViewModel };
export type { KeywordConvertInfoSection, KeywordConvertInfoSectionViewModel };
