import { get } from 'lodash';

import Pixel from '../../../../shared/pixel/PixelService';
import { PIXEL_EVENT_TITLE } from '../../../../shared/pixel/constants/pixelEventTitle';
import { ignoreError } from '../../../../shared/utils/general';
import { UnSpecifiedSection } from '../../../features/Section/factory';
import { SECTION_TEMPLATE_CODE } from '../../constants';

export const logEventPixelSearch = (listSections: UnSpecifiedSection[] | undefined, keyword: string) => {
  if (!listSections) return;

  const contentIds = listSections
    .filter(({ view }) => view.sectionCode === SECTION_TEMPLATE_CODE.PRODUCT_LIST)
    .flatMap(({ data }) => get(data, 'items') || [])
    .map(({ no }) => no);

  ignoreError(() => {
    Pixel.logEvent(PIXEL_EVENT_TITLE.SEARCH, {
      search_string: keyword,
      content_ids: contentIds,
    });
  });
};
