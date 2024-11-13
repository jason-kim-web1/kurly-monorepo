import { isPC } from '../../../../../util/window/getDevice';
import { DISPLAY_PRODUCTS_COUNT, DISPLAY_PRODUCTS_COUNT_M } from '../../constants';
import { PageType } from '../../types';

export const getDefaultPerPage = (section: PageType) => {
  return isPC ? DISPLAY_PRODUCTS_COUNT[section] : DISPLAY_PRODUCTS_COUNT_M[section];
};
