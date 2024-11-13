import { isUndefined } from 'lodash';

import { loadSessionStorage, storeSessionStorage } from '../services/session.storage.service';

export default function storePrevAndCurrentPath() {
  if (isUndefined(window)) {
    return;
  }

  const prevPath = loadSessionStorage('currentPath');
  storeSessionStorage('prevPath', prevPath);
  storeSessionStorage('currentPath', window.location.pathname + window.location.search);
}
