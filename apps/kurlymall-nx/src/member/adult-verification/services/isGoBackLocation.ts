import { GO_BACK_LOCATIONS } from '../constants';

export const isGoBackLocation = (url: string) => !!GO_BACK_LOCATIONS.some((it) => url.includes(it));
