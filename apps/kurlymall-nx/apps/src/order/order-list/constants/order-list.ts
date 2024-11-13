import { isWebview } from '../../../../util/window/getDevice';
import { TabList } from '../../../shared/components/KPDS/Tab';
import { MOBILE_HEADER_HEIGHT } from '../../cart/constants';

export const ORDER_FILTER_HEADER = 58;

export const MW_FILTER_HIDE_TOP = MOBILE_HEADER_HEIGHT - ORDER_FILTER_HEADER;
export const FILTER_VISIBLE_TOP = isWebview() ? 0 : MOBILE_HEADER_HEIGHT;
export const FILTER_HIDE_TOP = isWebview() ? -ORDER_FILTER_HEADER : MW_FILTER_HIDE_TOP;

export const DATE_FILTER_OPTION: TabList[] = [
  { tabName: '3개월', isActive: true, value: '3' },
  { tabName: '6개월', isActive: false, value: '6' },
  { tabName: '1년', isActive: false, value: '12' },
  { tabName: '3년', isActive: false, value: '36' },
];

export const MYPAGE_ORDER_LIST_LIMIT = 10;
