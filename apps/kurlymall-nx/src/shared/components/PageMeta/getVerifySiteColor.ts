import type { PathKeyType } from '../../constant/paths';
import { SITE_COLOR_PAGE_LIST } from './constants';

const getVerifySiteColor = (pathKey: PathKeyType) => {
  if (!pathKey) {
    return false;
  }
  return SITE_COLOR_PAGE_LIST.some((url) => pathKey === url);
};

export { getVerifySiteColor };
