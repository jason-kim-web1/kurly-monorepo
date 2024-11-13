import { ReactNode } from 'react';

import { getSecond } from '../../../shared/utils/time';
import { isPC } from '../../../../util/window/getDevice';

export const responsiveClass = isPC ? 'pc' : 'mobile';

export const STALE_TIME = getSecond(60 * 1000);

export type BenefitIconType = {
  [key: string]: ReactNode;
};
