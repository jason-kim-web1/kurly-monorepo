import { isUndefined } from 'lodash';

import { INVALID_SECTION_ID } from '../constants';

export const getParsedSectionId = (sectionId?: string) => {
  if (isUndefined(sectionId)) {
    return INVALID_SECTION_ID;
  }
  const parsedSectionId = parseInt(sectionId);
  if (isNaN(parsedSectionId)) {
    return INVALID_SECTION_ID;
  }
  return parsedSectionId;
};
