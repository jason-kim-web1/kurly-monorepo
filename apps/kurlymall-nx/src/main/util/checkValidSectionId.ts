import { ne } from '../../shared/utils/lodash-extends';

import { INVALID_SECTION_ID } from '../constants';

export const checkValidSectionId = (sectionId: number) => ne(sectionId, INVALID_SECTION_ID);
