import { USER_MENU_PATH } from '../../shared/constant';
import { loadSessionStorage, storeSessionStorage } from '../../shared/services/session.storage.service';

const KEY = 'hideMainDeliveryTooltip';

/**
 * 주소지가 있고, 한번 툴팁을 노출한 경우 session storage hideMainDeliveryTooltip 값이 저장하여 이후 비노출
 * @param routePath 현재 페이지 경로
 * @param hasAddress
 */
export default function updateDeliveryTooltipVisibleState(routePath: string, hasAddress: boolean): boolean {
  const isHomePath = routePath.startsWith(USER_MENU_PATH.home.uri);

  if (!isHomePath) {
    return false;
  }

  if (!hasAddress) {
    return true;
  }

  const isVisible = !loadSessionStorage<boolean>(KEY);

  if (isVisible && isHomePath) {
    storeSessionStorage(KEY, true);
    return true;
  }

  return false;
}
