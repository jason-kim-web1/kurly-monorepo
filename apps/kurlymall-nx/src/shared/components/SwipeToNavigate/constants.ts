import { isMobile } from 'react-device-detect';

export const SWIPE_MOVE_EVENT_NAME = isMobile ? 'touchmove' : ('mousemove' as const);
export const SWIPE_END_EVENT_NAME = isMobile ? 'touchend' : ('mouseup' as const);
export const SWIPE_CANCEL_EVENT_NAME = isMobile ? 'touchcancel' : ('mouseleave' as const);
